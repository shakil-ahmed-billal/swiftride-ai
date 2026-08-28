import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

const rawKey = process.env.GEMINI_API_KEY || "";
const apiKey = rawKey.replace(/['"]/g, "").trim();
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const openRouterKey = (process.env.OPENROUTER_API_KEY || "").replace(/['"]/g, "").trim();

// Helper: Query DB for Cars
async function queryCars(brand?: string, type?: string, sortByPrice?: "asc" | "desc") {
  let query = supabase.from("cars").select("*").eq("available", true);
  if (brand) query = query.ilike("brand", `%${brand}%`);
  if (type) query = query.ilike("type", `%${type}%`);

  if (sortByPrice) {
    query = query.order("price_per_day", { ascending: sortByPrice === "asc" });
  } else {
    query = query.order("price_per_day", { ascending: true });
  }

  const { data: cars } = await query.limit(6);
  return cars || [];
}

// Helper: Insert Lead into Supabase
async function saveLeadToDb(leadData: { name: string; email: string; phone: string; notes?: string }) {
  const { data: lead, error } = await supabase
    .from("leads")
    .insert([
      {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        notes: leadData.notes || "Qualified via SwiftRide AI Assistant",
        is_qualified: true,
      },
    ])
    .select()
    .single();

  if (!error && process.env.DISCORD_WEBHOOK_URL) {
    try {
      fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🔥 New HOT SwiftRide AI Lead Qualified!",
              color: 3500009,
              fields: [
                { name: "Customer Name", value: leadData.name, inline: true },
                { name: "Phone", value: leadData.phone, inline: true },
                { name: "Email", value: leadData.email, inline: false },
                { name: "AI Summary Notes", value: leadData.notes || "None provided", inline: false },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }).catch(() => {});
    } catch {}
  }

  return lead;
}

// Helper: Call OpenRouter AI Endpoint
async function callOpenRouterAI(message: string, history: any[], liveCars: any[]) {
  if (!openRouterKey) return null;

  const systemPrompt = `You are SwiftRide AI, an intelligent luxury car rental assistant for SwiftRide AI platform.
  Live Inventory Cars from Supabase Database: ${JSON.stringify(liveCars)}
  
  Guidelines:
  1. Answer user questions warmly, accurately, and naturally like a human concierge.
  2. If the user asks about rental policies, age requirements, or deposit ($200 deposit, minimum age 21, valid driver's license), answer clearly and directly.
  3. If they ask about cars or prices, quote live inventory prices ($/day) and vehicle specs.
  4. Keep responses helpful, crisp, and well formatted using markdown bold for key points.`;

  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...(history || [])
      .filter((h: any) => h.id !== "init" && h.text && h.text.trim())
      .map((h: any) => ({
        role: h.sender === "user" ? "user" : "assistant",
        content: h.text,
      })),
    { role: "user", content: message },
  ];

  const models = ["google/gemini-2.0-flash-001", "meta-llama/llama-3.3-70b-instruct:free", "openai/gpt-3.5-turbo"];

  for (const modelName of models) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "HTTP-Referer": "https://swiftride-ai.com",
          "X-Title": "SwiftRide AI Concierge",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          messages: formattedMessages,
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data?.choices?.[0]?.message?.content;
        if (replyText) {
          return replyText;
        }
      }
    } catch (e) {}
  }

  return null;
}

// Smart Conversational Engine for Local / Offline Execution
async function handleSmartLocalResponse(
  message: string,
  liveCars: any[] = [],
  isAskingForLowerPrice: boolean = false,
  isAskingForLuxury: boolean = false,
  requestedCount: number = 6
) {
  const lowerMsg = (message || "").toLowerCase().trim();
  const slicedCars = liveCars.slice(0, requestedCount);

  // 1. Name & Identity Queries
  if (
    lowerMsg.includes("your name") ||
    lowerMsg.includes("who are you") ||
    lowerMsg.includes("what is your name") ||
    lowerMsg.includes("what's your name") ||
    lowerMsg.includes("who made you") ||
    lowerMsg.includes("who created you")
  ) {
    return {
      text: "I am **SwiftRide AI**, your smart car rental concierge! I can help you find available luxury SUVs and sedans, check daily rental rates, and book vehicles instantly.",
    };
  }

  // 2. Greetings
  if (
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|assalamu alaikum|hola)\b/i.test(
      lowerMsg
    )
  ) {
    return {
      text: "Hello! Welcome to SwiftRide AI Concierge. How can I help your journey today?\n\n• Explore available luxury SUVs & sedans\n• Check rental prices & policies\n• Reserve a vehicle instantly",
    };
  }

  // 3. Detect Contact Info
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = message.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);

  if (emailMatch || phoneMatch) {
    const extractedEmail = emailMatch ? emailMatch[0] : "customer@swiftride.com";
    const extractedPhone = phoneMatch ? phoneMatch[0] : "+1 (800) 555-0199";

    let extractedName = "Valued Customer";
    const nameMatch = message.match(/(?:my name is|i am|name:?)\s+([a-zA-Z\s]+)/i);
    if (nameMatch && nameMatch[1]) {
      extractedName = nameMatch[1].trim();
    } else if (emailMatch) {
      extractedName = emailMatch[0].split("@")[0].replace(/[._]/g, " ");
      extractedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    }

    await saveLeadToDb({
      name: extractedName,
      email: extractedEmail,
      phone: extractedPhone,
      notes: message,
    });

    return {
      text: `Thank you, **${extractedName}**! Your vehicle reservation request has been registered in our system and assigned to our sales concierge.\n\nWe will contact you at **${extractedPhone}** / **${extractedEmail}** shortly to confirm your booking!`,
    };
  }

  // 4. Policy & Requirements Priority Match
  if (
    lowerMsg.includes("policy") ||
    lowerMsg.includes("license") ||
    lowerMsg.includes("deposit") ||
    lowerMsg.includes("age") ||
    lowerMsg.includes("requirement") ||
    lowerMsg.includes("insurance") ||
    lowerMsg.includes("document")
  ) {
    return {
      text: "Here are SwiftRide's standard rental & deposit requirements:\n\n1. **Age Requirement**: Drivers must be at least 21 years old.\n2. **Documentation**: Valid driver's license and passport or state ID.\n3. **Security Deposit**: A refundable $200 deposit is authorized upon vehicle pickup.\n4. **Insurance**: Comprehensive insurance coverage is included with all rentals.",
    };
  }

  // 5. Specific Lower Price Query Handling
  if (isAskingForLowerPrice && liveCars.length > 0) {
    const minCar = liveCars[0];
    return {
      text: `Here are our most budget-friendly vehicle options starting from **$${minCar.price_per_day}.00/day**:`,
      cars: slicedCars,
    };
  }

  // 6. Specific Luxury / High Price Query Handling
  if (isAskingForLuxury && liveCars.length > 0) {
    const maxCar = liveCars[0];
    return {
      text: `The highest-priced car in our inventory is the **${maxCar.name}** priced at **$${maxCar.price_per_day}.00/day**. Here is the requested vehicle details:`,
      cars: slicedCars,
    };
  }

  // 7. General Vehicles Recommendation Payload
  if (
    liveCars.length > 0 &&
    (lowerMsg.includes("car") ||
      lowerMsg.includes("suv") ||
      lowerMsg.includes("sedan") ||
      lowerMsg.includes("available") ||
      lowerMsg.includes("show") ||
      lowerMsg.includes("rent") ||
      lowerMsg.includes("recommend") ||
      lowerMsg.includes("vehicle") ||
      lowerMsg.includes("fleet"))
  ) {
    return {
      text: `Here are top available vehicle recommendations matching your request:`,
      cars: slicedCars,
    };
  }

  // 8. Default Fallback
  return {
    text: "I am **SwiftRide AI**, your smart car rental concierge! I can help you check vehicle availability, daily rental rates, or complete a live booking.\n\nWould you like me to show our top available luxury SUVs or sedans?",
    cars: liveCars.length > 0 ? liveCars.slice(0, 2) : undefined,
  };
}

export async function POST(req: Request) {
  let message = "";
  let history: any[] = [];

  try {
    const body = await req.json();
    message = body.message || "";
    history = body.history || [];

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const lowerMsg = message.toLowerCase();

    // Intent Detection
    const isAskingForLowerPrice =
      lowerMsg.includes("lower") ||
      lowerMsg.includes("low price") ||
      lowerMsg.includes("cheap") ||
      lowerMsg.includes("cheapest") ||
      lowerMsg.includes("budget") ||
      lowerMsg.includes("affordable") ||
      lowerMsg.includes("pirce") ||
      lowerMsg.includes("prikce");

    const isAskingForLuxury =
      lowerMsg.includes("luxury") ||
      lowerMsg.includes("expensive") ||
      lowerMsg.includes("high price") ||
      lowerMsg.includes("highest price") ||
      lowerMsg.includes("top price") ||
      lowerMsg.includes("premium") ||
      lowerMsg.includes("flagship");

    let sortByPrice: "asc" | "desc" | undefined = undefined;
    if (isAskingForLowerPrice) sortByPrice = "asc";
    if (isAskingForLuxury) sortByPrice = "desc";

    let targetType: string | undefined = undefined;
    let targetBrand: string | undefined = undefined;

    if (lowerMsg.includes("suv")) targetType = "SUV";
    if (lowerMsg.includes("sedan")) targetType = "Sedan";
    if (lowerMsg.includes("range rover") || lowerMsg.includes("land rover")) targetBrand = "Land Rover";
    if (lowerMsg.includes("audi")) targetBrand = "Audi";
    if (lowerMsg.includes("toyota")) targetBrand = "Toyota";

    // Detect explicit requested quantity (e.g. "just 1 car", "show 2 cars")
    let requestedCount = 6; // Default to all available fleet cars (6)

    const matchCount = lowerMsg.match(/(?:just|only|show|top|recommend)?\s*(\d+)\s*(?:car|vehicle|suv|sedan)s?/i);
    if (matchCount && matchCount[1]) {
      requestedCount = Math.max(1, parseInt(matchCount[1], 10));
    } else if (
      lowerMsg.includes("just 1") ||
      lowerMsg.includes("only 1") ||
      lowerMsg.includes("single car") ||
      lowerMsg.includes("one car") ||
      lowerMsg.includes("1 car") ||
      lowerMsg.includes("show 1")
    ) {
      requestedCount = 1;
    } else if (lowerMsg.includes("top 2") || lowerMsg.includes("two cars")) {
      requestedCount = 2;
    }

    const liveCars = await queryCars(targetBrand, targetType, sortByPrice);
    const slicedCars = liveCars.slice(0, requestedCount);

    // FEATURE: Detect when user specifically asks to open booking form for a previously discussed car!
    const isBookingFormRequested =
      lowerMsg.includes("book") ||
      lowerMsg.includes("form") ||
      lowerMsg.includes("reserve") ||
      lowerMsg.includes("boking") ||
      lowerMsg.includes("bhoking");

    if (isBookingFormRequested) {
      // Concatenate history + current prompt to detect the referenced car
      const fullContext = [
        ...(history || []).map((h: any) => h.text || ""),
        message,
      ].join(" ").toLowerCase();

      let targetCar: any = null;

      // Find car mentioned in conversation
      for (const car of liveCars) {
        const cName = car.name.toLowerCase();
        const cBrand = car.brand.toLowerCase();
        if (
          fullContext.includes(cName) ||
          fullContext.includes(cBrand) ||
          (cName.includes("velar") && fullContext.includes("velar")) ||
          (cName.includes("rover") && fullContext.includes("rover")) ||
          (cName.includes("audi") && fullContext.includes("audi")) ||
          (cName.includes("bmw") && fullContext.includes("bmw")) ||
          (cName.includes("camry") && fullContext.includes("camry")) ||
          (cName.includes("corolla") && fullContext.includes("corolla")) ||
          (cName.includes("altima") && fullContext.includes("altima"))
        ) {
          targetCar = car;
          break;
        }
      }

      if (!targetCar && liveCars.length > 0) {
        targetCar = liveCars[0];
      }

      if (targetCar) {
        return NextResponse.json({
          response: `Here is the instant reservation form for the **${targetCar.name}** ($${targetCar.price_per_day}/day). Please fill in your details below to confirm your booking!`,
          openBookingFormForCar: targetCar,
        });
      }
    }

    // Check for contact details / Lead creation
    const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = message.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);

    if (emailMatch || phoneMatch) {
      const extractedEmail = emailMatch ? emailMatch[0] : "customer@swiftride.com";
      const extractedPhone = phoneMatch ? phoneMatch[0] : "+1 (800) 555-0199";

      let extractedName = "Valued Customer";
      const nameMatch = message.match(/(?:my name is|i am|name:?)\s+([a-zA-Z\s]+)/i);
      if (nameMatch && nameMatch[1]) extractedName = nameMatch[1].trim();

      await saveLeadToDb({
        name: extractedName,
        email: extractedEmail,
        phone: extractedPhone,
        notes: message,
      });

      return NextResponse.json({
        response: `Thank you, **${extractedName}**! Your vehicle reservation request has been registered in our system and assigned to our sales concierge.\n\nWe will contact you at **${extractedPhone}** / **${extractedEmail}** shortly to confirm your booking!`,
      });
    }

    // STEP 1: Try Google Gemini API First
    if (genAI && apiKey) {
      try {
        let formattedHistory = (history || [])
          .filter((h: any) => h.id !== "init" && h.text && h.text.trim())
          .map((h: any) => ({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          }));

        while (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
          formattedHistory.shift();
        }

        const candidateModels = ["gemini-3.6-flash", "gemini-1.5-flash"];

        for (const modelName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({
              model: modelName,
              systemInstruction: `
                You are SwiftRide AI, a smart car rental assistant.
                Database Context:
                - Live Inventory (Sorted): ${JSON.stringify(slicedCars)}
                - User Requested Count: Exactly ${requestedCount} car(s)
                
                Rules:
                1. If user asked for "just 1 car" or "1 car", present only the top single vehicle!
                2. Quote exact live database prices ($/day) and specs.
                3. Keep responses warm, helpful, and concise.
              `,
            });

            const chat = model.startChat({ history: formattedHistory });
            const geminiPromise = chat.sendMessage(message);
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Gemini API Timeout")), 4000)
            );

            const result: any = await Promise.race([geminiPromise, timeoutPromise]);
            const responseText = result.response.text();

            if (responseText) {
              const isAskingForCars =
                lowerMsg.includes("available vehicle") ||
                lowerMsg.includes("available car") ||
                lowerMsg.includes("show car") ||
                lowerMsg.includes("show vehicle") ||
                lowerMsg.includes("show fleet") ||
                lowerMsg.includes("list car") ||
                lowerMsg.includes("instant book") ||
                lowerMsg.includes("recommend top") ||
                isAskingForLowerPrice ||
                isAskingForLuxury;

              return NextResponse.json({
                response: responseText,
                cars: isAskingForCars && slicedCars.length > 0 ? slicedCars : undefined,
              });
            }
          } catch (modelErr) {}
        }
      } catch (geminiErr) {}
    }

    // STEP 2: Try OpenRouter API Fallback
    try {
      const openRouterReply = await callOpenRouterAI(message, history, slicedCars);
      if (openRouterReply) {
        const isAskingForCars =
          lowerMsg.includes("available vehicle") ||
          lowerMsg.includes("available car") ||
          lowerMsg.includes("show car") ||
          lowerMsg.includes("show vehicle") ||
          lowerMsg.includes("show fleet") ||
          lowerMsg.includes("list car") ||
          lowerMsg.includes("instant book") ||
          lowerMsg.includes("recommend top") ||
          isAskingForLowerPrice ||
          isAskingForLuxury;

        return NextResponse.json({
          response: openRouterReply,
          cars: isAskingForCars && slicedCars.length > 0 ? slicedCars : undefined,
        });
      }
    } catch (orErr) {}

    // STEP 3: Smart Local Engine Fallback
    const fastLocalResponse = await handleSmartLocalResponse(
      message,
      liveCars,
      isAskingForLowerPrice,
      isAskingForLuxury,
      requestedCount
    );
    return NextResponse.json({
      response: fastLocalResponse.text,
      cars: fastLocalResponse.cars,
    });
  } catch (error: any) {
    const fallbackResp = await handleSmartLocalResponse(message, [], false, false, 1);
    return NextResponse.json({ response: fallbackResp.text });
  }
}

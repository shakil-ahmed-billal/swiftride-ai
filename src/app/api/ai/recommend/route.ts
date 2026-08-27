import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Fetch available fleet data from Supabase
    const { data: availableCars } = await supabase
      .from("cars")
      .select("id, name, brand, type, seats, fuel_type, transmission, price_per_day")
      .eq("available", true);

    const carContext = JSON.stringify(availableCars || []);

    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (geminiApiKey) {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const systemPrompt = `
You are the official AI Smart Assistant for SwiftRide AI (a premium car rental agency).
Your task is to help users find their ideal rental car based on their trip type, budget, passenger count, and transmission preferences.

Here is the list of currently available cars in our real database:
${carContext}

Strict Guidelines:
1. ONLY recommend vehicles listed in the available vehicles context above. Do not hallucinate or make up cars.
2. If a user asks for something we don't have, politely explain we don't carry that model, and recommend our closest available option.
3. Keep pricing clear and explain why your recommendation fits their query.
4. Keep the tone warm, professional, and friendly.
      `;

      const fullPrompt = `${systemPrompt}\n\nUser Message: ${message}\nAI Response:`;
      const result = await model.generateContent(fullPrompt);
      const textResponse = result.response.text();

      return NextResponse.json({ success: true, response: textResponse });
    }

    // Smart fallback recommendation if GEMINI_API_KEY is not configured yet
    const query = message.toLowerCase();
    let matchedCar = availableCars?.[0];

    if (query.includes("suv") || query.includes("family") || query.includes("7 seat")) {
      matchedCar = availableCars?.find((c) => c.type === "SUV" || c.seats >= 7) || matchedCar;
    } else if (query.includes("electric") || query.includes("tesla")) {
      matchedCar = availableCars?.find((c) => c.type === "Electric") || matchedCar;
    } else if (query.includes("cheap") || query.includes("budget") || query.includes("sedan")) {
      matchedCar = availableCars?.find((c) => c.price_per_day < 700) || matchedCar;
    } else if (query.includes("luxury") || query.includes("sport")) {
      matchedCar = availableCars?.find((c) => c.type === "Sports" || c.price_per_day > 1000) || matchedCar;
    }

    const fallbackResponse = `Based on your request, I recommend the **${matchedCar?.name || "Range Rover Sport"}** (${matchedCar?.brand})! It offers ${matchedCar?.seats} seats, ${matchedCar?.transmission} transmission, and is available for **$${matchedCar?.price_per_day}/day**. Would you like to reserve it now?`;

    return NextResponse.json({
      success: true,
      response: fallbackResponse,
      recommendedCar: matchedCar,
    });
  } catch (error: any) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: error.message || "AI processing failed" }, { status: 500 });
  }
}

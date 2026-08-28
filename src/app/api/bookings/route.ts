import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || "10";
    const status = searchParams.get("status");

    let query = supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(parseInt(limit, 10));

    if (status && status !== "All") {
      query = query.eq("status", status);
    }

    const { data: bookings, error } = await query;

    if (error) {
      console.error("Supabase bookings fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: bookings?.length || 0, bookings: bookings || [] });
  } catch (error: any) {
    console.error("Bookings API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      country,
      car_id,
      car_name,
      car_image,
      start_date,
      end_date,
      duration,
      total_amount,
      payment_method,
    } = body;

    if (!customer_name || !customer_email || !car_name || !total_amount) {
      return NextResponse.json({ error: "Missing required booking details" }, { status: 400 });
    }

    const txId = `#${Math.floor(100000000000 + Math.random() * 900000000000)}`;

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_name,
          customer_email,
          country: country || "United States",
          car_id: car_id || null,
          car_name,
          car_image: car_image || "/admin-dashboard/dashboard_4.webp",
          start_date: start_date ? new Date(start_date).toISOString() : new Date().toISOString(),
          end_date: end_date
            ? new Date(end_date).toISOString()
            : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          duration: duration || "3 Days",
          total_amount: parseFloat(total_amount),
          payment_method: payment_method || "Paypal",
          transaction_id: txId,
          status: "Success",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase booking insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Increment car sales count in live Supabase cars table
    const targetCarId = car_id;
    if (targetCarId) {
      const { data: carData } = await supabase
        .from("cars")
        .select("id, sales_count")
        .eq("id", targetCarId)
        .single();

      if (carData) {
        await supabase
          .from("cars")
          .update({ sales_count: (carData.sales_count || 0) + 1 })
          .eq("id", targetCarId);
      }
    } else if (car_name) {
      const { data: carData } = await supabase
        .from("cars")
        .select("id, sales_count")
        .ilike("name", `%${car_name}%`)
        .limit(1)
        .single();

      if (carData) {
        await supabase
          .from("cars")
          .update({ sales_count: (carData.sales_count || 0) + 1 })
          .eq("id", carData.id);
      }
    }

    return NextResponse.json({ success: true, booking: data });
  } catch (error: any) {
    console.error("Create Booking Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create booking" }, { status: 500 });
  }
}

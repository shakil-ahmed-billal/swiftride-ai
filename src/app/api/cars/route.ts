import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");
    const type = searchParams.get("type");
    const maxPrice = searchParams.get("maxPrice");
    const query = searchParams.get("query");
    const limit = searchParams.get("limit");

    let dbQuery = supabase
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false });

    if (brand && brand !== "All") {
      dbQuery = dbQuery.ilike("brand", `%${brand}%`);
    }

    if (type && type !== "All") {
      dbQuery = dbQuery.ilike("type", `%${type}%`);
    }

    if (maxPrice) {
      dbQuery = dbQuery.lte("price_per_day", parseFloat(maxPrice));
    }

    if (query) {
      dbQuery = dbQuery.or(`name.ilike.%${query}%,brand.ilike.%${query}%`);
    }

    if (limit) {
      dbQuery = dbQuery.limit(parseInt(limit, 10));
    }

    const { data: cars, error } = await dbQuery;

    if (error) {
      console.error("Supabase cars fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: cars?.length || 0, cars: cars || [] });
  } catch (error: any) {
    console.error("Cars API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, brand, type, transmission, fuel_type, seats, price_per_day, image, available } = body;

    if (!name || !brand || !type || !price_per_day || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("cars")
      .insert([
        {
          name,
          brand,
          type,
          transmission: transmission || "Automatic",
          fuel_type: fuel_type || "Octane",
          seats: seats || 5,
          price_per_day: parseFloat(price_per_day),
          image,
          available: available !== undefined ? available : true,
          sales_count: 0,
          rating: 5.0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase car insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, car: data });
  } catch (error: any) {
    console.error("Create Car Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create car" }, { status: 500 });
  }
}

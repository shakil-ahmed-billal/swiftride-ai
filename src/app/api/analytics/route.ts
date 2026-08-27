import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year") || "2024";

    // 1. Fetch metrics
    const { data: metrics } = await supabase
      .from("dashboard_metrics")
      .select("*");

    // 2. Fetch monthly chart data
    const { data: monthlyAnalytics } = await supabase
      .from("monthly_analytics")
      .select("*")
      .eq("year", year)
      .order("month_index", { ascending: true });

    // 3. Fetch country sales data
    const { data: countrySales } = await supabase
      .from("country_sales")
      .select("*")
      .order("sales_count", { ascending: false });

    // 4. Fetch Best seller cars
    const { data: bestSellers } = await supabase
      .from("cars")
      .select("id, name, price_per_day, sales_count, image")
      .order("sales_count", { ascending: false })
      .limit(5);

    return NextResponse.json({
      success: true,
      metrics: metrics || [],
      monthlyAnalytics: monthlyAnalytics || [],
      countrySales: countrySales || [],
      bestSellers: bestSellers || [],
    });
  } catch (error: any) {
    console.error("Analytics API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch analytics" }, { status: 500 });
  }
}

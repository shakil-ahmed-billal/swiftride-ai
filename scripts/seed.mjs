import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 1. Load .env.local manually if running in standalone node
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...values] = trimmed.split("=");
        if (key && values.length > 0) {
          const val = values.join("=").replace(/(^["']|["']$)/g, "");
          process.env[key.trim()] = val;
        }
      }
    });
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  console.log("🧹 Clearing old database records & seeding 6 new transparent cars from /car-image...\n");

  // Clear existing cars & bookings to remove old assets
  await supabase.from("bookings").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("cars").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // 1. Seed Exactly 6 Fleet Cars using transparent public/car-image assets
  console.log("🚗 Seeding 6 Fleet Cars with transparent cutouts...");
  const fleetCars = [
    {
      id: "b1111111-1111-1111-1111-111111111111",
      name: "Range Rover Velar",
      brand: "Land Rover",
      type: "SUV",
      transmission: "Automatic",
      fuel_type: "Octane",
      seats: 7,
      price_per_day: 260.0,
      image: "/car-image/car-image-1-Picsart-BackgroundRemover.png",
      available: true,
      sales_count: 6547,
      rating: 4.9,
    },
    {
      id: "b2222222-2222-2222-2222-222222222222",
      name: "Audi S6 Luxury Sedan",
      brand: "Audi",
      type: "Sedan",
      transmission: "Automatic",
      fuel_type: "Octane",
      seats: 5,
      price_per_day: 1474.0,
      image: "/car-image/car-image-2-Picsart-BackgroundRemover.png",
      available: true,
      sales_count: 3474,
      rating: 4.8,
    },
    {
      id: "b3333333-3333-3333-3333-333333333333",
      name: "Nissan Altima SR",
      brand: "Nissan",
      type: "Sedan",
      transmission: "Automatic",
      fuel_type: "Hybrid",
      seats: 5,
      price_per_day: 878.0,
      image: "/car-image/car-image-3-Picsart-BackgroundRemover.png",
      available: true,
      sales_count: 1478,
      rating: 4.7,
    },
    {
      id: "b4444444-4444-4444-4444-444444444444",
      name: "Toyota Corolla Sport",
      brand: "Toyota",
      type: "Sedan",
      transmission: "Automatic",
      fuel_type: "Hybrid",
      seats: 5,
      price_per_day: 320.0,
      image: "/car-image/car-image-4-Picsart-BackgroundRemover.png",
      available: true,
      sales_count: 987,
      rating: 4.9,
    },
    {
      id: "b5555555-5555-5555-5555-555555555555",
      name: "Toyota Camry Hybrid",
      brand: "Toyota",
      type: "Sedan",
      transmission: "Automatic",
      fuel_type: "Hybrid",
      seats: 5,
      price_per_day: 597.0,
      image: "/car-image/car-image-5-Picsart-BackgroundRemover.png",
      available: true,
      sales_count: 784,
      rating: 4.8,
    },
    {
      id: "b6666666-6666-6666-6666-666666666666",
      name: "BMW X5 xDrive SUV",
      brand: "BMW",
      type: "SUV",
      transmission: "Automatic",
      fuel_type: "Octane",
      seats: 7,
      price_per_day: 1569.0,
      image: "/car-image/car-image-6-Picsart-BackgroundRemover.png",
      available: true,
      sales_count: 520,
      rating: 5.0,
    },
  ];

  const { error: carErr } = await supabase.from("cars").upsert(fleetCars, { onConflict: "id" });
  if (carErr) {
    console.error("❌ Cars seeding failed:", carErr.message);
  } else {
    console.log(`✅ ${fleetCars.length} fleet cars successfully seeded!`);
  }

  // 2. Seed Bookings / Transactions
  console.log("\n📑 Seeding Bookings & Recent Transactions...");
  const recentBookings = [
    {
      id: "c1111111-1111-1111-1111-111111111111",
      customer_name: "Alex Johnson",
      customer_email: "alex.j@example.com",
      car_id: "b1111111-1111-1111-1111-111111111111",
      car_name: "Range Rover Velar",
      car_image: "/car-image/car-image-1-Picsart-BackgroundRemover.png",
      duration: "15 Mins",
      total_amount: 1099.0,
      payment_method: "Paypal",
      transaction_id: "#416645453773",
      status: "Success",
    },
    {
      id: "c2222222-2222-2222-2222-222222222222",
      customer_name: "Sarah Williams",
      customer_email: "sarah.w@example.com",
      car_id: "b4444444-4444-4444-4444-444444444444",
      car_name: "Toyota Corolla Sport",
      car_image: "/car-image/car-image-4-Picsart-BackgroundRemover.png",
      duration: "45 Mins",
      total_amount: 600.55,
      payment_method: "Apple Pay",
      transaction_id: "#147784454554",
      status: "Cancelled",
    },
    {
      id: "c3333333-3333-3333-3333-333333333333",
      customer_name: "David Miller",
      customer_email: "david.m@example.com",
      car_id: "b3333333-3333-3333-3333-333333333333",
      car_name: "Nissan Altima SR",
      car_image: "/car-image/car-image-3-Picsart-BackgroundRemover.png",
      duration: "2 Hours",
      total_amount: 200.1,
      payment_method: "Stripe",
      transaction_id: "#147784454554",
      status: "Pending",
    },
    {
      id: "c4444444-4444-4444-4444-444444444444",
      customer_name: "Elena Rostova",
      customer_email: "elena.r@example.com",
      car_id: "b6666666-6666-6666-6666-666666666666",
      car_name: "BMW X5 xDrive SUV",
      car_image: "/car-image/car-image-6-Picsart-BackgroundRemover.png",
      duration: "4 Hours",
      total_amount: 1569.0,
      payment_method: "PayU",
      transaction_id: "#147784454554",
      status: "Success",
    },
    {
      id: "c5555555-5555-5555-5555-555555555555",
      customer_name: "Marcus Vance",
      customer_email: "marcus.v@example.com",
      car_id: "b2222222-2222-2222-2222-222222222222",
      car_name: "Audi S6 Luxury Sedan",
      car_image: "/car-image/car-image-2-Picsart-BackgroundRemover.png",
      duration: "6 Hours",
      total_amount: 1478.0,
      payment_method: "Paytm",
      transaction_id: "#147784454554",
      status: "Success",
    },
  ];

  const { error: bookingErr } = await supabase.from("bookings").upsert(recentBookings, { onConflict: "id" });
  if (bookingErr) {
    console.error("❌ Bookings seeding failed:", bookingErr.message);
  } else {
    console.log(`✅ ${recentBookings.length} bookings successfully seeded!`);
  }

  // 3. Seed Country Sales
  console.log("\n🌍 Seeding Country Sales...");
  const countrySales = [
    { id: "usa", country_code: "US", country_name: "United States", sales_count: 5230, revenue: 142500, growth_percentage: 54 },
    { id: "brazil", country_code: "BR", country_name: "Brazil", sales_count: 2450, revenue: 68900, growth_percentage: 32 },
    { id: "africa", country_code: "AF", country_name: "Africa", sales_count: 3455, revenue: 96800, growth_percentage: 48 },
    { id: "china", country_code: "CN", country_name: "China", sales_count: 4120, revenue: 115000, growth_percentage: 41 },
    { id: "seasia", country_code: "ID", country_name: "Southeast Asia", sales_count: 1890, revenue: 54300, growth_percentage: 27 },
  ];

  const { error: countryErr } = await supabase.from("country_sales").upsert(countrySales, { onConflict: "id" });
  if (countryErr) {
    console.error("❌ Country sales seeding failed:", countryErr.message);
  } else {
    console.log(`✅ ${countrySales.length} country markets seeded!`);
  }

  // 4. Seed Monthly Analytics
  console.log("\n📊 Seeding Monthly Analytics...");
  await supabase.from("monthly_analytics").delete().neq("id", -1);
  const monthlyData = [
    { year: "2024", month: "Jan", month_index: 1, value: 38, revenue_formatted: "$38,400" },
    { year: "2024", month: "Feb", month_index: 2, value: 24, revenue_formatted: "$24,100" },
    { year: "2024", month: "Mar", month_index: 3, value: 45, revenue_formatted: "$45,200" },
    { year: "2024", month: "Apr", month_index: 4, value: 30, revenue_formatted: "$30,900" },
    { year: "2024", month: "May", month_index: 5, value: 55, revenue_formatted: "$55,000" },
    { year: "2024", month: "Jun", month_index: 6, value: 42, revenue_formatted: "$42,800" },
    { year: "2024", month: "Jul", month_index: 7, value: 48, revenue_formatted: "$48,600" },
    { year: "2024", month: "Aug", month_index: 8, value: 35, revenue_formatted: "$35,300" },
    { year: "2024", month: "Sep", month_index: 9, value: 58, revenue_formatted: "$58,900" },
  ];

  const { error: monthlyErr } = await supabase.from("monthly_analytics").insert(monthlyData);
  if (monthlyErr) {
    console.error("❌ Monthly analytics seeding failed:", monthlyErr.message);
  } else {
    console.log(`✅ ${monthlyData.length} monthly analytics records seeded!`);
  }

  // 5. Seed Dashboard Metrics
  console.log("\n📈 Seeding Dashboard Metrics...");
  const metrics = [
    { id: "weekly_earning", metric_name: "Weekly Earning", metric_value: "$95,000.45", trend_percentage: "48%", trend_type: "increase" },
    { id: "total_sales", metric_name: "No of Total Sales", metric_value: "10,000+", trend_percentage: "24%", trend_type: "increase" },
    { id: "purchased_goods", metric_name: "No of Purchased Goods", metric_value: "800+", trend_percentage: "12%", trend_type: "increase" },
  ];

  const { error: metricErr } = await supabase.from("dashboard_metrics").upsert(metrics, { onConflict: "id" });
  if (metricErr) {
    console.error("❌ Metrics seeding failed:", metricErr.message);
  } else {
    console.log(`✅ ${metrics.length} store metrics seeded!`);
  }

  console.log("\n✨ Supabase Seeding Completed! All 6 transparent cars successfully seeded.");
}

seedDatabase();

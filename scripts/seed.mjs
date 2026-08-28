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
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  console.log("Cleaning all existing bookings & seeding only the 6 live fleet cars...");

  // Delete all bookings and leads so all data going forward is 100% real
  await supabase.from("bookings").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("leads").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("cars").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // Seed Exactly the 6 Real Fleet Cars
  console.log("🚗 Seeding 6 Fleet Vehicles with initial clean counters...");
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
      sales_count: 0,
      rating: 5.0,
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
      sales_count: 0,
      rating: 4.9,
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
      sales_count: 0,
      rating: 4.8,
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
      sales_count: 0,
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
      sales_count: 0,
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
      sales_count: 0,
      rating: 5.0,
    },
  ];

  const { error: carErr } = await supabase.from("cars").upsert(fleetCars, { onConflict: "id" });
  if (carErr) {
    console.error("Cars seeding failed:", carErr.message);
  } else {
    console.log(`Successfully seeded ${fleetCars.length} clean fleet cars!`);
  }

  console.log("Database reset complete. Zero dummy bookings present; ready for live operations!");
}

seedDatabase();

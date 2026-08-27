import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

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
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function resetDatabase() {
  console.log("🧹 Resetting Supabase database tables...");

  // 1. Delete records
  await supabase.from("bookings").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("cars").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("country_sales").delete().neq("id", "none");
  await supabase.from("monthly_analytics").delete().neq("id", -1);
  await supabase.from("dashboard_metrics").delete().neq("id", "none");

  console.log("✅ All tables cleared!");
  console.log("🔄 Re-seeding clean data...");

  // Call seed script
  await import("./seed.mjs");
}

resetDatabase();

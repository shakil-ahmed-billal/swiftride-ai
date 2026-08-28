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

async function seedAdmin() {
  console.log("👑 Seeding Admin Account into SwiftRide Database...\n");

  const adminUser = {
    p_full_name: "SwiftRide Admin",
    p_email: "admin@swiftride.com",
    p_password: "admin123",
    p_role: "admin",
  };

  try {
    const { data, error } = await supabase.rpc("register_new_user", adminUser);

    if (error) {
      console.error("❌ Failed to seed admin user:", error.message);
      process.exit(1);
    }

    const res = data;
    if (!res.success) {
      console.error("❌ Seed returned error:", res.error);
      process.exit(1);
    }

    console.log("✅ Admin Account Successfully Seeded!");
    console.log("-----------------------------------------");
    console.log("📧 Email:    admin@swiftride.com");
    console.log("🔑 Password: admin123");
    console.log("🛡️ Role:     admin");
    console.log("🚀 Redirect: /admin/dashboard (Auto-redirect on login)");
    console.log("-----------------------------------------\n");
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

seedAdmin();

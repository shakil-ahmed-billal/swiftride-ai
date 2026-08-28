import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.warn(
      "Supabase URL or Anon Key is missing. Please check your .env.local configuration.",
    );
  }
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
);

export type AuthUser = {
  id: string;
  email: string;
  full_name: string;
  role?: "admin" | "user" | string;
};

export const getStoredAuthUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("swiftride_auth_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredAuthUser = (user: AuthUser | null) => {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem("swiftride_auth_user", JSON.stringify(user));
    const role = user.role || (user.email?.toLowerCase() === "admin@swiftride.com" ? "admin" : "user");
    document.cookie = `swiftride_auth_role=${role}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `swiftride_auth_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=2592000; SameSite=Lax`;
  } else {
    localStorage.removeItem("swiftride_auth_user");
    document.cookie = "swiftride_auth_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "swiftride_auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
  window.dispatchEvent(new Event("swiftride-auth-changed"));
};

export type Car = {
  id: string;
  name: string;
  brand: string;
  type: string;
  transmission: string;
  fuel_type: string;
  seats: number;
  price_per_day: number;
  image: string;
  available: boolean;
  sales_count: number;
  rating: number;
  created_at?: string;
  updated_at?: string;
};

export type Booking = {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  country?: string;
  car_id: string;
  car_name: string;
  car_image: string;
  start_date: string;
  end_date: string;
  duration: string;
  total_amount: number;
  payment_method: string;
  transaction_id: string;
  status: "Success" | "Cancelled" | "Pending";
  created_at: string;
};

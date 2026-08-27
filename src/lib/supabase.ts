import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.warn(
      "Supabase URL or Anon Key is missing. Please check your .env.local configuration."
    );
  }
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

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

export type DashboardMetric = {
  id: string;
  metric_name: string;
  metric_value: string;
  trend_percentage: string;
  trend_type: "increase" | "decrease";
  updated_at: string;
};

export type CountrySale = {
  id: string;
  country_code: string;
  country_name: string;
  sales_count: number;
  revenue: number;
  growth_percentage: number;
  updated_at: string;
};

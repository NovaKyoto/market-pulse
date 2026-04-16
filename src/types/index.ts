export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  business_name: string | null;
  logo_url: string | null;
  brand_color: string;
  zip_codes: string[];
  onboarding_complete: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: string;
  ai_tone: string;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Recipient {
  id: string;
  user_id: string;
  email: string;
  name: string | null;
  active: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  zip_code: string;
  title: string;
  summary: string | null;
  market_data: MarketData | null;
  ai_insights: string | null;
  pdf_url: string | null;
  status: string;
  sent_at: string | null;
  created_at: string;
}

export interface MarketData {
  median_price: number;
  price_change_pct: number;
  avg_days_on_market: number;
  active_listings: number;
  sold_last_30: number;
  price_per_sqft: number;
  inventory_months: number;
  median_rent: number | null;
  zip_code: string;
  city: string;
  state: string;
  fetched_at: string;
}

export interface MarketDataCache {
  id: string;
  zip_code: string;
  data_type: string;
  data: Record<string, unknown>;
  fetched_at: string;
  expires_at: string;
}

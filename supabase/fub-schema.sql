-- Add Follow Up Boss API key column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS fub_api_key text;

-- Ensure the column is only readable by the owning user (RLS already covers this via existing policies)
COMMENT ON COLUMN profiles.fub_api_key IS 'Follow Up Boss API key for CRM integration';

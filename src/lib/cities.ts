/**
 * Top US metro areas with primary ZIP codes for programmatic SEO pages.
 * Each city generates a /market/[slug] page.
 */

export interface City {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  zipCode: string;
  population?: number;
}

export const CITIES: City[] = [
  // Top 50 US metros by population / search volume
  { slug: "new-york-ny", name: "New York", state: "New York", stateCode: "NY", zipCode: "10001" },
  { slug: "los-angeles-ca", name: "Los Angeles", state: "California", stateCode: "CA", zipCode: "90001" },
  { slug: "chicago-il", name: "Chicago", state: "Illinois", stateCode: "IL", zipCode: "60601" },
  { slug: "houston-tx", name: "Houston", state: "Texas", stateCode: "TX", zipCode: "77001" },
  { slug: "phoenix-az", name: "Phoenix", state: "Arizona", stateCode: "AZ", zipCode: "85001" },
  { slug: "philadelphia-pa", name: "Philadelphia", state: "Pennsylvania", stateCode: "PA", zipCode: "19103" },
  { slug: "san-antonio-tx", name: "San Antonio", state: "Texas", stateCode: "TX", zipCode: "78205" },
  { slug: "san-diego-ca", name: "San Diego", state: "California", stateCode: "CA", zipCode: "92101" },
  { slug: "dallas-tx", name: "Dallas", state: "Texas", stateCode: "TX", zipCode: "75201" },
  { slug: "austin-tx", name: "Austin", state: "Texas", stateCode: "TX", zipCode: "78701" },
  { slug: "san-jose-ca", name: "San Jose", state: "California", stateCode: "CA", zipCode: "95113" },
  { slug: "fort-worth-tx", name: "Fort Worth", state: "Texas", stateCode: "TX", zipCode: "76102" },
  { slug: "jacksonville-fl", name: "Jacksonville", state: "Florida", stateCode: "FL", zipCode: "32202" },
  { slug: "columbus-oh", name: "Columbus", state: "Ohio", stateCode: "OH", zipCode: "43215" },
  { slug: "charlotte-nc", name: "Charlotte", state: "North Carolina", stateCode: "NC", zipCode: "28202" },
  { slug: "indianapolis-in", name: "Indianapolis", state: "Indiana", stateCode: "IN", zipCode: "46204" },
  { slug: "san-francisco-ca", name: "San Francisco", state: "California", stateCode: "CA", zipCode: "94102" },
  { slug: "seattle-wa", name: "Seattle", state: "Washington", stateCode: "WA", zipCode: "98101" },
  { slug: "denver-co", name: "Denver", state: "Colorado", stateCode: "CO", zipCode: "80202" },
  { slug: "washington-dc", name: "Washington", state: "District of Columbia", stateCode: "DC", zipCode: "20001" },
  { slug: "nashville-tn", name: "Nashville", state: "Tennessee", stateCode: "TN", zipCode: "37203" },
  { slug: "oklahoma-city-ok", name: "Oklahoma City", state: "Oklahoma", stateCode: "OK", zipCode: "73102" },
  { slug: "el-paso-tx", name: "El Paso", state: "Texas", stateCode: "TX", zipCode: "79901" },
  { slug: "boston-ma", name: "Boston", state: "Massachusetts", stateCode: "MA", zipCode: "02108" },
  { slug: "portland-or", name: "Portland", state: "Oregon", stateCode: "OR", zipCode: "97204" },
  { slug: "las-vegas-nv", name: "Las Vegas", state: "Nevada", stateCode: "NV", zipCode: "89101" },
  { slug: "detroit-mi", name: "Detroit", state: "Michigan", stateCode: "MI", zipCode: "48226" },
  { slug: "memphis-tn", name: "Memphis", state: "Tennessee", stateCode: "TN", zipCode: "38103" },
  { slug: "louisville-ky", name: "Louisville", state: "Kentucky", stateCode: "KY", zipCode: "40202" },
  { slug: "baltimore-md", name: "Baltimore", state: "Maryland", stateCode: "MD", zipCode: "21202" },
  { slug: "milwaukee-wi", name: "Milwaukee", state: "Wisconsin", stateCode: "WI", zipCode: "53202" },
  { slug: "albuquerque-nm", name: "Albuquerque", state: "New Mexico", stateCode: "NM", zipCode: "87102" },
  { slug: "tucson-az", name: "Tucson", state: "Arizona", stateCode: "AZ", zipCode: "85701" },
  { slug: "fresno-ca", name: "Fresno", state: "California", stateCode: "CA", zipCode: "93721" },
  { slug: "sacramento-ca", name: "Sacramento", state: "California", stateCode: "CA", zipCode: "95814" },
  { slug: "mesa-az", name: "Mesa", state: "Arizona", stateCode: "AZ", zipCode: "85201" },
  { slug: "kansas-city-mo", name: "Kansas City", state: "Missouri", stateCode: "MO", zipCode: "64108" },
  { slug: "atlanta-ga", name: "Atlanta", state: "Georgia", stateCode: "GA", zipCode: "30303" },
  { slug: "miami-fl", name: "Miami", state: "Florida", stateCode: "FL", zipCode: "33101" },
  { slug: "raleigh-nc", name: "Raleigh", state: "North Carolina", stateCode: "NC", zipCode: "27601" },
  { slug: "omaha-ne", name: "Omaha", state: "Nebraska", stateCode: "NE", zipCode: "68102" },
  { slug: "long-beach-ca", name: "Long Beach", state: "California", stateCode: "CA", zipCode: "90802" },
  { slug: "virginia-beach-va", name: "Virginia Beach", state: "Virginia", stateCode: "VA", zipCode: "23451" },
  { slug: "oakland-ca", name: "Oakland", state: "California", stateCode: "CA", zipCode: "94607" },
  { slug: "minneapolis-mn", name: "Minneapolis", state: "Minnesota", stateCode: "MN", zipCode: "55401" },
  { slug: "tulsa-ok", name: "Tulsa", state: "Oklahoma", stateCode: "OK", zipCode: "74103" },
  { slug: "tampa-fl", name: "Tampa", state: "Florida", stateCode: "FL", zipCode: "33602" },
  { slug: "arlington-tx", name: "Arlington", state: "Texas", stateCode: "TX", zipCode: "76010" },
  { slug: "new-orleans-la", name: "New Orleans", state: "Louisiana", stateCode: "LA", zipCode: "70112" },
  { slug: "orlando-fl", name: "Orlando", state: "Florida", stateCode: "FL", zipCode: "32801" },
];

/** Build a lookup map for fast slug → city resolution */
const citiesBySlug = new Map<string, City>(CITIES.map((c) => [c.slug, c]));

export function getCityBySlug(slug: string): City | undefined {
  return citiesBySlug.get(slug);
}

export function formatCityTitle(city: City): string {
  return `${city.name}, ${city.stateCode}`;
}

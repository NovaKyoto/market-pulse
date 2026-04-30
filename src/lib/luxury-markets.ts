/**
 * Featured luxury markets — a curated showcase of high-end ZIP codes
 * MarketPulse can generate reports for. Used in the "Luxury Markets" demo
 * section on /market to position the product for high-end agents.
 */

export interface LuxuryMarket {
  zipCode: string;
  city: string;
  state: string;
  region: string; // Display region label
  estimatedMedian: number;
  vibe: string; // Short tagline
}

export const LUXURY_MARKETS: LuxuryMarket[] = [
  {
    zipCode: "90210",
    city: "Beverly Hills",
    state: "CA",
    region: "California",
    estimatedMedian: 4_500_000,
    vibe: "Iconic luxury",
  },
  {
    zipCode: "94027",
    city: "Atherton",
    state: "CA",
    region: "Silicon Valley",
    estimatedMedian: 7_500_000,
    vibe: "Tech billionaire enclave",
  },
  {
    zipCode: "10007",
    city: "Tribeca",
    state: "NY",
    region: "Manhattan",
    estimatedMedian: 3_500_000,
    vibe: "Manhattan downtown elite",
  },
  {
    zipCode: "33480",
    city: "Palm Beach",
    state: "FL",
    region: "South Florida",
    estimatedMedian: 3_200_000,
    vibe: "Old-money beachfront",
  },
  {
    zipCode: "81611",
    city: "Aspen",
    state: "CO",
    region: "Colorado",
    estimatedMedian: 7_500_000,
    vibe: "Mountain luxury retreat",
  },
  {
    zipCode: "11962",
    city: "Sagaponack",
    state: "NY",
    region: "The Hamptons",
    estimatedMedian: 6_000_000,
    vibe: "Hamptons summer estate",
  },
  {
    zipCode: "06830",
    city: "Greenwich",
    state: "CT",
    region: "Connecticut",
    estimatedMedian: 2_400_000,
    vibe: "Hedge-fund row",
  },
  {
    zipCode: "33109",
    city: "Fisher Island",
    state: "FL",
    region: "Miami Beach",
    estimatedMedian: 6_500_000,
    vibe: "Most exclusive ZIP in America",
  },
  {
    zipCode: "20007",
    city: "Georgetown",
    state: "DC",
    region: "Washington DC",
    estimatedMedian: 1_900_000,
    vibe: "Historic political power",
  },
];

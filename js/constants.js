// Google Sheets published CSV URL
export const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQb-GOelrdZSxhCshzzCFLoo9Ticukfj5o0FNNyxRkV742FTpaUHQtwvnet_mt5gDdqLKqoGJytR7Ib/pub?gid=351052097&single=true&output=csv';

// Map data URL (pre-projected Albers)
export const US_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json';

// Design tokens
export const COLORS = {
  completed: '#22c55e',
  completedHover: '#4ade80',
  planned: '#f59e0b',
  plannedHover: '#fbbf24',
  empty: '#3b4f6b',
  emptyHover: '#4b6080',
  border: '#475569',
  accent: '#0ea5e9',
};

// Animation durations (ms)
export const ANIM = {
  stateTransition: 800,
  counterDuration: 1500,
  staggerDelay: 20,
  overlayIn: 300,
  overlayOut: 200,
};

// FIPS code → state abbreviation mapping
export const FIPS_TO_ABBREV = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
  '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
  '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
  '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
  '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
  '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
  '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
  '56': 'WY',
};

// State abbreviation → full name
export const ABBREV_TO_NAME = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin',
  WY: 'Wyoming',
};

// State total area in square miles (U.S. Census Bureau)
export const STATE_AREA_SQMI = {
  AL: 52420, AK: 665384, AZ: 113990, AR: 53179, CA: 163695,
  CO: 104094, CT: 5543, DE: 2489, FL: 65758, GA: 59425,
  HI: 10932, ID: 83569, IL: 57914, IN: 36420, IA: 56273,
  KS: 82278, KY: 40408, LA: 52378, ME: 35380, MD: 12406,
  MA: 10554, MI: 96714, MN: 86936, MS: 48432, MO: 69707,
  MT: 147040, NE: 77348, NV: 110572, NH: 9349, NJ: 8723,
  NM: 121590, NY: 54555, NC: 53819, ND: 70698, OH: 44826,
  OK: 69899, OR: 98379, PA: 46054, RI: 1545, SC: 32020,
  SD: 77116, TN: 42144, TX: 268596, UT: 84897, VT: 9616,
  VA: 42775, WA: 71298, WV: 24230, WI: 65496, WY: 97813,
};

// State population (2020 Census)
export const STATE_POPULATION = {
  AL: 5024279, AK: 733391, AZ: 7151502, AR: 3011524, CA: 39538223,
  CO: 5773714, CT: 3605944, DE: 989948, FL: 21538187, GA: 10711908,
  HI: 1455271, ID: 1839106, IL: 12812508, IN: 6785528, IA: 3190369,
  KS: 2937880, KY: 4505836, LA: 4657757, ME: 1362359, MD: 6177224,
  MA: 7029917, MI: 10077331, MN: 5706494, MS: 2961279, MO: 6154913,
  MT: 1084225, NE: 1961504, NV: 3104614, NH: 1377529, NJ: 9288994,
  NM: 2117522, NY: 20201249, NC: 10439388, ND: 779094, OH: 11799448,
  OK: 3959353, OR: 4237256, PA: 13002700, RI: 1097379, SC: 5118425,
  SD: 886667, TN: 6910840, TX: 29145505, UT: 3271616, VT: 643077,
  VA: 8631393, WA: 7705281, WV: 1793716, WI: 5893718, WY: 576851,
};

// Reverse lookup: abbreviation → FIPS
export const ABBREV_TO_FIPS = Object.fromEntries(
  Object.entries(FIPS_TO_ABBREV).map(([fips, abbrev]) => [abbrev, fips])
);

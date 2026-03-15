import { SHEET_CSV_URL } from './constants.js';

/**
 * Fetch and parse marathon data from Google Sheets.
 * Returns a Map<stateAbbrev, { race, date, time, distance, notes, status }>.
 */
export async function fetchSheetData() {
  const response = await fetch(SHEET_CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: ${response.status}`);
  }
  const csvText = await response.text();
  return parseCSV(csvText);
}

/**
 * Parse CSV text into marathon data map.
 */
export function parseCSV(csvText) {
  const Papa = window.Papa;
  if (!Papa) throw new Error('PapaParse not loaded');

  const result = Papa.parse(csvText, {
    header: false,
    skipEmptyLines: true,
  });

  const rows = result.data;
  if (rows.length < 2) return new Map();

  // Skip header row
  const dataRows = rows.slice(1);
  const stateMap = new Map();

  for (const row of dataRows) {
    const race = (row[0] || '').trim();
    const dateStr = (row[1] || '').trim();
    const time = (row[2] || '').trim();
    const distance = (row[3] || '').trim();
    const notes = (row[4] || '').trim();
    const stateAbbrev = (row[5] || '').trim().toUpperCase();

    // Only include rows with a state abbreviation (50-state qualifying)
    if (!stateAbbrev || stateAbbrev.length !== 2) continue;

    const status = time ? 'completed' : 'planned';
    const entry = { race, date: dateStr, time, distance, notes, status };

    // First entry for each state wins (the qualifying marathon)
    if (!stateMap.has(stateAbbrev)) {
      stateMap.set(stateAbbrev, entry);
    }
  }

  return stateMap;
}

/**
 * Parse "MM/DD/YYYY" → formatted "Month Day, Year"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('/');
  if (parts.length !== 3) return dateStr;
  const [month, day, year] = parts;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Parse time string to total seconds for comparison.
 */
export function timeToSeconds(timeStr) {
  if (!timeStr) return Infinity;
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return Infinity;
}

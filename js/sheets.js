/**
 * Hard-coded marathon data extracted from the Google Sheet.
 * 26 unique completed states + 2 planned = 28 entries.
 * First qualifying marathon per state is used.
 */

// Overall PR is Berlin Marathon (international, not a state race)
export const OVERALL_PR = { time: '3:01:04', race: 'Berlin Marathon' };
export const RACING_SINCE_YEAR = 2003;

export function getStateData() {
  return new Map([
    ['SC', { race: 'Charleston Marathon', date: '01/14/2012', time: '3:49:39', distance: 'Marathon', notes: '', status: 'completed' }],
    ['ME', { race: 'Maine Marathon', date: '09/30/2012', time: '3:45:52', distance: 'Marathon', notes: '', status: 'completed' }],
    ['NJ', { race: 'New Jersey Marathon', date: '05/05/2013', time: '3:09:18', distance: 'Marathon', notes: '', status: 'completed' }],
    ['VT', { race: 'Mad Marathon', date: '07/07/2013', time: '3:44:46', distance: 'Marathon', notes: '', status: 'completed' }],
    ['PA', { race: 'Philadelphia Marathon', date: '11/17/2013', time: '3:20:09', distance: 'Marathon', notes: '', status: 'completed' }],
    ['FL', { race: 'Jacksonville Bank Marathon', date: '12/28/2014', time: '4:33:32', distance: 'Marathon', notes: 'Had tonsilitis + recovered from food poisoning.', status: 'completed' }],
    ['WI', { race: "Journey's Marathon", date: '05/09/2015', time: '3:59:28', distance: 'Marathon', notes: "Didn't run for a time. Just enjoyed it.", status: 'completed' }],
    ['MN', { race: 'Twin Cities Marathon', date: '10/04/2015', time: '3:43:11', distance: 'Marathon', notes: 'Recovering from a cold.', status: 'completed' }],
    ['IN', { race: 'Tecumseh Trail Marathon', date: '10/29/2016', time: '5:01:30', distance: 'Marathon', notes: 'Recovering from a cold; very challenging course', status: 'completed' }],
    ['AR', { race: '3 Bridges Marathon', date: '12/17/2016', time: '3:38:24', distance: 'Marathon', notes: '', status: 'completed' }],
    ['OH', { race: 'Flying Pig Marathon', date: '05/07/2017', time: '3:37:38', distance: 'Marathon', notes: '', status: 'completed' }],
    ['IL', { race: 'Chicago Marathon', date: '10/08/2017', time: '3:17:22', distance: 'Marathon', notes: '1:32:04 first half, slowed greatly second half', status: 'completed' }],
    ['CA', { race: 'Los Angeles Marathon', date: '03/18/2018', time: '3:04:31', distance: 'Marathon', notes: '', status: 'completed' }],
    ['KY', { race: 'Kentucky Derby Marathon', date: '04/28/2018', time: '3:33:46', distance: 'Marathon', notes: '', status: 'completed' }],
    ['NV', { race: 'Hoover Dam Marathon', date: '12/09/2018', time: '3:42:12', distance: 'Marathon', notes: "Negative split! Was just running this for fun but once I hit halfway and saw how many people were within striking distance, I made a push to move up a few spots and have a solid 2nd half.", status: 'completed' }],
    ['TX', { race: 'Houston Marathon', date: '01/20/2019', time: '3:15:09', distance: 'Marathon', notes: "Very cold (around 33 at the start). Went out at about 3hr pace but had to hit the restroom twice. Wore layers and took some off but later had to put one back on. Faded around halfway and my watch started going bonkers making me think I was fading even harder than I actually was.", status: 'completed' }],
    ['MI', { race: 'Bayshore Marathon', date: '05/25/2019', time: '3:10:32', distance: 'Marathon', notes: "Went out a bit too fast, then humidity was very high the 2nd hour of the race resulting in a pretty big blowup. Last 3rd of the race was cooler but the damage was already done.", status: 'completed' }],
    ['IA', { race: 'run4troops', date: '06/27/2019', time: '3:56:53', distance: 'Marathon', notes: 'Extremely hot and humid; just running to knock Iowa off the list; "trained through" the marathon', status: 'completed' }],
    ['NE', { race: 'Lincoln Marathon', date: '05/02/2021', time: '3:32:02', distance: 'Marathon', notes: 'First marathon post-covid', status: 'completed' }],
    ['MS', { race: 'Mississippi Gulf Coast Marathon', date: '12/12/2021', time: '3:16:56', distance: 'Marathon', notes: "First time wearing vaporfly's. Headwind of about 10mph. Around 50 degrees.", status: 'completed' }],
    ['LA', { race: 'Zydeco Marathon', date: '03/13/2022', time: '3:37:11', distance: 'Marathon', notes: "First marathon post-Basil. Didn't go for a PR due to new job, newborn, and short turnaround. Weather was 32 and humid (ie frigid) to start. Full sun and warmed up by the end a bit. Nice little town. No terrible parts of the course. Flat. 2 loops. Had a pretty solid final 10k.", status: 'completed' }],
    ['OR', { race: 'Newport Marathon', date: '06/03/2023', time: '3:38:07', distance: 'Marathon', notes: "First complete marathon cycle post-Basil. Knew I wasn't going to PR. Hilly the first few miles -> took a lot out of my legs. Tried catching 3:30 pace group but by mile 10 I knew I was going too fast. Slowed down to make sure I didn't bonk hard. Weather was good, cool, wore gloves and long sleeve but took off at mile 3.", status: 'completed' }],
    ['UT', { race: 'Revel Big Cottonwood Marathon', date: '09/02/2023', time: '3:32:52', distance: 'Marathon', notes: "Steep downhill, trashed my quads and I blew up bigtime. Not enough downhill running experience. Great scenery, great race organization.", status: 'completed' }],
    ['GA', { race: 'Atlanta Marathon', date: '03/02/2025', time: '4:03:57', distance: 'Marathon', notes: "Cold 33 at start, very hilly, was aiming for 4hr so a pretty solid effort. Didn't train much. First marathon with Gio <3", status: 'completed' }],
    ['MT', { race: 'Wicked Fast Marathon', date: '08/30/2025', time: '4:24:31', distance: 'Marathon', notes: "Renamed from Jack n Jill Downhill Marathon 1 mo before the race. Really rough pre-race travel. Gio got sick the day before, started throwing up on the 2nd plane. I barely slept (maybe half an hour...). Montana was very beautiful. Got chased by one dog on the course and many dead snakes on the course. But very enjoyable despite all of that. Knocked Montana off the list and we got to go to Yellowstone and Grand Teton afterward. Weekend well spent.", status: 'completed' }],
    ['AZ', { race: 'Tucson Marathon', date: '12/14/2025', time: '3:46:11', distance: 'Marathon', notes: '', status: 'completed' }],
    ['MD', { race: 'HAT Run', date: '03/22/2026', time: '', distance: '', notes: '', status: 'planned' }],
    ['VA', { race: 'Virginia Marathon', date: '03/22/2026', time: '', distance: '', notes: '', status: 'planned' }],
  ]);
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

import { ANIM } from './constants.js';
import { timeToSeconds, OVERALL_PR, RACING_SINCE_YEAR } from './sheets.js';

/**
 * Compute stats from the marathon data map.
 */
export function computeStats(dataMap) {
  let completedCount = 0;
  let plannedCount = 0;
  let mostRecentDate = null;
  let mostRecentRace = '';

  for (const [abbrev, data] of dataMap) {
    if (data.status === 'completed') {
      completedCount++;

      if (data.date) {
        const parts = data.date.split('/');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
          if (!isNaN(d.getTime())) {
            if (!mostRecentDate || d > mostRecentDate) {
              mostRecentDate = d;
              mostRecentRace = data.race;
            }
          }
        }
      }
    } else {
      plannedCount++;
    }
  }

  const yearsRacing = new Date().getFullYear() - RACING_SINCE_YEAR;

  return {
    completedCount,
    plannedCount,
    totalGoal: 50,
    prTime: OVERALL_PR.time,
    prRace: OVERALL_PR.race,
    mostRecentRace,
    yearsRacing,
  };
}

/**
 * Render the stats dashboard and animate counters.
 */
export function renderStats(stats) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // State counter
  const counterEl = document.getElementById('state-counter');
  if (counterEl) {
    if (prefersReducedMotion) {
      counterEl.textContent = stats.completedCount;
    } else {
      animateCounter(counterEl, 0, stats.completedCount, ANIM.counterDuration);
    }
  }

  // Progress bar
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) {
    const pct = (stats.completedCount / stats.totalGoal) * 100;
    if (prefersReducedMotion) {
      progressFill.style.width = `${pct}%`;
    } else {
      requestAnimationFrame(() => {
        progressFill.style.width = `${pct}%`;
      });
    }
  }

  // Progress label
  const progressLabel = document.getElementById('progress-label');
  if (progressLabel) {
    progressLabel.textContent = `${stats.completedCount} of ${stats.totalGoal} states`;
  }

  // Stat cards
  setStatValue('stat-completed', `${stats.completedCount}`);
  setStatValue('stat-pr', stats.prTime || '—');
  setStatValue('stat-pr-race', stats.prRace || '');
  setStatValue('stat-years', `${stats.yearsRacing}+`);
  setStatValue('stat-recent', stats.mostRecentRace || '—');

  // Planned count
  if (stats.plannedCount > 0) {
    setStatValue('stat-planned', `${stats.plannedCount}`);
  }
}

function setStatValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/**
 * Animate a number from start to end.
 */
function animateCounter(el, start, end, duration) {
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

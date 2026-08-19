import { ANIM, STATE_AREA_SQMI, STATE_POPULATION } from './constants.js';
import { timeToSeconds, OVERALL_PR, RACING_SINCE_YEAR } from './sheets.js';

/**
 * Compute stats from the marathon data map.
 */
export function computeStats(dataMap) {
  let completedCount = 0;
  let plannedCount = 0;
  let mostRecentDate = null;
  let mostRecentRace = '';
  let completedArea = 0;
  let completedPopulation = 0;

  for (const [abbrev, data] of dataMap) {
    if (data.status === 'completed') {
      completedCount++;
      completedArea += STATE_AREA_SQMI[abbrev] || 0;
      completedPopulation += STATE_POPULATION[abbrev] || 0;

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

  const totalArea = Object.values(STATE_AREA_SQMI).reduce((sum, v) => sum + v, 0);
  const totalPopulation = Object.values(STATE_POPULATION).reduce((sum, v) => sum + v, 0);

  return {
    completedCount,
    plannedCount,
    totalGoal: 50,
    areaPct: totalArea ? (completedArea / totalArea) * 100 : 0,
    populationPct: totalPopulation ? (completedPopulation / totalPopulation) * 100 : 0,
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
    progressFill.closest('.progress-bar')?.classList.remove('loading');
    if (prefersReducedMotion) {
      progressFill.style.width = `${pct}%`;
    } else {
      requestAnimationFrame(() => {
        progressFill.style.width = `${pct}%`;
      });
    }
  }

  // Area / population meters
  renderMeter('meter-area', stats.areaPct, prefersReducedMotion);
  renderMeter('meter-population', stats.populationPct, prefersReducedMotion);

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
 * Render a secondary meter (fill width + percentage value).
 */
function renderMeter(id, pct, prefersReducedMotion) {
  const fill = document.getElementById(`${id}-fill`);
  const value = document.getElementById(`${id}-value`);

  const bar = fill ? fill.closest('.meter-bar') : null;
  if (bar) {
    bar.classList.remove('loading');
    bar.setAttribute('aria-valuenow', pct.toFixed(1));
  }

  if (fill) {
    if (prefersReducedMotion) {
      fill.style.width = `${pct}%`;
    } else {
      requestAnimationFrame(() => {
        fill.style.width = `${pct}%`;
      });
    }
  }

  if (value) {
    if (prefersReducedMotion) {
      value.textContent = `${pct.toFixed(1)}%`;
    } else {
      animatePercent(value, pct, ANIM.counterDuration);
    }
  }
}

/**
 * Animate a percentage value from 0 to end (one decimal place).
 */
function animatePercent(el, end, duration) {
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${(end * eased).toFixed(1)}%`;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
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

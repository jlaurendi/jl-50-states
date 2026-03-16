import { fetchSheetData } from './sheets.js';
import { initMap, colorizeStates } from './map.js';
import { initOverlay, showOverlay } from './overlay.js';
import { computeStats, renderStats } from './stats.js';

async function init() {
  // Initialize overlay system
  initOverlay();

  // Initialize map with click handler
  const mapContainer = document.getElementById('map-container');
  await initMap(mapContainer, {
    onClick: (abbrev, data) => showOverlay(abbrev, data),
  });

  // Fetch data (live sheet with hard-coded fallback)
  try {
    const dataMap = await fetchSheetData();
    colorizeStates(dataMap);
    const stats = computeStats(dataMap);
    renderStats(stats);
  } catch (err) {
    console.error('Failed to load data:', err);
    showBanner('Unable to load race data.');
  }

  // Fade in sections
  observeSections();
}

function showBanner(message) {
  const banner = document.getElementById('error-banner');
  if (banner) {
    banner.textContent = message;
    banner.hidden = false;
  }
}

function observeSections() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.fade-in-section').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
}

// Boot
init();

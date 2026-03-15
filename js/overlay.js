import { ABBREV_TO_NAME, ANIM } from './constants.js';
import { formatDate } from './sheets.js';

let overlayEl, backdropEl, contentEl;
let isOpen = false;

/**
 * Initialize the overlay system.
 */
export function initOverlay() {
  // Create backdrop
  backdropEl = document.createElement('div');
  backdropEl.className = 'overlay-backdrop';
  backdropEl.addEventListener('click', closeOverlay);
  document.body.appendChild(backdropEl);

  // Create overlay container
  overlayEl = document.createElement('div');
  overlayEl.className = 'overlay';
  overlayEl.setAttribute('role', 'dialog');
  overlayEl.setAttribute('aria-modal', 'true');
  overlayEl.setAttribute('aria-label', 'Race details');

  overlayEl.innerHTML = `
    <button class="overlay-close" aria-label="Close details">&times;</button>
    <div class="overlay-content"></div>
  `;

  overlayEl.querySelector('.overlay-close').addEventListener('click', closeOverlay);
  document.body.appendChild(overlayEl);
  contentEl = overlayEl.querySelector('.overlay-content');

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeOverlay();
  });
}

/**
 * Show overlay for a given state + race data.
 */
export function showOverlay(abbrev, data) {
  const stateName = ABBREV_TO_NAME[abbrev] || abbrev;
  const isCompleted = data.status === 'completed';

  const dateFormatted = formatDate(data.date);

  let html = `
    <div class="overlay-header">
      <span class="overlay-state-abbrev">${abbrev}</span>
      <h2 class="overlay-state-name">${stateName}</h2>
    </div>
  `;

  if (isCompleted) {
    html += `
      <div class="overlay-race-info">
        <h3 class="overlay-race-name">${escapeHtml(data.race)}</h3>
        ${dateFormatted ? `<p class="overlay-date">${dateFormatted}</p>` : ''}
        ${data.time ? `<p class="overlay-time">${data.time}</p>` : ''}
        ${data.distance ? `<p class="overlay-distance">${escapeHtml(data.distance)}</p>` : ''}
      </div>
    `;
    if (data.notes) {
      html += `
        <div class="overlay-notes">
          <p>${escapeHtml(data.notes)}</p>
        </div>
      `;
    }
  } else {
    html += `
      <div class="overlay-planned">
        <span class="overlay-planned-badge">Coming Up!</span>
        <h3 class="overlay-race-name">${escapeHtml(data.race)}</h3>
        ${dateFormatted ? `<p class="overlay-date">${dateFormatted}</p>` : ''}
      </div>
    `;
  }

  contentEl.innerHTML = html;

  // Show
  backdropEl.classList.add('active');
  overlayEl.classList.add('active');
  isOpen = true;

  // Trap focus
  overlayEl.querySelector('.overlay-close').focus();
}

/**
 * Close the overlay.
 */
export function closeOverlay() {
  backdropEl.classList.remove('active');
  overlayEl.classList.remove('active');
  isOpen = false;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

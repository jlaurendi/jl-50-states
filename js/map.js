const d3 = window.d3;
const topojson = window.topojson;
import { US_ATLAS_URL, COLORS, ANIM, FIPS_TO_ABBREV, ABBREV_TO_NAME } from './constants.js';

let svg, statesGroup, tooltip;
let stateDataMap = new Map();
let onStateClick = null;

/**
 * Initialize the map: fetch topology, render SVG paths, wire interactions.
 */
export async function initMap(container, { onClick } = {}) {
  onStateClick = onClick;

  const response = await fetch(US_ATLAS_URL);
  const us = await response.json();
  const states = topojson.feature(us, us.objects.states);
  const borders = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

  svg = d3.select(container)
    .append('svg')
    .attr('viewBox', '0 0 975 610')
    .attr('class', 'map-svg')
    .attr('role', 'img')
    .attr('aria-label', '50 States Marathon Progress Map');

  statesGroup = svg.append('g').attr('class', 'states');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Draw state paths
  statesGroup.selectAll('path')
    .data(states.features)
    .join('path')
    .attr('d', d3.geoPath())
    .attr('data-fips', d => String(d.id).padStart(2, '0'))
    .attr('data-state', d => FIPS_TO_ABBREV[String(d.id).padStart(2, '0')] || '')
    .attr('class', 'state-path')
    .attr('fill', COLORS.empty)
    .attr('stroke', '#94a3b8')
    .attr('stroke-width', 1.5)
    .attr('role', 'button')
    .attr('tabindex', '0')
    .attr('aria-label', d => {
      const abbrev = FIPS_TO_ABBREV[String(d.id).padStart(2, '0')];
      return `${ABBREV_TO_NAME[abbrev] || 'Unknown'} — not yet completed`;
    })
    .style('opacity', prefersReducedMotion ? 1 : 0)
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave)
    .on('click', handleClick)
    .on('keydown', handleKeydown)
    .on('focus', handleFocus)
    .on('blur', handleBlur);

  // Staggered fade-in animation
  if (!prefersReducedMotion) {
    statesGroup.selectAll('path')
      .transition()
      .duration(600)
      .delay((d, i) => i * ANIM.staggerDelay)
      .style('opacity', 1);
  }

  // State borders overlay
  svg.append('path')
    .datum(borders)
    .attr('fill', 'none')
    .attr('stroke', '#94a3b8')
    .attr('stroke-width', 1.5)
    .attr('stroke-linejoin', 'round')
    .attr('pointer-events', 'none');

  // Tooltip element
  tooltip = d3.select(container)
    .append('div')
    .attr('class', 'map-tooltip')
    .attr('role', 'tooltip')
    .style('opacity', 0);

  return svg;
}

/**
 * Colorize states based on marathon data.
 */
export function colorizeStates(dataMap) {
  stateDataMap = dataMap;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  statesGroup.selectAll('path').each(function () {
    const el = d3.select(this);
    const abbrev = el.attr('data-state');
    const data = stateDataMap.get(abbrev);

    let fill = COLORS.empty;
    let statusLabel = 'not yet completed';

    if (data) {
      if (data.status === 'completed') {
        fill = COLORS.completed;
        statusLabel = `completed — ${data.race}`;
      } else {
        fill = COLORS.planned;
        statusLabel = `planned — ${data.race}`;
      }
    }

    el.attr('aria-label', `${ABBREV_TO_NAME[abbrev] || abbrev} — ${statusLabel}`);

    if (prefersReducedMotion) {
      el.attr('fill', fill);
    } else {
      el.transition()
        .duration(ANIM.stateTransition)
        .attr('fill', fill);
    }
  });
}

function handleMouseEnter(event, d) {
  const el = d3.select(this);
  const abbrev = el.attr('data-state');
  const data = stateDataMap.get(abbrev);
  const name = ABBREV_TO_NAME[abbrev] || abbrev;

  // Brighten
  let hoverColor = COLORS.emptyHover;
  if (data?.status === 'completed') hoverColor = COLORS.completedHover;
  else if (data?.status === 'planned') hoverColor = COLORS.plannedHover;
  el.attr('fill', hoverColor);
  el.style('transform-origin', 'center').style('cursor', 'pointer');

  // Tooltip
  let tooltipText = `${name}`;
  if (data?.status === 'completed') tooltipText += ` ✓`;
  else if (data?.status === 'planned') tooltipText += ` — Upcoming`;

  tooltip.html(tooltipText)
    .style('opacity', 1)
    .style('left', `${event.offsetX + 12}px`)
    .style('top', `${event.offsetY - 28}px`);
}

function handleMouseLeave(event, d) {
  const el = d3.select(this);
  const abbrev = el.attr('data-state');
  const data = stateDataMap.get(abbrev);

  let fill = COLORS.empty;
  if (data?.status === 'completed') fill = COLORS.completed;
  else if (data?.status === 'planned') fill = COLORS.planned;
  el.attr('fill', fill);

  tooltip.style('opacity', 0);
}

function handleClick(event, d) {
  const abbrev = d3.select(this).attr('data-state');
  const data = stateDataMap.get(abbrev);
  if (data && onStateClick) {
    onStateClick(abbrev, data);
  }
}

function handleKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick.call(this, event, d3.select(this).datum());
  }
}

function handleFocus(event) {
  d3.select(this).classed('focused', true);
}

function handleBlur(event) {
  d3.select(this).classed('focused', false);
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { generateContributionData, getContributionColor } from '@/lib/github';

// Cell dimensions in pixels
const CELL_SIZE = 14;
const CELL_GAP = 2;
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function GithubContributionGraph({ username = 'ajpalok' }) {
  const svgRef = useRef(null);
  const [view, setView] = useState('year');
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate contribution data on mount
  useEffect(() => {
    try {
      const data = generateContributionData();
      setWeeks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Render SVG heatmap
  useEffect(() => {
    if (!svgRef.current || weeks.length === 0) return;

    const visibleWeeks = view === 'month' ? 6 : weeks.length;
    const startWeek = view === 'month' ? Math.max(0, weeks.length - 6) : 0;
    const displayWeeks = weeks.slice(startWeek, startWeek + visibleWeeks);

    const width = displayWeeks.length * (CELL_SIZE + CELL_GAP) + 50;
    const height = 7 * (CELL_SIZE + CELL_GAP) + 50;

    // Clear and set SVG dimensions
    svgRef.current.innerHTML = '';
    svgRef.current.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svgRef.current.setAttribute('width', width);
    svgRef.current.setAttribute('height', height);

    const svg = svgRef.current;

    // Draw day labels (left side)
    DAY_LABELS.forEach((label, dayIndex) => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '0');
      text.setAttribute('y', 35 + dayIndex * (CELL_SIZE + CELL_GAP) + 12);
      text.setAttribute('font-size', '12');
      text.setAttribute('fill', '#9b8b78');
      text.setAttribute('font-family', 'monospace');
      text.textContent = label;
      svg.appendChild(text);
    });

    // Draw month labels (top)
    let monthLabelX = 50;
    let lastMonth = -1;
    displayWeeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay && firstDay.date.getMonth() !== lastMonth) {
        const month = firstDay.date.toLocaleDateString('en-US', { month: 'short' });
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', monthLabelX);
        text.setAttribute('y', '20');
        text.setAttribute('font-size', '12');
        text.setAttribute('fill', '#9b8b78');
        text.setAttribute('font-family', 'monospace');
        text.textContent = month;
        svg.appendChild(text);
        lastMonth = firstDay.date.getMonth();
      }
      monthLabelX += CELL_SIZE + CELL_GAP;
    });

    // Draw contribution cells
    displayWeeks.forEach((week, weekIndex) => {
      week.forEach((day, dayIndex) => {
        const x = 50 + weekIndex * (CELL_SIZE + CELL_GAP);
        const y = 35 + dayIndex * (CELL_SIZE + CELL_GAP);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', CELL_SIZE);
        rect.setAttribute('height', CELL_SIZE);
        rect.setAttribute('fill', getContributionColor(day.level));
        rect.setAttribute('rx', '2');
        rect.setAttribute('class', 'hover:opacity-80 cursor-pointer transition-opacity');

        // Add tooltip
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
        rect.appendChild(title);

        svg.appendChild(rect);
      });
    });
  }, [weeks, view]);

  if (error) {
    return (
      <section className="w-full bg-paper text-ink py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent-2">Error loading contribution data: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-paper text-ink py-20 md:py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2 mb-4">
              <span className="h-px w-8 bg-accent" />
              GitHub Activity
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[0.95]">
              A Year in Commits<span className="text-accent">.</span>
            </h2>
            <p className="text-ink-2 text-sm mt-4">Each square is a day. The warmer it burns, the busier it was.</p>
          </div>

          <Link
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group w-fit text-xs font-mono uppercase tracking-widest text-ink-2"
          >
            @{username}
            <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </Link>
        </div>

        {/* Contribution Graph */}
        <div className="bg-paper-2 bg-blueprint-fine p-5 md:p-6 rounded-lg border border-line overflow-x-auto">
          {loading ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-ink-3 font-mono text-sm">Loading contributions…</p>
            </div>
          ) : (
            <svg ref={svgRef} className="w-full h-auto min-h-50" />
          )}
        </div>

        {/* Legend */}
        <div className="mt-5 flex items-center gap-2.5 flex-wrap text-xs">
          <span className="text-ink-3 font-mono mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-3.5 h-3.5 rounded-[3px] ring-1 ring-ink/5"
              style={{ backgroundColor: getContributionColor(level) }}
              title={`${level} contribution level`}
            />
          ))}
          <span className="text-ink-3 font-mono ml-1">More</span>
        </div>
      </div>
    </section>
  );
}

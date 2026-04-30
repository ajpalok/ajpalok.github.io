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
      text.setAttribute('fill', '#6b7280');
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
        text.setAttribute('fill', '#6b7280');
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
      <section className="w-full bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-400">Error loading contribution data: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500">GitHub Activity</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              Contribution <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">Graph</span>
            </h2>
            <p className="text-gray-400 text-sm">Last year of contributions on GitHub. Each square represents a day.</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* <button
              onClick={() => setView('year')}
              className={`text-xs font-mono uppercase tracking-widest px-3 py-2 rounded transition-all ${
                view === 'year'
                  ? 'bg-white/8 border-white/20'
                  : 'bg-transparent border-white/5 hover:border-white/10'
              } border`}
            >
              Year
            </button>
            <button
              onClick={() => setView('month')}
              className={`text-xs font-mono uppercase tracking-widest px-3 py-2 rounded transition-all ${
                view === 'month'
                  ? 'bg-white/8 border-white/20'
                  : 'bg-transparent border-white/5 hover:border-white/10'
              } border`}
            >
              6 Months
            </button> */}
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-xs font-mono uppercase tracking-widest border-b border-white/20 pb-0.5 hover:border-white transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>

        {/* Contribution Graph */}
        <div className="bg-white/2 p-6 rounded-lg border border-white/5 overflow-x-auto">
          {loading ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-gray-400 font-mono text-sm">Loading contributions...</p>
            </div>
          ) : (
            <svg
              ref={svgRef}
              className="w-full h-auto min-h-50"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.05))' }}
            />
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-4 flex-wrap text-xs">
          <span className="text-gray-400 font-mono">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: getContributionColor(level) }}
              title={`${level} contribution level`}
            />
          ))}
          <span className="text-gray-400 font-mono">More</span>
        </div>
      </div>
    </section>
  );
}

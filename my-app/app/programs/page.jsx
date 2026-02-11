'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrograms } from '@/app/lib/Redux/programSlice';
import ProgramCards from '../components/Programs/ProgramCard';

export default function ProgramsPage() {
  const dispatch = useDispatch();
  const programs = useSelector(state => state.programs.items || []);

  /* FILTER STATE */
  const [goal, setGoal] = useState('All');
  const [level, setLevel] = useState('All');
  const [duration, setDuration] = useState('All');

  /* DROPDOWN STATE */
  const [open, setOpen] = useState(null);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  /* OPTIONS FROM DATA */
  const goals = useMemo(
    () => ['All', ...new Set(programs.map(p => p.goal))],
    [programs]
  );

  const levels = useMemo(
    () => ['All', ...new Set(programs.map(p => p.level))],
    [programs]
  );

  /* DURATION HELPER */
    const getMonths = (text = '') => {
    const value = parseInt(text);
    const lower = text.toLowerCase();

    if (lower.includes('week')) return value / 4;
    if (lower.includes('month')) return value;
    if (lower.includes('year')) return value * 12;

    return value; // fallback
    };


  /* FILTER LOGIC */
  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const months = getMonths(p.duration);

      const goalMatch = goal === 'All' || p.goal === goal;
      const levelMatch = level === 'All' || p.level === level;

      const durationMatch =
        duration === 'All' ||
        (duration === '<1' && months < 1) ||
        (duration === '<6' && months < 6) ||
        (duration === '>6' && months > 6);

      return goalMatch && levelMatch && durationMatch;
    });
  }, [programs, goal, level, duration]);

  const resetFilters = () => {
    setGoal('All');
    setLevel('All');
    setDuration('All');
  };

  return (
    <div className="min-h-screen bg-[#050b07] text-white font-sans">
        <main className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 space-y-8">

            {/* ===== HERO SECTION (UNCHANGED) ===== */}
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-8">
            <div className="space-y-4 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
                Explore <span className="text-transparent bg-clip-text bg-linear-to-r from-[#13ec5b] to-green-400">Programs</span>
                </h1>
                <p className="text-gray-400 font-medium">
                Find your next challenge with AI-curated training plans tailored to your specific goals and available gear.
                </p>
            </div>
            </div>

            {/* FILTER BAR */}
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap gap-3 items-center border-b border-white/5">

                {/* GOAL */}
                <div className="relative">
                <button
                    onClick={() => setOpen(open === 'goal' ? null : 'goal')}
                    className="px-4 py-2 rounded-lg bg-[#102216] border border-[#13ec5b]/40 text-[#13ec5b] text-sm font-bold uppercase flex items-center gap-2"
                >
                    Goal: {goal}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {open === 'goal' && (
                    <div className="absolute z-50 mt-2 w-44 bg-[#102216] border border-white/10 rounded-lg overflow-hidden">
                    {goals.map(g => (
                        <button
                        key={g}
                        onClick={() => { setGoal(g); setOpen(null); }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-[#13ec5b]/10"
                        >
                        {g}
                        </button>
                    ))}
                    </div>
                )}
                </div>

                {/* LEVEL */}
                <div className="relative">
                <button
                    onClick={() => setOpen(open === 'level' ? null : 'level')}
                    className="px-4 py-2 rounded-lg bg-[#102216] border border-[#13ec5b]/40 text-[#13ec5b] text-sm font-bold uppercase flex items-center gap-2"
                >
                    Level: {level}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {open === 'level' && (
                    <div className="absolute z-50 mt-2 w-44 bg-[#102216] border border-white/10 rounded-lg overflow-hidden">
                    {levels.map(l => (
                        <button
                        key={l}
                        onClick={() => { setLevel(l); setOpen(null); }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-[#13ec5b]/10"
                        >
                        {l}
                        </button>
                    ))}
                    </div>
                )}
                </div>

                {/* DURATION */}
                <div className="relative">
                <button
                    onClick={() => setOpen(open === 'duration' ? null : 'duration')}
                    className="px-4 py-2 rounded-lg bg-[#102216] border border-[#13ec5b]/40 text-[#13ec5b] text-sm font-bold uppercase flex items-center gap-2"
                >
                    Duration
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {open === 'duration' && (
                    <div className="absolute z-50 mt-2 w-52 bg-[#102216] border border-white/10 rounded-lg overflow-hidden">
                    {[
                        ['All', 'All Durations'],
                        ['<1', 'Less than 1 month'],
                        ['<6', 'Less than 6 months'],
                        ['>6', 'More than 6 months'],
                    ].map(([v, label]) => (
                        <button
                        key={v}
                        onClick={() => { setDuration(v); setOpen(null); }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-[#13ec5b]/10"
                        >
                        {label}
                        </button>
                    ))}
                    </div>
                )}
                </div>

                {/* RIGHT SIDE */}
                <div className="ml-auto flex items-center gap-4">
                <span className="text-xs font-medium text-gray-500 hidden sm:block">
                    Showing {filteredPrograms.length} Results
                </span>
                <button
                    onClick={resetFilters}
                    className="text-sm text-gray-400 hover:text-[#13ec5b] underline"
                >
                    Reset
                </button>
                </div>
            </div>
          </main>

      {/* PROGRAMS */}
      <ProgramCards programs={filteredPrograms} />
    </div>
  );
}

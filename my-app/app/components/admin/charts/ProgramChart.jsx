'use client'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrograms } from '@/app/lib/Redux/programSlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function ProgramsDashboard() {
  const dispatch = useDispatch();
  const { items: programs } = useSelector((state) => state.programs);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  // ---------------- Doughnut Chart: Levels ----------------
  const levelCounts = programs.reduce((acc, p) => {
    const level = p.level || 'Other';
    if (!acc[level]) acc[level] = 0;
    acc[level] += 1;
    return acc;
  }, {});

  const levelData = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        data: Object.values(levelCounts),
        backgroundColor: ['#4ade80', '#60a5fa', '#facc15', '#f472b6'],
        borderWidth: 2,
        borderColor: '#1f2937',
      },
    ],
  };

  const levelOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#fff', font: { size: 14 } } },
      title: { display: true, text: 'Programs by Level', color: '#fff', font: { size: 20, weight: 'bold' } },
      tooltip: { backgroundColor: '#1f2937', titleColor: '#fff', bodyColor: '#fff' },
    },
  };

  // ---------------- Mixed Chart: Goal ----------------
  const goalCounts = programs.reduce((acc, p) => {
    const goal = p.goal || 'Other';
    if (!acc[goal]) acc[goal] = 0;
    acc[goal] += 1;
    return acc;
  }, {});

  const goalData = {
    labels: Object.keys(goalCounts),
    datasets: [
      {
        type: 'bar',
        label: 'Programs Count',
        data: Object.values(goalCounts),
        borderRadius: 10,
        backgroundColor: function (context) {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0.8)');
          gradient.addColorStop(1, 'rgba(34, 211, 238, 0.3)');
          return gradient;
        },
      },
      {
        type: 'line',
        label: 'Trend',
        data: Object.values(goalCounts),
        borderColor: '#f97316',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        pointBackgroundColor: '#f97316',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // ---------------- Mixed Chart: Status ----------------
  const statusCounts = programs.reduce(
    (acc, p) => {
      if (p.status === 'active') acc.active += 1;
      else acc.draft += 1;
      return acc;
    },
    { active: 0, draft: 0 }
  );

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        type: 'bar',
        label: 'Programs Count',
        data: Object.values(statusCounts),
        borderRadius: 10,
        backgroundColor: function (context) {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(74, 222, 128, 0.8)');
          gradient.addColorStop(1, 'rgba(74, 222, 128, 0.3)');
          return gradient;
        },
      },
      {
        type: 'line',
        label: 'Trend',
        data: Object.values(statusCounts),
        borderColor: '#f87171',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        backgroundColor: 'rgba(248, 113, 113, 0.2)',
        pointBackgroundColor: '#f87171',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const optionsMixed = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: 'easeOutQuart' },
    plugins: {
      legend: { position: 'top', labels: { color: '#fff', font: { size: 14 } } },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#4ade80',
        borderWidth: 1,
      },
    },
    scales: {
      x: { ticks: { color: '#fff', font: { size: 12 } }, grid: { color: '#374151' } },
      y: { ticks: { color: '#fff', font: { size: 12 } }, grid: { color: '#374151' }, beginAtZero: true },
    },
  };

  return (
    <>
    
      {/* Doughnut Chart: Level */}
      <div className="min-w-full bg-gray-900 p-6 rounded-3xl shadow-2xl w-full md:w-[60%] mx-auto h-100 flex items-center justify-center">
        <Chart ref={chartRef} type="doughnut" data={levelData} options={levelOptions} className='' />
      </div>
    <div className="min-w-full flex flex-col md:flex-row flex-wrap justify-center gap-8 my-12 px-4">

      {/* Mixed Chart: Goal */}
      <div className="  bg-gray-900 p-6 rounded-3xl shadow-2xl w-full md:min-w-[40%] h-[400px] flex items-center justify-center">
        <Chart ref={chartRef} type="bar" data={goalData} options={{ ...optionsMixed, plugins: { ...optionsMixed.plugins, title: { ...optionsMixed.plugins.title, display: true, text: 'Programs by Goal', color: '#fff', font: { size: 20, weight: 'bold' } } } }} />
      </div>

      {/* Mixed Chart: Status */}
      <div className=" bg-gray-900 p-6 rounded-3xl shadow-2xl w-full md:min-w-[40%] h-[400px] flex items-center justify-center">
        <Chart ref={chartRef} type="bar" data={statusData} options={{ ...optionsMixed, plugins: { ...optionsMixed.plugins, title: { ...optionsMixed.plugins.title, display: true, text: 'Programs by Status', color: '#fff', font: { size: 20, weight: 'bold' } } } }} />
      </div>
    </div>
    </>
  );
}

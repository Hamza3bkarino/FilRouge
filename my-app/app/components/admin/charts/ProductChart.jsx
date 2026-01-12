'use client'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/app/lib/Redux/productSlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend
);

export default function MixedProductChart() {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Prepare chart data
  const labels = products.map((p) => p.name);

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Stock',
        data: products.map((p) => p.stock),
        borderRadius: 10, // rounded bars
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
        label: 'Price',
        data: products.map((p) => p.price),
        borderColor: '#8b5cf6',
        borderWidth: 3,
        fill: true,
        tension: 0.4, // smooth line
        backgroundColor: 'rgba(139, 92, 246, 0.2)', // area under line
        pointBackgroundColor: '#8b5cf6',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { 
        position: 'top', 
        labels: { color: '#fff', font: { size: 14 } } 
      },
      title: { 
        display: true, 
        text: 'Products Stock & Price', 
        color: '#fff', 
        font: { size: 20, weight: 'bold' },
        padding: { top: 10, bottom: 30 }
      },
      tooltip: { 
        mode: 'index', 
        intersect: false,
        backgroundColor: '#1f2937', 
        titleColor: '#fff', 
        bodyColor: '#fff', 
        borderColor: '#4ade80',
        borderWidth: 1
      },
    },
    scales: {
      x: { 
        ticks: { color: '#fff', font: { size: 12 } }, 
        grid: { color: '#374151' } 
      },
      y: { 
        ticks: { color: '#fff', font: { size: 12 } }, 
        grid: { color: '#374151' }, 
        beginAtZero: true 
      },
    },
  };

  return (
    <div className="w-full md:w-7xl mx-auto flex justify-center my-12">
      <div className="min-w-full bg-gray-900 p-6 rounded-3xl shadow-2xl w-full max-w-5xl h-125">
        <Chart ref={chartRef} type="bar" data={data} options={options} />
      </div>
    </div>
  );
}

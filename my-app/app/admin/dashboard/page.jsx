'use client'

import {useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import MixedProductChart from '@/app/components/admin/charts/ProductChart';
import ProgramCharts from '@/app/components/admin/charts/ProgramChart';
import { FiPlus, FiStar, FiPackage, FiActivity, FiMinus } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';

export default function Dashboard() {
  const router = useRouter();
  const [add, setAdd] = useState(false);

  const reduxProgram = useSelector(state => state.programs.items);
  const reduxProduct = useSelector(state => state.products.items);

  // Dynamic Stats
  const totalProducts = reduxProduct?.length || 0;
  const totalStock = reduxProduct?.reduce((acc, p) => acc + Number(p.stock), 0) || 0;
  const totalPrograms = reduxProgram?.length || 0;
  const activePrograms = reduxProgram?.filter(p => p.status === 'active').length || 0;

  // Stats array with design info
  const productStats = [
    {
      title: 'Total Products',
      value: totalProducts,
      trend: 'Current stock',
      trendIcon: FiMinus,
      trendColor: 'text-gray-500',
      icon: <FiPackage />,
      
    },
    {
      title: 'Total Stock',
      value: totalStock,
      trend: 'All items',
      trendIcon: FiMinus,
      trendColor: 'text-green-400',
      icon: <FiStar />,
    },
  ];

  const programStats = [
    {
      title: 'Total Programs',
      value: totalPrograms,
      trend: 'All programs',
      trendIcon: FiMinus,
      trendColor: 'text-yellow-400',
      icon: <FiActivity />,
    },
    {
      title: 'Active Programs',
      value: activePrograms,
      trend: 'Currently active',
      trendIcon: FiMinus,
      trendColor: 'text-green-200',
      icon: <FiStar />,
    },
  ];

  return (
    <>

      {/* Header */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
              Dashboard Overview
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1">
              Manage your sports ecosystem efficiently.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-900 border border-white/10 hover:border-emerald-500/50 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all">
              <FiStar className="w-4 h-4 text-emerald-500" />
              AI Insights
            </button>

            <button
              className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2 rounded-lg text-xs font-bold uppercase cursor-pointer hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              onClick={() => setAdd(true)}
            >
              <FiPlus className="w-4 h-4" />
              New Item
            </button>

            {add && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                <div className="bg-gray-900 w-full max-w-md rounded-2xl p-6 relative">
                  <button
                    onClick={() => setAdd(false)}
                    className="absolute top-4 right-2 text-gray-400 hover:text-white transition text-2xl"
                  >
                    <MdOutlineClose className="text-[20px] cursor-pointer" />
                  </button>

                  <h2 className="text-xl font-bold text-white mb-6">Add New</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition p-4 rounded-xl text-white"
                      onClick={() => router.push('/admin/addprogram')}
                    >
                      <FiActivity className="w-8 h-8 text-emerald-500" />
                      <span className="font-bold text-sm">Add Program</span>
                    </button>

                    <button
                      className="flex flex-col items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition p-4 rounded-xl text-white"
                      onClick={() => router.push('/admin/dashboard/products/add')}
                    >
                      <FiPackage className="w-8 h-8 text-blue-400" />
                      <span className="font-bold text-sm">Add Product</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Stats */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {productStats.map((stat, index) => {
            const TrendIcon = stat.trendIcon;
            return (
              <div
                key={index}
                className="bg-green-950/80 border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-all"
              >
                <div className={`absolute right-0 top-0 p-4 transition-opacity text-6xl ${stat.trendColor}`}>
                  {stat.icon}
                </div>

                <div className="relative z-10">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-2">{stat.title}</p>
                  <p className="text-3xl font-black text-white mb-3">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-xs ${stat.trendColor} font-bold`}>
                    <TrendIcon className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <MixedProductChart />
      </section>

      {/* Programs Stats */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {programStats.map((stat, index) => {
            const TrendIcon = stat.trendIcon;
            return (
              <div
                key={index}
                className="bg-green-950/80 border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-all"
              >
                <div className={`absolute right-0 top-0 p-4 transition-opacity text-6xl ${stat.trendColor}`}>
                  {stat.icon}
                </div>

                <div className="relative z-10">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-2">{stat.title}</p>
                  <p className="text-3xl font-black text-white mb-3">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-xs ${stat.trendColor} font-bold`}>
                    <TrendIcon className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ProgramCharts />
      </section>
    </>
  );
}

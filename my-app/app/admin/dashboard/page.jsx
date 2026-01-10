'use client'
import ProgramsTable from '@/app/components/admin/adminTable';
import NavbarAdmin from '@/app/components/admin/Navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiTrendingUp, FiMinus, FiAlertCircle, FiActivity, FiPlus, FiStar } from 'react-icons/fi';
import { FiPlusCircle, FiPackage } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('programs');
  const [add , setAdd] = useState(false);
  const [data , setData] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API;
  const router = useRouter();

  useEffect(()=>{
    axios.get(apiUrl)
        .then(res => setData(res.data))
        .catch(err => console.log(err)
        )
  },[])
  console.log('data : ',data);
  

  const stats = [
    {
      title: 'Active Programs',
      value: '24',
      trend: '+12% this month',
      trendIcon: FiTrendingUp,
      trendColor: 'text-green-200',
      iconBg: 'text-emerald-500',
      icon: <FiActivity />,
    },
    {
      title: 'Total Products',
      value: '1,208',
      trend: 'Stable',
      trendIcon: FiMinus,
      trendColor: 'text-gray-500',
      iconBg: 'text-blue-400',
      icon: <FiStar />,
    },
    {
      title: 'Low Stock Alerts',
      value: '5',
      trend: 'Action needed',
      trendIcon: FiAlertCircle,
      trendColor: 'text-red-400',
      iconBg: 'text-yellow-400',
      icon: <FiAlertCircle />,
    },
    {
      title: 'AI Gens Today',
      value: '142',
      trend: '+45% usage',
      trendIcon: FiTrendingUp,
      trendColor: 'text-green-500',
      iconBg: 'text-purple-400',
      icon: <FiStar />,
    },
  ];

  return (
    <>
        <NavbarAdmin/> 
        <section className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

                <button className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2 rounded-lg text-xs font-bold uppercase cursor-pointer hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    onClick={()=>setAdd(true)}
                >
                <FiPlus className="w-4 h-4" />
                New Item
                </button>

                {add && (
                    <>
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                            <div className="bg-gray-900 w-full max-w-md rounded-2xl p-6 relative">

                                <button
                                onClick={() => setOpen(false)}
                                className="absolute top-4 -right-5 text-gray-400 hover:text-white transition"
                                >
                                    <MdOutlineClose className='text-[20px] cursor-pointer' onClick={()=>setAdd(false)}/>
                                </button>

                                <h2 className="text-xl font-bold text-white mb-6">Add New</h2>

                                {/* Options */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Add Program */}
                                <button className="flex flex-col items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition p-4 rounded-xl text-white"
                                    onClick={()=>router.push('/admin/addprogram')}
                                >
                                    <FiPlusCircle className="w-8 h-8 text-emerald-500" />
                                    <span className="font-bold text-sm">Add Program</span>
                                </button>

                                {/* Add Product */}
                                <button className="flex flex-col items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition p-4 rounded-xl text-white">
                                    <FiPackage className="w-8 h-8 text-blue-400" />
                                    <span className="font-bold text-sm">Add Product</span>
                                </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {stats.map((stat, index) => {
                const TrendIcon = stat.trendIcon;
                return (
                <div
                    key={index}
                    className="bg-green-950/80  border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-all"
                >
                    {/* Background Icon */}
                    <div className={`absolute right-0 top-0 p-4  transition-opacity text-6xl ${stat.trendColor}`}>
                    {stat.icon}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">
                        {stat.title}
                    </p>
                    <p className="text-3xl font-black text-white mb-3">
                        {stat.value}
                    </p>
                    <div className={`flex items-center gap-1 text-xs ${stat.trendColor} font-bold`}>
                        <TrendIcon className="w-3 h-3" />
                        {stat.trend}
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </section>

        <section>
            <ProgramsTable data={data} activeTab={activeTab} setActiveTab={setActiveTab}/>
        </section>
    </>
  );
}

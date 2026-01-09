'use client'
import { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiStar, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ProgramsTable() {
  const [activeTab, setActiveTab] = useState('programs');

  const programs = [
    {
      id: 1,
      name: 'Total Shred 30',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop',
      lastEdited: '2 hours ago',
      level: { text: 'Advanced', color: 'blue' },
      goal: { text: 'Fat Loss', color: 'orange' },
      products: [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop',
      ],
      productCount: 2,
      status: 'active',
    },
    {
      id: 2,
      name: 'Morning Flow',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop',
      lastEdited: 'Yesterday',
      level: { text: 'Beginner', color: 'green' },
      goal: { text: 'Wellness', color: 'purple' },
      products: [
        'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=100&h=100&fit=crop',
      ],
      productCount: 0,
      status: 'draft',
    },
    {
      id: 3,
      name: 'Speed Demon',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=200&h=200&fit=crop',
      lastEdited: '3 days ago',
      level: { text: 'Elite', color: 'red' },
      goal: { text: 'Speed', color: 'yellow' },
      products: [
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=100&h=100&fit=crop',
      ],
      productCount: 1,
      status: 'active',
    },
    {
      id: 4,
      name: 'Power Build',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=200&fit=crop',
      lastEdited: '1 week ago',
      level: { text: 'Intermediate', color: 'blue' },
      goal: { text: 'Strength', color: 'indigo' },
      products: [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop',
      ],
      productCount: 2,
      status: 'review',
    },
  ];

  const tabs = [
    { id: 'programs', label: 'Programs' },
    { id: 'products', label: 'Products' },
    { id: 'models', label: 'AI Models' },
  ];

  const statusConfig = {
    active: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
    draft: { bg: 'bg-white/5', text: 'text-gray-400', border: 'border-white/10', dot: 'bg-gray-500' },
    review: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', dot: 'bg-yellow-500' },
  };

  const levelColors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-bold uppercase transition-colors ${
              tab.id === 'models' ? 'hidden sm:block' : ''
            } ${
              activeTab === tab.id
                ? 'text-emerald-500 border-b-2 border-emerald-500 bg-white/5'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-black/20">
        <div className="relative w-full sm:w-96">
          <FiSearch className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search programs..."
            className="w-full bg-gray-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-600 transition-colors outline-none"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 border border-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors">
            <FiFilter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 border border-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider border-b border-white/5">
              <th className="p-4">Program Name</th>
              <th className="p-4">Level & Goal</th>
              <th className="p-4 hidden md:table-cell">Included Products</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {programs.map((program) => {
              const statusStyle = statusConfig[program.status];
              return (
                <tr key={program.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-12 h-12 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <p className="font-bold text-white text-base">{program.name}</p>
                        <p className="text-xs text-gray-500">Last edited: {program.lastEdited}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${levelColors[program.level.color]}`}>
                        {program.level.text}
                      </span>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${levelColors[program.goal.color]}`}>
                        {program.goal.text}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex -space-x-2">
                      {program.products.map((product, idx) => (
                        <img
                          key={idx}
                          src={product}
                          alt={`Product ${idx + 1}`}
                          className="w-8 h-8 rounded-full border border-gray-900 bg-gray-800 object-cover"
                        />
                      ))}
                      {program.productCount > 0 && (
                        <div className="w-8 h-8 rounded-full border border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white bg-white/5">
                          +{program.productCount}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} text-xs font-bold uppercase`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} ${program.status === 'active' ? 'animate-pulse' : ''}`}></span>
                      {program.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors group/btn relative" title="AI Enhance">
                        <FiStar className="w-4 h-4" />
                        <div className="absolute bottom-full right-0 mb-2 w-max px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
                          AI Enhance
                        </div>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-white/5 bg-black/20">
        <p className="text-xs text-gray-500">
          Showing <span className="text-white font-bold">1-4</span> of <span className="text-white font-bold">24</span> results
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-emerald-500 text-black font-bold text-xs">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors text-xs">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors text-xs">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors">
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

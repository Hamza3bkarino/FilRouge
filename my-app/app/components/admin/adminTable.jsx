'use client'
import { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiStar, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ProgramsTable({data}) {
  const [activeTab, setActiveTab] = useState('programs');
  const [currentPage , setCurrentPage] = useState(1);


  const totalResults = data.length;   
  const rowsPerPage = 6; 

  // this for slice data 6 per page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPrograms = data.slice(startIndex, endIndex); 

  const totalPages = Math.ceil(totalResults / rowsPerPage);
  let showingText = "";

  if (totalPages < 1) {
    showingText = "No results";
  } else if (totalPages === 1) {
    showingText = `1 of ${totalResults} results`;
  } else {
    showingText = `1-${totalPages} of ${totalResults} results`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  


  const programs = currentPrograms.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      CreatedAt: item.createdAt,
      level: { text: item.level, color: item.level === "Beginner" ? "green" : "blue" },
      goal: { text:item.goal, color: item.goal === "Fat Loss" ? "orange" : "purple" },
      description : item.description,
      status: item.status === "spero" ? "active" : "draft",
    }));

  const tabs = [
    { id: 'programs', label: 'Programs' },
    { id: 'products', label: 'Products' },
    { id: 'models', label: 'AI Models' },
  ];

  const statusConfig = {
    active: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
    draft: { bg: 'bg-white/5', text: 'text-gray-400', border: 'border-white/10', dot: 'bg-gray-500' },
    // review: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', dot: 'bg-yellow-500' },
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
              <th className="p-4 hidden md:table-cell">Description</th>
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
                        <p className="text-xs text-gray-500">Created At: {program.CreatedAt.split("T")[0]}</p>
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
                    <div className=" text-gray-500 line-clamp-2 w-62.5">
                      {program.description}
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
        <p className="text-gray-400 text-sm"> 
          showing : {showingText}
        </p>
        <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-colors ${
                  currentPage === page
                    ? "bg-emerald-500 text-black"
                    : "bg-gray-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="w-8 h-8 flex items-center justify-center rounded bg-gray-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
        </div>
      </div>

    </div>
  );
}

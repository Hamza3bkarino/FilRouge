'use client'
import { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiStar, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import ExportButton from './Export';
import DeleteDataPopUp from './DeletePopUp';
import { useRouter } from 'next/navigation';

export default function ProgramsTable() {
  const [loading, setLoading] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [programsData, setProgramsData] = useState([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API;


  useEffect(()=>{
    axios.get(apiUrl)
        .then(res => setProgramsData(res.data))
        .catch(err => console.log(err)
        )
  },[])
console.log(programsData);

  const filteredPrograms = programsData.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())   // filter of search
  );
 
  const totalResults = programsData.length;   
  const rowsPerPage = 6; 

  // this for slice data 6 per page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPrograms = filteredPrograms.slice(startIndex, endIndex); // if filtred by search get value of search , else get all data of program

  const totalPages = Math.ceil(totalResults / rowsPerPage);
  let showingText = "";
  if (totalPages < 1) {
    showingText = "No results";
  } else if (totalPages === 1) {
    showingText = `1 of ${totalResults} results`;
  } else {
    showingText = `1-${totalPages} of ${totalResults} results`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);// create array [1,2]
  


  const programs = currentPrograms.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      CreatedAt: item.createdAt,
      level:  item.level,
      goal: item.goal ,
      duration: item.duration ,
      description : item.description,
      status: item.status ,
    }));





  const handleDelete =async(id)=>{
    setLoading(true)
    try {
      await axios.delete(`${apiUrl}${id}`)  
      setProgramsData(prev => prev.filter(e => e.id !== id));
      setShowDeleteModal(false);
      setSelectedProgram(null);
     } catch (error) {
        console.log(error);
     }finally{
      setLoading(false)
     }
  }



  const toggleActivation = async (program) => {
      const newStatus = program.status === "active" ? "draft" : "active";
      console.log(newStatus);

      try {
        await axios.put(`${apiUrl}${program.id}`, {
        ...program,       // send all fields, not just status
        status: newStatus,
        }
      )

        // Update UI immediately
        setProgramsData((prev) =>
          prev.map((p) =>
            p.id === program.id ? { ...p, status: newStatus } : p
          )
        );
      } catch (error) {
        console.error("Failed to update status", error);
      }
};


  return (
    <>
    
    <div className="max-w-7xl mx-auto bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      {/* Tabs */}
      <div className="flex border-b border-white/5">
        
          <button

            className={`w-full px-6 py-4 text-sm font-bold uppercase transition-colors 
                     text-emerald-500 border-b-2 border-emerald-500 bg-white/5'
          `}
          >
            programs
          </button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-black/20">
        <div className="relative w-full sm:w-96">
          <FiSearch className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}              
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full bg-gray-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-600 transition-colors outline-none"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 border border-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-colors">
            <FiFilter className="w-4 h-4" />
            Filter
          </button>

          <ExportButton data={programsData} type="programs" />
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
            {programs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No Results
                  </td>
                </tr>
              ) : (            
            programs.map((program) => {
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
                        <p className="text-xs text-gray-500">Duration: {program.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${program.level==='Beginner'?'bg-green-500/10 text-green-400 border-green-500/20':'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                        {program.level}
                      </span>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${"Fat Loss" ?'bg-orange-500/10 text-orange-400 border-orange-500/20':'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                        {program.goal}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className=" text-gray-500 line-clamp-2 w-62.5">
                      {program.description}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        program.status === "active"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-white/5 text-gray-400 border border-white/10"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          program.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-gray-500"
                        }`}
                      ></span>
                      {program.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                          onClick={() => toggleActivation(program)}
                          className={`p-2 rounded-lg transition-colors relative group/btn
                            ${
                              program.status === "active"
                                ? "text-emerald-500 bg-emerald-500/10"
                                : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10"
                            }
                          `}
                        >
                          <FiStar className="w-4 h-4" />

                          {/* Tooltip */}
                          <div className="absolute bottom-full right-0 mb-2 w-max px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
                            {program.status === "active" ? "Deactivate" : "Activate"}
                          </div>
                      </button>

                      <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        onClick={()=>router.push(`/admin/dashboard/programs/edit/${program.id}`)}
                      >
                        <FiEdit className="w-4 h-4"  />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                         onClick={() => {
                              setSelectedProgram(program);
                              setShowDeleteModal(true);
                            }}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>

                      {
                        showDeleteModal && (
                          <DeleteDataPopUp 
                            data={selectedProgram}
                            onCancel={()=>setShowDeleteModal(false)}
                            onDelete={()=>handleDelete(selectedProgram.id)}
                            loading={loading}
                            />
                        )
                      }
                    </div>
                  </td>
                </tr>
              );
            })
            )}
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
    </>
  );
}

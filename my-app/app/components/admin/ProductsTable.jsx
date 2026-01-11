


'use client'
import { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiStar, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import ExportButton from './Export';
import { useRouter } from 'next/navigation';
import DeleteDataPopUp from './DeletePopUp';

export default function ProductTable() {
  const [loading, setLoading] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]); // MUST be array
  const apiUrlProducts = process.env.NEXT_PUBLIC_API_PRODUCT;
  const router = useRouter();

    useEffect(() => {
    axios.get(apiUrlProducts)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, []);



    const filteredProducts = data.filter((p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

 
  const totalResults = filteredProducts.length;   
  const rowsPerPage = 6; 

  // this for slice data 6 per page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex); // if filtred by search get value of search , else get all data of program

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
  





  const handleDelete =async(id)=>{
    setLoading(true)
    try {
      await axios.delete(`${apiUrlProducts}${id}`)  
      setData(prev => prev.filter(e => e.id !== id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
     } catch (error) {
        console.log(error);
     }finally{
      setLoading(false)
     }
  }

  return (
    <>
    <div className='max-w-6xl mx-auto my-20'>

        <div className=" flex items-center justify-between mb-6">
        
        {/* Left Text */}
        <div>
            <h2 className="text-xl font-bold text-white">
            Products
            </h2>
            <p className="text-sm text-gray-400">
            Manage and add your store products
            </p>
        </div>

        {/* Right Button */}
        <button
            onClick={() => router.push("/admin/dashboard/products/add")}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg bg-green-500 text-black text-sm font-bold hover:bg-green-600 transition"
        >
            <FiPlus className="w-4 h-4" />
            Add Product
        </button>

        </div>
    </div>
        <div className="max-w-7xl mx-auto my-6 bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        {/* Tabs */}
        <div className="flex border-b border-white/5 ">
            
            <button

                className={`w-full px-6 py-4 text-sm font-bold uppercase transition-colors 
                        text-emerald-500 border-b-2 border-emerald-500 bg-white/5'
            `}
            >
                products
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

          <ExportButton data={data} type="products" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider border-b border-white/5">
              <th className="p-4">Product Name</th>
              <th className="p-4">Price</th>
              <th className="p-4 hidden md:table-cell">Description</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {currentProducts.length === 0 ? (
                <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                    No Results
                </td>
                </tr>
            ) : (
                currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                    <div className="flex items-center gap-3">
                        <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-white/10"
                        />
                        <div>
                            <p className="font-bold text-white">{product.name}</p>
                            <p className="text-xs text-gray-500">Created At: {product.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                    </td>

                    <td className="p-4 text-white">
                    ${product.price}
                    </td>

                    <td className="p-4 hidden md:table-cell ">
                        <div className='text-gray-400 line-clamp-2 max-w-62.5'>
                            {product.description}
                        </div>
                    </td>

                    <td className="p-4 text-white">
                    {product.stock}
                    </td>

                    <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"
                          onClick={()=>router.push(`/admin/dashboard/products/edit/${product.id}`)}
                        >
                        <FiEdit />
                        </button>
                        <button
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                        onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                        }}
                        >
                        <FiTrash2 />
                        </button>

                        {
                         showDeleteModal && (
                           <DeleteDataPopUp 
                             data={selectedProduct}
                             onCancel={()=>setShowDeleteModal(false)}
                             onDelete={()=>handleDelete(selectedProduct.id)}
                             loading={loading}
                             />
                         )
                        }
                    </div>
                    </td>
                </tr>
                ))
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

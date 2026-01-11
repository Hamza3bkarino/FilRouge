'use client'
import ProgramsTable from "@/app/components/admin/adminProgramTable";
import NavbarAdmin from "@/app/components/admin/Navbar";
import { useRouter } from "next/navigation";
import { FiPlus } from 'react-icons/fi';


export default function Programs(){

    const router = useRouter();
    return(
        <>
            <NavbarAdmin/>
            <div className="my-30">
                <div className='max-w-6xl mx-auto my-20'>
                
                        <div className=" flex items-center justify-between mb-6">
                        
                        {/* Left Text */}
                        <div>
                            <h2 className="text-xl font-bold text-white">
                            Programs
                            </h2>
                            <p className="text-sm text-gray-400">
                            Manage and add your store Programs
                            </p>
                        </div>
                
                        {/* Right Button */}
                        <button
                            onClick={() => router.push("/admin/addprogram")}
                            className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg bg-green-500 text-black text-sm font-bold hover:bg-green-600 transition"
                        >
                            <FiPlus className="w-4 h-4" />
                            Add Program
                        </button>
                
                        </div>
                    </div>
                <ProgramsTable/>
            </div>
        </>
    )
}
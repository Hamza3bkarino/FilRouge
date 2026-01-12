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
                <ProgramsTable/>
            </div>
        </>
    )
}
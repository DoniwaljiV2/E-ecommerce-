import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
    const [openSidebar,setOpneSidebar]=useState(false);
    return ( 
        <div className="flex min-h-screen w-full ">
            {/* admin sidebar */}
            <AdminSideBar open={openSidebar} setOpen={setOpneSidebar}/>
            <div className="flex flex-1 flex-col">
                {/* admin header */}
                <AdminHeader setOpen={setOpneSidebar}/>
                <main  className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                    <Outlet/>
                </main>
            </div>

        </div>
     );
}

export default AdminLayout;
import { Outlet } from "react-router-dom"
import AdminNavbar from "../shared/AdminNavbar"
import AdminSidebar from "../shared/AdminSidebar"

const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />
            <AdminSidebar />
            <Outlet />
        </>
    )
}

export default AdminLayout
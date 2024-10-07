import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../shared/AdminNavbar';
import AdminSidebar from '../shared/AdminSidebar';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onToggleSidebar={handleToggleSidebar} />
                <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
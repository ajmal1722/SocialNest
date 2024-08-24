import React from 'react';

const AdminNavbar = ({ onToggleSidebar }) => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            <button
                className="md:hidden p-2 focus:outline-none focus:bg-gray-700"
                onClick={onToggleSidebar}
            >
                ☰
            </button>
        </nav>
    );
};

export default AdminNavbar;
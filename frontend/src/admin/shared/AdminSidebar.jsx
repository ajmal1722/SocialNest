import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ isOpen }) => {
    return (
        <aside
            className={`bg-gray-700 text-white w-64 space-y-6 p-6 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0`}
        >
            <nav>
                <ul>
                    <li className="py-2 hover:bg-gray-600 rounded">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="py-2 hover:bg-gray-600 rounded">
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="py-2 hover:bg-gray-600 rounded">
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className="py-2 hover:bg-gray-600 rounded">
                        <Link to="/notifications">Notifications</Link>
                    </li>
                    {/* Add more links as necessary */}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
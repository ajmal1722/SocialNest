import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen }) => {
    return (
        <aside
            className={`z-50 bg-gray-800 text-white w-64 space-y-6 absolute inset-y-0 left-0 transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0`}
        >
            <nav className='my-20'>
                <ul>
                    <NavLink
                        to="/admin" end
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gray-700 py-2 p-10 hover:bg-gray-500 rounded block"
                                : "py-2 p-10 hover:bg-gray-600 rounded block"
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gray-700 py-2 p-10 hover:bg-gray-500 rounded block"
                                : "py-2 p-10 hover:bg-gray-600 rounded block"
                        }
                    >
                        Users
                    </NavLink>
                    <NavLink
                        to="/admin/reports"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gray-700 py-2 p-10 hover:bg-gray-500 rounded block"
                                : "py-2 p-10 hover:bg-gray-600 rounded block"
                        }
                    >
                        Reports
                    </NavLink>
                    <NavLink
                        to="/admin/notifications"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gray-700 py-2 p-10 hover:bg-gray-500 rounded block"
                                : "py-2 p-10 hover:bg-gray-600 rounded block"
                        }
                    >
                        Notifications
                    </NavLink>
                    <NavLink
                        to="/admin/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gray-700 py-2 p-10 hover:bg-gray-500 rounded block"
                                : "py-2 p-10 hover:bg-gray-600 rounded block"
                        }
                    >
                        Profile
                    </NavLink>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
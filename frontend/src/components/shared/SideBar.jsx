import sidebarData from "../../data/sidebarData";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const linkClass = ({ isActive }) => (
        isActive ? 'flex items-center gap-4 p-2 my-2 hover:bg-gray-300 dark:hover:bg-secondary-dark lg:px-12 md:px-8 font-semibold text-3xl'
        : 'flex items-center gap-4 p-2 my-2 hover:bg-gray-300 dark:hover:bg-secondary-dark lg:px-12 md:px-8 '
    )
    return (
        <div className='sidebar col-span-2 hidden sm:block border-r dark:border-gray-500'>
            <div className='h-full py-8 text-xl text-ternary-dark dark:text-primary-light'>
                {
                    sidebarData.map((item, index) => {
                        return (
                            <div key={index}>
                                <NavLink to={item.url} className={linkClass} >
                                    <item.icon  />
                                    <h1 className="text-lg">{item.name}</h1>
                                </NavLink>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default SideBar;

import sidebarData from "../../data/sidebarData";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <div className='sidebar col-span-2 hidden sm:block border-r'>
            <div className='bg-primary-light dark:bg-primary-dark h-full py-8 text-xl text-primary-dark dark:text-primary-light'>
                {
                    sidebarData.map((item, index) => {
                        return (
                            <div key={index}>
                                <NavLink to={item.url} className="flex items-center gap-4 p-2 hover:bg-gray-00 dark:hover:bg-secondary-dark lg:px-12 md:px-8 " activeClassName="bg-emerald-600 font-extrabold">
                                    <item.icon  />
                                    <h1 className="">{item.name}</h1>
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

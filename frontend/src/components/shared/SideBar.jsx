import sidebarData from "../../data/sidebarData";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <div className='sidebar my-1 mx-2'>
            <div className='bg-emerald-400 h-full w-48 rounded-lg py-8 text-xl dark:bg-gray-800'>
                {
                    sidebarData.map((item, index) => {
                        return (
                            <div key={index}>
                                <NavLink to={item.url} className="flex items-center gap-4 p-2 hover:bg-emerald-500 px-5 " activeClassName="bg-emerald-600">
                                    <item.icon  />
                                    <h1 className="text-white">{item.name}</h1>
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

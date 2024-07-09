import { NavLink } from "react-router-dom"
import sidebarData from "../../data/sidebarData"


const MenuFooter = () => {
    return (
        <div className='h-12 block md:hidden sm:h-16 w-full fixed bottom-0 left-0 bg-primary-light dark:bg-primary-dark border-t text-primary-dark dark:text-primary-light'>
            <div className="h-full flex justify-between items-center sm:mx-8 mx-2 text-xl sm:text-2xl">
            {
                sidebarData.map((item, index) => (
                    <NavLink to={item.url}>
                        <item.icon key={index} />
                    </NavLink>
                ))
            }
            </div>
        </div>
    )
}

export default MenuFooter

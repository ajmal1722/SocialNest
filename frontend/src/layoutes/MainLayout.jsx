import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from '../components/shared/Navbar';
import LeftSideBar from "../components/shared/SideBar";
import MenuFooter from "../components/shared/MenuFooter";

const MainLayout = () => {
  const  { userInfo }  = useSelector(state => state.auth)

  return (
    <>
      <Navbar />
      <div className="pt-16 sm:pt-20 grid grid-cols-10">
        <LeftSideBar />
        <Outlet context={{ userInfo }} />
      </div>
      <MenuFooter />
    </>
  );
};

export default MainLayout;

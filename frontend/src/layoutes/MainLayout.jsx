import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import Navbar from '../components/shared/Navbar';
import LeftSideBar from "../components/shared/SideBar";

const MainLayout = () => {
  const  { userInfo }  = useSelector(state => state.auth)
  console.log(userInfo);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-10">
        <LeftSideBar />
        <Outlet context={{ userInfo }} />
      </div>
    </>
  );
};

export default MainLayout;

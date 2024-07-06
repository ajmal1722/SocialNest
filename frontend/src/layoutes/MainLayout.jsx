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
      <LeftSideBar />
      <Outlet context={{ userInfo }} />
    </>
  );
};

export default MainLayout;

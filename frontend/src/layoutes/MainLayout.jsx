import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const  { userInfo }  = useSelector(state => state.auth)
  console.log(userInfo);

  return (
    <>
      <Navbar />
      <Outlet context={{ userInfo }} />
    </>
  );
};

export default MainLayout;

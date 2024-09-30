import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import Navbar from '../components/shared/Navbar';
import LeftSideBar from "../components/shared/SideBar";
import MenuFooter from "../components/shared/MenuFooter";

  const socket = io('http://localhost:8000')
const MainLayout = () => {
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    socket.emit('userConnected', userInfo?._id);

    // Clean up the connection when the component unmounts
    return () => {
      socket.off('chatMessage');
      socket.emit('userDisconnected', userInfo?._id);
    };
  }, [])
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

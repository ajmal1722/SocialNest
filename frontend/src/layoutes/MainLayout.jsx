import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useSocket } from "../utils/socket/socketContext";
import Navbar from '../components/shared/Navbar';
import LeftSideBar from "../components/shared/SideBar";
import MenuFooter from "../components/shared/MenuFooter";

const MainLayout = () => {
  const { userInfo } = useSelector(state => state.auth);
  const { socket } = useSocket()

  useEffect(() => {
    if (socket && userInfo?._id) {
      socket.emit('userConnected', userInfo._id);

      // Clean up when the component unmounts
      return () => {
        socket.emit('userDisconnected', userInfo._id);
        socket.off('chatMessage');
      };
    }
  }, [userInfo?._id, socket]);
  
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

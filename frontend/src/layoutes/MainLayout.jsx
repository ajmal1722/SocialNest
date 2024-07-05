import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const MainLayout = () => {
  const  { userInfo }  = useSelector(state => state.auth)
  console.log(userInfo);

  return (
    <div>
      Navbar
      <Outlet context={{ userInfo }} />
    </div>
  );
};

export default MainLayout;

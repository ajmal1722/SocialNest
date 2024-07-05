import { useOutletContext, Navigate } from "react-router-dom";

const HomePage = () => {


  return (
    <div>
      Home page
      <button className='bg-green-500 px-5 p-2'>
        Login
      </button>
    </div>
  );
};

export default HomePage;

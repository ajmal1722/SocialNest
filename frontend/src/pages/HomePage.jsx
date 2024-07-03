import { useOutletContext, Navigate } from "react-router-dom";

const HomePage = () => {
  const context = useOutletContext();


  return (
    <div>
      Home page
      <button onClick={context.loginUser} className='bg-green-500 px-5 p-2'>
        Login
      </button>
    </div>
  );
};

export default HomePage;

import Comments from "../components/posts/Comments";

const HomePage = () => {


  return (
    <div className="text-center md:col-span-8 col-span-10">
      Home page
      <div className="flex justify-center items-center w-full h-screen">
        <Comments />
      </div>
      
    </div>
  );
};

export default HomePage;

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col  w-[100vw] h-[100vh] justify-center gap-8 items-center">
        <div className="flex flex-col justify-center items-center gap-6">
            <img src="/icons/squadraLogo.png" alt="logo" className="w-auto h-auto object-contain rounded-lg" loading="lazy"/>
          
          <h2 className="text-[2rem] font-BebasNune text-white">
            Frontend Test Assignment
          </h2>
          <p className="text-[1.3rem] font-BebasNune text-white">
            Developed by: UTTAM M
          </p>
        </div>
        <div className="flex space-x-8">
        <Link to="/login"><button className="bg-white text-black cursor font-semibold py-2 px-12 rounded hover:bg-[#CB1517]">
            Login
          </button></Link>  
          <Link to="/signin"><button className="bg-white text-black cursor font-semibold py-2 px-10 rounded hover:bg-blue-600">
            Signup
          </button></Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;

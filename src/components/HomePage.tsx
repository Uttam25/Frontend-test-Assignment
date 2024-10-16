

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col  w-[100vw] h-[100vh] justify-center gap-8 items-center">
        <div className="flex flex-col justify-center items-center gap-6">
            <img src="/icons/squadraLogo.png" alt="logo" className="w-auto h-auto object-contain rounded-lg" loading="lazy"/>
          <h1 className="text-[2rem] font-BebasNune text-white">
            Squadra Media
          </h1>
          <h2 className="text-[2rem] font-BebasNune text-white">
            Frontend Test Assignment
          </h2>
          <p className="text-[2rem] font-BebasNune text-white">
            Developed by: UTTAM M
          </p>
        </div>
        <div className="space-x-8">
          <button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-[#CB1517]">
            Login
          </button>
          <button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-blue-600">
            Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;

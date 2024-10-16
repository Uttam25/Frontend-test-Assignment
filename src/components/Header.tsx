const Header = () => {
  return (
    <header className="flex h-[12%] bg-[#343434] w-full px-[6%] absolute top-0 left-0 z-50 flex-row gap-8 justify-between items-center">
      <a href="/" aria-label="Homepage">
        <img
          src="/icons/squadraLogo.png"
          alt="Squadra Logo"
          className="w-24 h-24 object-contain rounded-lg"
          loading="lazy"
        />
      </a>

      <a
        href="https://squadramedia.com/"
        aria-label="Company Info"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="text-[1.7rem] font-BebasNune font-bold text-white cursor-pointer">
          Company Info
        </p>
      </a>

      <a href="/UserDetails" aria-label="Registered Users">
        <p className="text-[1.7rem] font-BebasNune text-white cursor-pointer">
          Registered Users
        </p>
      </a>

      <a
        href="/login"
        aria-label="Logout"
        className="flex flex-row gap-2 justify-center items-center"
      >
        <img
          src="/icons/logout.svg"
          alt="Logout Icon"
          className="w-8 h-8 object-contain rounded-lg"
          loading="lazy"
        />
        <p className="text-[1.7rem] font-BebasNune text-white cursor-pointer">
          Logout
        </p>
      </a>
    </header>
  );
};

export default Header;

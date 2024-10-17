import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex h-[12%] bg-[#343434] w-[100vw] px-[6%] items-center absolute top-0 left-0 z-50 flex-row sm:gap-0 lg:gap-8 justify-between ">
      <Link to="/" aria-label="Homepage">
        <img
          src="/icons/squadraLogo.png"
          alt="Squadra Logo"
          className="w-24 h-24 object-contain rounded-lg"
          loading="lazy"
        />
      </Link>

      {/* Hamburger Icon for small screens */}
      <button
        onClick={toggleMenu}
        className="lg:hidden flex flex-col items-center justify-center space-y-1"
        aria-label="Toggle Menu"
        aria-expanded={isMenuOpen} // Accessibility improvement
      >
        <span
          className={`block w-8 h-1 bg-black transition-transform duration-300 ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-black transition-opacity duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-black transition-transform duration-300 ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Desktop navigation */}
      <nav className="hidden lg:flex flex-row justify-center items-center gap-20">
        <Link
          to="https://squadramedia.com/"
          aria-label="Company Info"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-[1.7rem] font-BebasNune font-bold text-white cursor-pointer">
            Company Info
          </p>
        </Link>

        <Link to="/userdetails" aria-label="Registered Users" onClick={toggleMenu}>
          <p className="text-[1.7rem] font-BebasNune text-white cursor-pointer">
            Registered Users
          </p>
        </Link>

        <Link
          to="/login"
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
        </Link>
      </nav>

      {/* Collapsible menu for small screens */}
      {isMenuOpen && (
        <nav className="absolute top-[100%] left-0 bg-[#343434] w-full flex flex-col items-center space-y-4 z-50 py-4 lg:hidden transition-all duration-300">
          <Link
            to="https://squadramedia.com/"
            aria-label="Company Info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.7rem] font-BebasNune text-white cursor-pointer"
            onClick={toggleMenu}
          >
            Company Info
          </Link>

          <Link
            to="/userdetails"
            aria-label="Registered Users"
            className="text-[1.7rem] font-BebasNune text-white cursor-pointer"
            onClick={toggleMenu}
          >
            Registered Users
          </Link>

          <Link
            to="/login"
            aria-label="Logout"
            className="flex flex-row gap-2 justify-center items-center"
            onClick={toggleMenu}
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
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;

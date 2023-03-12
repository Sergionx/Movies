import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../assets/icons/menu.svg";

import Logo from "../../assets/images/logo.png";

function LandingHeader() {
  let [open, setOpen] = useState(false);
  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-[99]">
      <header className="md:flex items-center justify-between bg-[#2c2727] py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-gray-800"
        >
          <img className="h-[5rem]" src={Logo} alt="logo" />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <img src={Menu} alt="logo" className="h-8 w-auto" />
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
          bg-[#2c2727] h-[5rem] flex items-center 
          md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-28 " : "top-[-20rem]"
          }`}
        >
          <Link
            className="mt-8 rounded-lg px-4 py-2 border-2 border-primary text-primary bg-white 
              hover:bg-[#2c2727] hover:text-white duration-300 font-[Poppins] md:ml-8 text-center
              active:scale-95 outline-none ring-offset-1 focus:ring-2 ring-primary "
            to="/users/login"
          >
            Iniciar sesión
          </Link>
          <Link
            className="mt-8 bg-terciary1 hover:bg-terciary2  drop-shadow-md
                rounded-lg py-2 px-6 text-center duration-300 font-[Poppins] ml-5 
                active:scale-95 outline-none ring-offset-1 hover:ring-2 focus:ring-2 ring-primary-strong"
            to="/users/register"
          >
            Registrarse
          </Link>
        </ul>
      </header>
    </nav>
  );
}

export default LandingHeader;

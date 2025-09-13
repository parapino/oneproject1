import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ dark, setDark }) {
  return (
    <header className={dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2  rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">{dark ? "Influesi.org" : "Influesi.org"}</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-indigo-500">HOME</Link>
          <Link to="/biz-haqimizda" className="mr-5 hover:text-indigo-500">ABOUT</Link>
          <Link to="/rasmlar" className="mr-5 hover:text-indigo-500">GALLERY</Link>
          <Link to="/boglanish" className="mr-5 hover:text-indigo-500">CONTACT</Link>
        </nav>
        <button
          onClick={() => setDark(!dark)}
          className="ml-4 px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
import React, { useState } from "react";
import logoLight from "../assets/img/yt_logo_rgb_light.png";
import logoDark from "../assets/img/yt_logo_rgb_dark.png";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function VideoList({ keyword, setAppKeyword }) {
  const { theme, toggleTheme } = useTheme();
  const [searchKeyword, setSearchKeyword] = useState("");

  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    setAppKeyword(searchKeyword);
    navigate(`/${searchKeyword}`);
  };

  const changeKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const changeSearchKeyword = (item) => {
    setSearchKeyword(() => item);
  }
  
  useEffect(() => {    
    changeSearchKeyword(keyword)
  }, [keyword]);

  return (
    <header className={`AppHeader ${theme}`}>
      <img
        src={theme === "dark" ? logoDark : logoLight}
        alt="logo"
        onClick={(e) => {
          setSearchKeyword(``);
          setAppKeyword(``);
          navigate(`/`);
        }}
      />
      <form onSubmit={submitForm}>
        <div className="flex">
          <input
            type="text"
            placeholder="검색"
            className={`pl-3 border h-9 w-60 rounded-l-2xl border-slate-300 focus:outline-none focus:border-sky-700`}
            value={searchKeyword}
            onChange={changeKeyword}
          />
          <button
            className="rounded-r-2xl h-9 -ml-1 w-14 border border-slate-300 bg-slate-100 "
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6 m-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>

      <button onClick={toggleTheme}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      </button>
    </header>
  );
}

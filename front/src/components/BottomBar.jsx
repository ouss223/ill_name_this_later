import react from "react";
import { useState, useEffect } from "react";
import heart_purple from "../assets/heart-purple.svg";
import heart_gray from "../assets/heart-gray.svg";
import home_purple from "../assets/home-purple.svg";
import home_gray from "../assets/home-gray.svg";
import search_purple from "../assets/search-purple.svg";
import search_gray from "../assets/search-gray.svg";
import bookmark_purple from "../assets/bookmark-purple.svg";
import bookmark_gray from "../assets/bookmark-gray.svg";
import { useNavigate } from "react-router-dom";

const BottomBar = ({ choice, setChoice }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 w-screen bg-black h-12  flex lg:justify-center lg:gap-52 justify-around items-center z-50 ">
      <img
        src={choice === 1 ? home_purple : home_gray}
        alt=""
        className="h-7 cursor-pointer hover:scale-125 duration-200 transition-all "
        onClick={() => {
          setChoice(1);
          navigate("/");
        }}
      />
      <img
        src={choice === 2 ? search_purple : search_gray}
        alt=""
        className="h-7 cursor-pointer hover:scale-125 duration-200 transition-all"
        onClick={() => {
          setChoice(2);
          navigate("/search");
        }}
      />
      <img
        src={choice === 3 ? bookmark_purple : bookmark_gray}
        alt=""
        className="h-6 cursor-pointer hover:scale-125 duration-200 transition-all"
        onClick={() => {
          setChoice(3);
          navigate("/watchlist");
        }}
      />
      <img
        src={choice === 4 ? heart_purple : heart_gray}
        alt=""
        className="h-7 cursor-pointer hover:scale-125 duration-200 transition-all"
        onClick={() => {
          setChoice(4);
          navigate("/favorites");
        }}
      />
    </div>
  );
};

export default BottomBar;

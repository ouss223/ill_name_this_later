import react from "react";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "../AvatarContext";
import logo from "../assets/logo_dark.png";
import { useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = ({ child, username, setAuth }) => {
  const navigate = useNavigate();
  const { avatarId, updateAvatarId } = useAvatar();
  const [appear, setAppear] = useState(false);
  console.log(username, "in navbar");
  console.log(avatarId);
  const urls = [
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/8-Employee-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/40-School_boy-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/5-Manager-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-07-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/12-Delivery_Man-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-13-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/30-Scientist-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/29-Software_Assistant-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-26-512.png",
  ];
  return (
    <div className="bg-black h-20 text-white flex flex-row  px-10 py-5 lg:pl-24 w-full justify-center ">
      <div className="flex flex-row justify-around  items-center w-5/6 gap-10  max-w-[1000px] ">
        <img
          src={logo}
          alt="logo"
          className="w-[150px] h-[50px] cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button className="alegreya-normal text-[22px] ">Movies</button>
        <button className="alegreya-normal text-[22px] ">Series</button>
        <button
          onClick={() => navigate("/blogposts")}
          className="alegreya-normal text-[22px]"
        >
          Blog
        </button>
        {child}
      </div>
      <div className="w-1/6 flex justify-end items-center space-x-4  ">
        <h1 className="alegreya-normal text-[22px] border-l border-dark-pink pl-3 text-white ">
          {username}
          {appear && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0, translateY: -10 }}
                animate={{ opacity: 1, height: "auto", translateY: 0 }}
                exit={{ opacity: 0, height: 0, translateY: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute bg-black z-50 mt-4 px-2 rounded-lg  mx-auto flex flex-col  text-[20px] "
              >
                <button
                  className="alegreya-normal border-b border-glowy-pink  p-2"
                  onClick={() => {
                    navigate("/watchlist");
                    setAppear(!appear);
                  }}
                >
                  Watchlist
                </button>
                <button
                  className="alegreya-normal border-b border-glowy-pink  p-2"
                  onClick={() => {
                    navigate("/favorites");
                    setAppear(!appear);
                  }}
                >
                  Favorites
                </button>
                <button
                  className="alegreya-normal border-b border-glowy-pink  p-2"
                  onClick={() => {
                    navigate("/settings");
                    setAppear(!appear);
                  }}
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    Cookies.remove("auth");
                    setAuth(null);
                  }}
                  className="alegreya-normal  p-2"
                >
                  Log out
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </h1>
        <img
          src={urls[avatarId]}
          className="w-[50px] h-[50px] rounded-full cursor-pointer relative "
          onClick={() => setAppear(!appear)}
        />
      </div>
    </div>
  );
};

export default NavBar;

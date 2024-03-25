import react from "react";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "../AvatarContext";

const NavBar = ({ child, type }) => {
  const navigate = useNavigate();
  const { avatarId, updateAvatarId } = useAvatar();
  console.log(avatarId);
  const urls= ["https://cdn2.iconfinder.com/data/icons/avatars-60/5985/8-Employee-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/40-School_boy-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/5-Manager-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-07-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/12-Delivery_Man-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-13-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/30-Scientist-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/29-Software_Assistant-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-26-512.png"]
  return (
    <div
      className={
        type === 1
          ? "bg-black h-20 text-white flex flex-row  px-10 py-5 lg:pl-24 w-full  "
          : "bg-black h-20 text-white flex flex-row  px-10 py-5 lg:pl-24 w-full justify-center  "
      }
    >
      <div
        className={
          type === 1
            ? "flex flex-row justify-around lg:justify-start lg:gap-32 items-center w-1/2  "
            : "flex flex-row justify-around lg:justify-start lg:gap-32 items-center w-5/6 gap-10  max-w-[850px] "
        }
      >
        <img
          // as logo for website give a logo place holder a random logo of a business from the web

          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEtPxay1pqdeu3gbd5sBCelZ800p8KG-ClQ&usqp=CAU"
          alt="logo"
          className="w-[150px] h-[50px] cursor-pointer"
          onClick={() => navigate("/")}
        />
        {child}
      </div>
      <div
        className={
          type === 1
            ? "w-1/2 flex justify-end items-center space-x-4"
            : "w-1/6 flex justify-end items-center space-x-4"
        }
      >
        <h1>Blog</h1>
        <img
          src={urls[avatarId]}
          className="w-[50px] h-[50px] rounded-full cursor-pointer"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

export default NavBar;

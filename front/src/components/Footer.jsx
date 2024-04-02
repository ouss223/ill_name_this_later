import React from "react";
import logo from "../assets/logo_dark.png";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="flex flex-col text-white max-w-[1300px] mx-auto mt-28">
      <div className="flex flex-row justify-between mx-10 pb-10  border-b border-glowy-pink ">
        <img src={logo} className="h-20" alt="logo" />
        <div >
          <h1 className="abel text-[18px] ">Address : <br />Tunis, Centre Urbain Nord 1082 <br /> Contact : <br /> +216 12 345 678</h1>
        </div>
      </div>
      <div className="abel text-[20px] flex flex-row justify-between mx-10 mt-10">
        <h1>
          All Rights Reserved .
        </h1>
        <div className="flex gap-10 mb-10">
          <h1 className=" cursor-pointer" onClick={()=>navigate("/contact-us")}>
            Contact US
          </h1>
          <h1>Cookies settings </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

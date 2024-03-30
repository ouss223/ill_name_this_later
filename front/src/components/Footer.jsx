import React from "react";
import logo from "../assets/logo_dark.png";

const Footer = () => {
  return (
    <footer className="flex flex-col text-white max-w-[1300px] mx-auto mt-28">
      <div className="flex flex-row justify-between mx-10 pb-10  border-b border-glowy-pink ">
        <img src={logo} className="h-20" alt="logo" />
        <div >
          <h1>Address : <br />lm7ajer tborba mannnouba <br /> Contact : <br /> +216 96 546 144</h1>
        </div>
      </div>
      <div className="flex flex-row justify-between mx-10 mt-10">
        <h1>
         All Rights Reserved .
        </h1>
        <div className="flex gap-10 mb-10">
            <h1>
            our Policy 
            </h1>
            <h1>Cookies settings </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

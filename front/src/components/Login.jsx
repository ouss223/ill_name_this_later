import React, { useState } from "react";
import logimg from "../assets/img/loginImage.jpg";
import logo from "../assets/img/HalfLogoBlack.png";
import "../index.css";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

function Login({setAuth,setRole}) {

    const navigate =useNavigate();

    return (
        <div className="bg-black h-full w-full flex md:flex-row ">
            <div className="lg:w-1/2 w-full relative mx-auto ">
                <div className=" mx-auto">
                    <a href="#" onClick={()=>navigate("/landing")}><img src={logo} alt="logo" className="block mx-auto mt-8" /></a>
                </div>
                <div className="text-center mb-20">
                    <h1 className="text-bold text-white text-xl uppercase"><big>L</big>og in and enjoy the latest <br /> blockbusters</h1>
                </div>
                <LoginForm  setAuth={setAuth} setRole={setRole}/>
            </div>
            <div className="md:w-1/2 hidden lg:block h-screen">
                <img src={logimg} alt="Log in image" className="object-cover w-full h-full" />
            </div>
        </div>

    );
}
export default Login;

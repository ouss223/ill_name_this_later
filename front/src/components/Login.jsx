import React, { useState } from "react";
import logimg from "../assets/img/loginImage.jpg";
import logo from "../assets/img/HalfLogoBlack.png";
import "../index.css";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function Login({ setAuth, setRole }) {

    const navigate = useNavigate();

    return (
        <motion.div className="bg-black h-screen w-full flex md:flex-row " initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <div className="lg:w-1/2 w-full  mx-auto ">
                <div className=" mx-auto">
                    <a href="#" onClick={() => navigate("/landing")}><img src={logo} alt="logo" className="block mx-auto mt-8" /></a>
                </div>
                <div className="text-center mb-20">
                    <h1 className="alegreya-normal text-white text-[35px] uppercase"><big>L</big>og in and enjoy the latest <br /> blockbusters</h1>
                </div>
                <LoginForm setAuth={setAuth} setRole={setRole} />
            </div>
            <div className="md:w-1/2 hidden lg:block h-full relative">
                <img src={logimg} alt="Log in image" className="h-screen w-full object-cover absolute" />
            </div>
        </motion.div>

    );
}
export default Login;

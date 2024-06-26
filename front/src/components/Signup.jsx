import React, { useState } from "react";
import logimg from "../assets/img/signupImage.png";
import logo from "../assets/img/HalfLogoBlack.png";
import "../index.css";
import SignupForm from "./SignupForm";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function Signup({ setAuth }) {

    const navigate = useNavigate();

    return (
        <motion.div className="bg-black h-screen w-full flex flex-col md:flex-row mt-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="lg:w-1/2 w-full relative mx-auto">
                <div className=" mx-auto">
                    <a href="#" onClick={() => navigate("/landing")}><img src={logo} alt="logo" className="block mx-auto mt-8" /></a>
                </div>
                <div className="text-center mb-20">
                    <h1 className="alegreya-normal text-white text-[35px] uppercase"><big>S</big>ign up to enjoy the latest <br /> blockbusters</h1>
                </div>
                <SignupForm setAuth={setAuth} />
            </div>
            <div className="md:w-1/2 hidden lg:block h-full relative">
                <img src={logimg} alt="sign up" className=" h-screen w-full object-cover absolute" />
            </div>
        </motion.div>
    );
}

export default Signup;

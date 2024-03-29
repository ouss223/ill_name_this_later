import React, { useState } from "react";
import logimg from "../assets/img/signupImage.png";
import logo from "../assets/img/HalfLogoBlack.png";
import "../index.css";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


function Signup() {



    return (
        <div className="bg-black h-full w-full flex flex-col md:flex-row mt-0">
            <div className="lg:w-1/2 relative mx-auto">
                <div className=" mx-auto">
                    <a href="landing"><img src={logo} alt="logo" className="block mx-auto mt-8" /></a>
                </div>
                <div className="text-center">
                    <h1 className="text-bold text-white text-xl uppercase"><big>S</big>ign up to enjoy the latest <br /> blockbusters</h1>
                </div>
                <SignupForm />
            </div>
            <div className="md:w-1/2 hidden lg:block h-screen">
                <img src={logimg} alt="sign up" className="object-cover w-full h-full" />
            </div>
        </div>
    );
}

export default Signup;

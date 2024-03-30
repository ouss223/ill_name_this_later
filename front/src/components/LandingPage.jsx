import React, { useRef } from "react";
import oppenheimer from "../assets/img/oppenheimer.jpeg";
import mediaPlayer from "../assets/img/mediaPlayer.png";
import logo from "../assets/img/logo.png";
import usr from "../assets/img/usr.png";
import logoBlack from "../assets/img/logoBlack.png";
import LandingVideo from "../assets/img/LandingVideo.mp4";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const Discover = useRef(null);
  const WatchNow = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white w-full p-0 m-0">
      <nav
        class="relative flex w-full flex-wrap items-center justify-between bg-gray-600 py-0 shadow-dark-mild  lg:py-2"
        data-twe-navbar-ref
      >
        <div class="flex w-full flex-wrap items-center justify-between px-3">
          <div>
            <a
              class="mx-2 mt-4 pl-[5em] flex items-center lg:mb-0 "
              href="#"
              onClick={() => navigate("/landing")}
            >
              <img
                class="me-2"
                src={logo}
                style={{ width: "200px" }}
                alt="RAKCHA logo"
              />
            </a>
          </div>
          <div
            class="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent4"
            data-twe-collapse-item
          >
            <ul
              class="list-style-none me-auto flex flex-col ps-0 pl-[40px] lg:mt-1 lg:flex-row"
              data-twe-navbar-nav-ref
            >
              <li
                class="mx-[20px] ps-2 lg:my-0 lg:pe-1 lg:ps-2"
                data-twe-nav-item-ref
              >
                <button
                  class="text-black transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  aria-current="page"
                  href="#"
                  data-twe-nav-link-ref
                  onClick={() => scrollToSection(Discover)}
                >
                  Discover
                </button>
              </li>
              <li
                class="mx-[20px] ps-2 lg:my-0 lg:pe-1 lg:ps-2"
                data-twe-nav-item-ref
              >
                <button
                  class="text-black transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  aria-current="page"
                  data-twe-nav-link-ref
                  onClick={() => scrollToSection(WatchNow)}
                >
                  Watch Now
                </button>
              </li>
              <li
                class="mx-[20px] ps-2 lg:my-0 lg:pe-1 lg:ps-2"
                data-twe-nav-item-ref
              >
                <a
                  class="text-black transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  aria-current="page"
                  href="#"
                  onClick={() => navigate("/contact-us")}
                  data-twe-nav-link-ref
                >
                  Contact
                </a>
              </li>
            </ul>

            <div class="flex items-center">
              <a
                href="#"
                onClick={() => navigate("/signup")}

                class="relative inline-block pl-8 pr-8 m-4 px-4 py-2 font-medium group"
              >
                <span class="absolute inset-0 w-full h-full bg-white border-1 border-indigo-950 group-hover:bg-indigo-950"></span>
                <span class="relative text-black group-hover:text-white px-2">
                  SIGN UP
                </span>
              </a>
              <a
                href="#"
                onClick={() => navigate("/login")}
                class="relative inline-block pl-8 pr-8 m-4 px-4 py-2 font-medium group"
              >
                <span class="absolute inset-0 w-full h-full bg-indigo-950 border-2 border-white group-hover:bg-black"></span>
                <span class="relative text-white group-hover:text-white px-2">
                  LOG IN
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="grid h-3/4 w-full place-items-center overflow-x-scroll  p-0 lg:overflow-visible text-">
        <figure className="relative w-full h-256">
          <img
            className="object-cover object-center w-full h-full "
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjBmYjhyaTJ4c2NhanVlcDAxZ3YwdDRmaXkwem5rZGV5bDJ5ZzJieCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JTDOXYOBSo26aPjlhN/giphy.gif"
            alt="coverImg"
          />
          
          <figcaption className="absolute bottom-0 left-2/4 flex w-full h-64 -translate-x-1/2 justify-between border-black-30 bg-black/30 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div className="flex w-full">
              <div className="w-3/5  container mx-auto flex flex-col font-medium text-[35px] pl-12 text-white">
                <h3 className="text-left mt-8 ">
                  <big>S</big>TREAM THE LATEST BLOCKBASTERS
                </h3>
                <h3 className="text-left p-0 m-0  mb-8">
                  <big>N</big>ow ON RAKCHA
                </h3>
              </div>
              <div className="w-2/5 ">
                <div class="container mx-auto flex flex-col text-[20px]  text-white ">
                  <h3 class="text-left mt-8 mb-8">
                    <big>E</big>xperience the best in movies, sign up or login
                    to start
                  </h3>
                  <div class="flex justify-left">
                    <a
                      href="#"
                      onClick={() => navigate("/login")}
                      class="relative inline-block pl-8 pr-8 m-4 px-4 py-2 font-medium group"
                    >
                      <span class="absolute inset-0 w-full h-full bg-indigo-950 border-2 border-white group-hover:bg-black"></span>
                      <span class="relative text-white group-hover:text-white px-2">
                        LOG IN
                      </span>
                    </a>
                    <a
                      href="#"
                      onClick={() => navigate("/signup")}
                      class="relative inline-block pl-8 pr-8 m-4 px-4 py-2 font-medium group"
                    >
                      <span class="absolute inset-0 w-full h-full bg-white border-1 border-indigo-950 group-hover:bg-indigo-950"></span>
                      <span class="relative text-black group-hover:text-white px-2">
                        SIGN UP
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
      <section ref={Discover}>
        <div className="flex w-full mt-20 pl-[5rem] pr-[5rem]">
          <div className="w-2/3 justify-left p-4">
            <div className="m-0 p-0">
              <img src={mediaPlayer} alt="media player" />
            </div>
            <h1 className="font-medium text-violet-950 text-[36px] mt-12 mb-12">
              <big>D</big>ISCOVER THE BEST OF THE ENTERTAINMENT WITH RAKCHA'S
              IMMENSE LIBARY
            </h1>
            <p className="text-[30px] mt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
              ea, facere sunt harum quasi nihil magni rerum! Qui, aliquid
              debitis animi iure, sit iusto nobis et totam atque deleniti
              ducimus.
            </p>
          </div>
          <div className="w-1/3 justify-right">
            <img
              className="object-cover object-center w-full h-full m-10"
              src={oppenheimer}
              alt="film1"
            />
          </div>
        </div>
      </section>
      <section ref={WatchNow}>
        <div className="flex w-full mt-20 mb-20 pl-[5rem] pr-[5rem]">
          <div className="w-2/3 justify-left p-4">
            <h1 className="font-medium text-violet-950 text-[32px] mt-12 mb-12">
              <big>S</big>TREAM ANYWHERE, ANYTIME
            </h1>
            <p className="text-[22px] mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
              voluptates modi hic error velit quibusdam, recusandae
              reprehenderit! Voluptatem animi aperiam magni quibusdam ratione,
              ab suscipit exercitationem impedit, modi similique deserunt?
            </p>
            <h1 className="font-medium text-violet-950 text-[30px] mt-12 mb-12">
              <big>P</big>ARENTAL CONTROL INCLUDED
            </h1>
            <p className="text-[22px] mt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui eius
              praesentium quis ullam, ab sit, iure suscipit numquam soluta
              aliquid animi consequuntur debitis iste eos quidem aut excepturi
              saepe obcaecati!
            </p>
            <h1 className="font-medium text-violet-950 text-[30px] mt-12 mb-12">
              <big>U</big>NINTERRUPTED STREAMING SERVICE
            </h1>
            <p className="text-[22px] mt-4">
              tempus, dui ex lacinia nunc, sit amet ultricies odio risus ac
              nunc. Nullam consectetur, nunc eget sit amet ultricies odio
            </p>
          </div>
          <div className="w-1/3 justify-right">
            <img
              className="object-cover object-center w-full h-full m-10"
              src={oppenheimer}
              alt="film2"
            />
            className="object-cover object-center w-full h-full m-10"
          </div>
        </div>
      </section>
      <figure className="relative w-full h-[550px]">
        <img
          className="object-cover object-center w-full h-full rounded-xl"
          src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/21/1464170390-avengers.jpg?resize=980:*"
          alt="film2"
        />
        <figcaption className="absolute bottom-0 left-2/4 flex w-full h-[550px] -translate-x-1/2 justify-between border-black-100 bg-black/60 py-4 px-6 shadow-sm shadow-black/100 saturate-100 ">
          <div className="container mx-auto flex flex-col font-medium text-[35px] pl-12 mt-20 text-white justify-left ">
            <h3 className="text-left text-[65px]">
              <big>S</big>TREAM THE LATEST MOVIES NOW
            </h3>
            <p
              className="text-left text-[25px] m-4"
              style={{
                color: "white",
                WebkitTextFillColor: "white",
                WebkitTextStroke: "1px black",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              in molestiae voluptates eum tempora facere,ea et ab vitae ipsum
              doloribus{" "}
            </p>
            <a
              href="#"
              onClick={() => navigate("/login")}

              className="select-none bg-white my-10 py-4 px-10 w-[180px] text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md transition-all hover:shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:bg-gray-200 focus:text-black focus:shadow-lg/80 active:opacity-75 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center justify-center"
            >
              <big>S</big>tart Now
            </a>
          </div>
        </figcaption>
      </figure>
      <div class="container mx-auto py-10 mb-10">
        <div className="flex justify-center my-8">
          <img src={logo} alt="logo" class="" />
        </div>
        <div className="flex justify-center my-8 text-[20px] text-bold">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            in molestiae voluptates eum
          </h1>
        </div>
        <div className="flex justify-center ">
          <div className="justify-center">
            <img src={usr} alt="user" className="w-[120px] mx-auto " />
            <div className="text-center">
              <h3 className=" m-0 text-[28px] font-semibold ">
                <big>R</big>OUAHI GHAITH
              </h3>
              <h3 className=" m-0 text-[25px] text-normal">
                <big>S</big>UPER FAN
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div class="container my-10 mx-auto">
        <div className="pl-8">
          <h1 className="font-bold text-[50px] uppercase">FAQ</h1>
          <h1 className="text-[25px] py-8 ">
            <a href="#" className="hover:underline">
              <big>F</big>ind Answers to some of your questions here..
            </a>
          </h1>
        </div>

        <hr class="border-2 border-purple-800 " />

        <div className="pl-8">
          <h1 className="font-normal text-[50px] uppercase">
            How to subscribe ?
          </h1>
          <h1 className="text-[25px] py-8">
            <a href="#" className="hover:underline">
              <big>F</big>ind Answers to some of your questions here..
            </a>
          </h1>
        </div>
        <hr class="border-2 border-purple-800 " />
        <div className="pl-8">
          <h1 className="font-normal text-[50px] uppercase">
            What content is available ?
          </h1>
          <h1 className="text-[25px] py-8 ">
            <a href="#" className="hover:underline">
              <big>F</big>ind Answers to some of your questions here..
            </a>
          </h1>
        </div>
        <hr class="border-2 border-purple-800 " />
        <div className="pl-8">
          <h1 className="font-normal text-[50px] uppercase">
            Is it supported by all devices ?
          </h1>
          <h1 className="text-[25px] py-8 ">
            <a href="#" className="hover:underline">
              <big>F</big>ind Answers to some of your questions here..
            </a>
          </h1>
        </div>
        <div className="pl-0">
          <h1 className=" text-[50px]  ">
            still have some questions ?
          </h1>
          <h1 className="text-[25px] py-8 abel">
            <big>C</big>ontact our support team for further assistance..
          </h1>
          <a
            href="#"
            onClick={() => navigate("/contact-us")}
            className="select-none bg-blue-950 w-[120px] h-[35px] text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:bg-black active:opacity-75 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center justify-center"
          >
            CONTACT US
          </a>
        </div>
      </div>
      <div class="w-full bg-black">
        <div className="w-full flex">
          <div className="flex-1 ">
            <img
              src={logoBlack}
              alt="logoImage"
              className="ml-10 mt-0 p-0 h-[300px]"
            />
          </div>
          <div class="flex-1 text-white m-auto px-8 text-[25px]">
            <h1 className="m-4">Adress:</h1>
            <p className="px-8">Centre urbain nord, TUNIS</p>
            <h1 className="m-4">Contact:</h1>
            <p className="px-8  "> +216 12 345 678 </p>
          </div>
          <div class="flex-1 text-white m-auto px-8 text-[25px]">
            <h1 className="m-4 hover:underline">
              <button href="#" onClick={()=>navigate("/login")}>LOGIN</button>
            </h1>
            <h1 className="m-4 hover:underline">
              <button href="#" onClick={()=>navigate("/signup")} >SIGN UP</button>
            </h1>
            <h1 className="m-4 hover:underline">
              <button href="">Browse Libaries</button>
            </h1>
          </div>
        </div>
        <hr className="border-2 text-white mx-20" />
        <div className="text-white flex p-8">
          <h1 className="flex-1 pl-10 uppercase">® All rights are reserved</h1>
          <div className="flex-1 flex">
            <a href="#" className="hover:underline flex-1">
              Our Policy
            </a>
            <a href="#" className="hover:underline flex-1">
              Cookies settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

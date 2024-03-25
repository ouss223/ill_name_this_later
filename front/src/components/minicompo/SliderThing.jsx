import react from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
const SliderThing = ({ shows }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(5, shows.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1350, 
        settings: {
          slidesToShow: Math.min(4, shows.length),
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, shows.length),
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, shows.length),
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1, shows.length),
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const cond =
  (screenWidth < 768 && shows.length < 2) ||
  (768 <= screenWidth && screenWidth < 1024 && shows.length < 3) ||
  (1024 <= screenWidth && screenWidth < 1350 && shows.length < 4) ||
  (1350 <= screenWidth && screenWidth < 1600 && shows.length < 5) || (1600 <= screenWidth && shows.length < 6)
  ;


  return (
    <div className={!cond ?
    "flex flex-col":"flex flex-row gap-20"}>
  {!cond ? (
          <Slider {...sliderSettings}>
            {shows.map((show, index) => (
              <div key={index+show.imdbID} className="flex flex-col  cursor-pointer" 
              onClick={()=>
                {
                  navigate(`/watch/${show.Type}/${show.imdbID}`)
                }}>
                <img
                  src={show.Poster}
                  alt="show"
                  className="w-[200px] h-[300px] rounded-md"
                />
                <h1 className="text-white text-start w-[200px] text-lg font-bold ">
                  {show.Title}
                </h1>
              </div>
            ))}
          </Slider>
        )
        :(
            shows.map((show, index) => (
                <div key={show.Title} className="flex flex-col cursor-pointer  " onClick={()=>
                {
                  navigate(`/watch/${show.Type}/${show.imdbID}`)
                }}>
                <img
                    src={show.Poster}
                    alt="show"
                    className="w-[200px] h-[300px] rounded-md"
                />
                <h1 className="text-white text-start w-[200px] text-lg font-bold ">
                    {show.Title}
                </h1>
                </div>
            ))

        )
    }

    
    </div>
  );
};

export default SliderThing;

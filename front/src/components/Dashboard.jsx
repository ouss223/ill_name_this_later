import React, { useEffect, useState } from "react";
import Slider from "./minicompo/SliderThing.jsx";
import Stars from "./Stars";
import NavBar from "./NavBar";
const Dashboard = () => {
  const testing_array = [
    "breaking bad",
    "game of thrones",
    "the wire",
    "the sopranos",
    "the office",
    "the mandalorian",
  ];

  const [results, setResults] = useState("");
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=4a8e82cc&t=got`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      });
  }, []);
  const [shows, setShows] = useState([]);
  useEffect(() => {
    async function getPosters(show_name) {
      fetch(`http://www.omdbapi.com/?apikey=4a8e82cc&t=${show_name}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setShows((prev) => {
            return [...prev, data];
          });
        });
    }
    for (let i = 0; i < testing_array.length; i++) {
      getPosters(testing_array[i]);
    }
  }, []);

 
  const content = (
    <div className="flex gap-10">
      <h1>Movies</h1>
      <h1>Series</h1>
    </div>
  );

  return (
    <div>
    <NavBar child={content} type={1}/>
    <div className="bg-black h-full text-white lg:pl-24 pl-10 pb-12">
      <div className="flex">
        <div className="w-1/2  ">
          <div className="flex space-x-4 pt-10">
            <h1>{results.Type}</h1>
            <Stars rating={results.imdbRating / 2} />
          </div>
          <h1 className=" font-extrabold text-4xl">{results.Title}</h1>
          <div className="flex space-x-4 text-gray-400 mb-10">
            <h3>{results.Genre}</h3>
            <h3>{results.Year}</h3>
          </div>
          <h1>{results.Plot}</h1>
          <div className="space-x-10 mt-8">
            <button className="bg-purple-500 rounded-lg p-2 font-bold">
              Play Now
            </button>
            <button>Save for later</button>
          </div>
        </div>
        <div className="lg:w-[200px] w-0"></div>
        <div
          className="max-w-[300px] flex h-[450px] bg-cover bg-center bg-no-repeat justify-center items-center"
          style={{
            width: "300px",
            height: "450px",
            backgroundImage: `url(${results.Poster})`,
            boxShadow: "0 0px 30px 25px black inset",
          }}
        ></div>
      </div>
      <div className="mt-10 flex flex-col w-11/12  justify-center  ">
        <h1 className="text-purple-500 font-bold text-xl mb-5">Recommended</h1>
        <Slider shows={shows} />
      </div>
      <div className="mt-10 flex flex-col w-11/12  justify-center  ">
        <h1 className="text-purple-500 font-bold text-xl mb-5">Recommended</h1>
        <Slider shows={shows} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

import react from "react";
import { useState, useEffect } from "react";
import Genre from "./minicompo/Genre.jsx";
import NavBar from "./NavBar";

const Lists = ({list_type,auth}) => {
  const content = (
    <div className="flex  ">
      <h1 className="invisible">movies</h1>
      <h1 className="invisible">series</h1>
    </div>
  );
  const [favorites, setFavorites] = useState([]); 
  const [watchlist,setWatchlist] = useState([]);
  const [shows, setShows] = useState([]);
  const [showByGenre, setShowsByGenre] = useState([]);
  function organizeShowsByGenre(shows) {
    const showByGenra = {};
    for (const show of shows) {
      let genre = show.Genre.split(" ")[0];
      if (genre.slice(-1) === ",") {
        genre = genre.slice(0, -1);
      }
      if (!showByGenra[genre]) {
        showByGenra[genre] = [];
      }
      showByGenra[genre].push(show);
    }
    console.log(showByGenra,"shows by genre");
    return showByGenra;
  }
  useEffect(() => {
    setShows([]);
    setShowsByGenre([]);
    setFavorites([]);
      if(list_type==="Watch Later")return;
    async function getfavorites() {   
      if(!auth)
    {
      return;
    }
      try {
        const response = await fetch('http://localhost:8000/api/getfavorites.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization":auth,
          },
         
        });
        if (!response.ok) {
          console.log('error');
        }
        const data = await response.json();
        console.log(data);
        setFavorites(data);
      }
      catch (error) {
        console.log('problem occured in getFavorites fetching');
      }
    }
    getfavorites();
  }
  , [list_type]);
  useEffect(() => {
    setShows([]);
    setShowsByGenre([]);
    setWatchlist([]);
    if(list_type==="Favorites")return;
    async function getWatchlist() {   
      if(!auth)
    {
      return;
    }
      try {
        const response = await fetch('http://localhost:8000/api/getwatchlist.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization":auth,
          },
         
        });
        if (!response.ok) {
          console.log('error');
        }
        const data = await response.json();
        console.log(data);
        setWatchlist(data);
      }
      catch (error) {
        console.log('problem occured in getWatchlist fetching');
      }
    }
    getWatchlist();
  }
  , [list_type]);
  useEffect(() => {
    setShows([]);
    setShowsByGenre([]);
    
    async function getShows(show_name) {
      try{
      await fetch(`http://www.omdbapi.com/?apikey=4a8e82cc&i=${show_name}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setShows((prev) => { 
            return [...prev, data];
          });
        });}
        catch(e)
        {
          console.log(e);
        }
    }
    if(list_type==="Favorites" && favorites)
    {
      for (let i = 0; i < favorites.length; i++) {
        getShows(favorites[i]);
      }
    }
    else if(list_type==="Watch Later" && watchlist)
    {
      for (let i = 0; i < watchlist.length; i++) {
        getShows(watchlist[i]);
      }
    }
    
  }, [list_type,favorites,watchlist]);
  useEffect(() => {
    setShowsByGenre((prev) => organizeShowsByGenre(shows));
  }, [shows,list_type]);
  // ! important note : 
  // watch later shows must be categorized , if show has no typr then put it in others , if theres no shows at all then show some fancy picture or smthg
  return (
    <div >
      <NavBar child={content} type={1} />
      <div className="bg-black h-full text-white lg:pl-24 pl-10 pb-12 ">
        <div className="flex flex-col pt-14">
          <h1 className=" text-4xl mb-5 font-extrabold ">{list_type}</h1>
          {Object.keys(showByGenre).map((genre) => (
            <Genre key={genre} genre={genre} shows={showByGenre[genre]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lists;

import react from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const SearchResultsBody = ({ page,query }) => {
    console.log(query);
    const [shows, setShows] = useState([]);
    const navigate = useNavigate();
    const adultContent = ["TV-MA", "R"];
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function getShows(show_name) {
        try {
          setLoading(true);
          setShows([]);
          if (query === "" || query.length < 4) return;
    
          const response = await fetch(`http://www.omdbapi.com/?apikey=4a8e82cc&s=${show_name}&page=${page}`);
          const data = await response.json();
          console.log(data);
    
          if (!data || !data.Search) return;
    
          const filteredShows = data.Search;
    
          const cleanShows = filteredShows.filter(show => show !== undefined);
    
          setShows(cleanShows);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
    
      async function checkShow(show) {
        try {
          const response = await fetch(`http://www.omdbapi.com/?apikey=4a8e82cc&i=${show.imdbID}`);
          const data = await response.json();
          if (adultContent.includes(data.Rated)) {
            return false;
          }
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    
      getShows(query);
    }, [query, page]);
    
    return (
        <div className="flex flex-wrap gap-10 lg:px-24 px-10  pb-12 z-20">
        {shows && !loading ?shows.map((show, index) => (
            <div key={index} className="  flex flex-col space-x-2  w-[150px] cursor-pointer "
            onClick={()=>
            {
                navigate(`/watch/${show.Type}/${show.imdbID}`)
            }}
            >
                <img src={show.Poster} className="h-[225px] w-[150px]" alt={show.Title} />
                <div className="flex flex-col ">
                    <h1 className="text-[15px] text-white">{show.Title}</h1>
                    <p className="text-[15px] text-gray-500">{show.Year}</p>
                </div>
            </div>
        )):
        Array.from({length: 10}, (_, i) => (
            <div key={i} className="flex flex-col space-x-2  w-[150px] cursor-pointer ">
                <div className="h-[280px] w-[150px] bg-gray-900 animate-pulse"></div>
                
            </div>
        ))
        }
    </div>
    
    );
    };
export default  SearchResultsBody;
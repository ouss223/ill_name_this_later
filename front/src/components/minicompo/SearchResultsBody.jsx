import react from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sad from "../../assets/sad.svg";
const SearchResultsBody = () => {
 
  const { query, totalSearches,page } = useParams();
  const placeholder="https://www.afridocs.net/wp-content/uploads/2017/07/500x735blank.png";
  console.log(query);
  console.log(page);
  console.log(totalSearches);
  const [shows, setShows] = useState(null);
  const navigate = useNavigate();
  const adultContent = ["TV-MA", "R"];
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function getShows(show_name) {
      try {
        setLoading(true);
        setShows([]);
        if (query === "" || query.length < 4) return;

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=4a8e82cc&s=${show_name}&page=${pageNumber}`
        );
        const data = await response.json();
        console.log(data);

        if (!data || !data.Search){
          setLoading(false);
          setShows(null);
          return;

        } 

        const filteredShows = data.Search;

        const cleanShows = filteredShows.filter((show) => show !== undefined);

        setShows(cleanShows);
        setLoading(false);
      } catch (e) {
        setLoading(false); 
        console.log(e);
      }
    }

    async function checkShow(show) {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=4a8e82cc&i=${show.imdbID}`
        );
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
  }, [query, pageNumber]);

  return (
    <div className="alegreya-normal flex flex-col mb-20">
      <div className="flex flex-wrap gap-10 lg:px-24 px-10 pb-12">
        {
          (!shows || shows.length === 0 )&& !loading ? (
            <div className=" mx-auto">
            <h1 className="text-white mb-[100px] text-6xl alegreya-bold">No results found</h1>
            <img src={sad}  alt="" />
            </div>
          ) : null
        }
        {shows && !loading ? (
  shows.map((show, index) => (
    <div
      key={index}
      className="flex flex-col space-x-2 w-[150px] cursor-pointer"
      onClick={() => {
        navigate(`/watch/${show.Type}/${show.imdbID}`);
      }}
    >
      <img
        src={show.Poster}
        className="h-[225px] w-[150px]"
        alt={show.Title}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = placeholder; // Path to your placeholder image
        }}
      />
      <div className="flex flex-col">
        <h1 className="text-[20px] abel text-white">{show.Title}</h1>
        <p className="text-[17px] text-gray-500">{show.Year}</p>
      </div>
    </div>
  ))
) : (
  loading && (
    Array.from({ length: 10 }, (_, i) => (
      <div
        key={i}
        className="flex flex-col space-x-2 w-[150px] cursor-pointer"
      >
        <div className="h-[280px] w-[150px] bg-gray-900 animate-pulse"></div>
      </div>
    ))
  )
)}

      </div>
      <div className="w-full flex justify-center items-center gap-2 text-white">
        {Array.from({ length: Math.min(Math.ceil(totalSearches / 10), 5) }, (_, i) => (
          <button
            key={i}
            className="rounded-md w-[40px] h-[30px] bg-gray-900 text-xl"
            onClick={(e) => setPageNumber(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
  
};
export default SearchResultsBody;

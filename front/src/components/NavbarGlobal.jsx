import react, { useRef } from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Searching from "../assets/search-gray.svg";
import SearchBarShow from "./minicompo/SearchBarShow";
import { useNavigate } from "react-router-dom";
//important notice : bear in mind to replace "not found pictures" with a default image
//add a functiion to check if show is animation if so redirect to a page saying that we don't have animations yet ;
const Search = ({ username, setAuth }) => {
  const [query, setQuery] = useState(["", ""]);
  const [shows, setShows] = useState([]);
  const searchRef = useRef(null);
  const [totalSearches, setTotalSearches] = useState([0, 0]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getPosters(show_name) {
      try {
        setShows([]);
        if (
          query[0] === "" ||
          searchRef.current.value === "" ||
          query[0].length < 4
        ){
          return;
        }
          
        const trimmed = show_name.trim();
        fetch(
          `http://www.omdbapi.com/?apikey=4a8e82cc&s=${trimmed}&page=1`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (!data || !data.Search) return;

            setTotalSearches((prev) => [data.totalResults, prev[1]]);
            setShows((prev) => data.Search);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getPosters(query[0]);
  }, [query[0]]);

  const content = (
    <div className="w-full flex items-center border-dark-pink border-b gap-2 border-white px-3 py-1 text-gray-200 text-[19px] relative ">
      <img src={Searching} className="h-6" />
      <input
        style={{ outline: "none" }}
        type="text"
        ref={searchRef}
        className="w-full text-glowy-pink   bg-black placeholder-pink-800 "
        placeholder="Search"
        onChange={(e) => {
          setQuery((prev) => [e.target.value, prev[1]]);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setShows(null);
            setTotalSearches((prev) => [prev[0], prev[0]]);
            navigate(`/search/${e.target.value.trim()}/${totalSearches[0]}/1`);
            e.target.value = "";
            e.preventDefault();
          }
        }}
      />
      {shows && shows.length > 0 && searchRef.current.value.length>3 &&
            query[0] !== "" && (
        <div className="absolute space-y-2 top-[40px] bg-gray-900 p-4 rounded-xl w-full  max-w-[650px] right-[1px]">
          { 
            shows
              .slice(0, shows.length > 4 ? 4 : shows.length)
              .map((show, index) => {
                return (
                  <SearchBarShow
                    show={show}
                    key={show.Title + index}
                    margin={index * 100}
                    setQuery={setQuery}
                    searchRef={searchRef}
                  />
                );
              })}
        </div>
      )}
    </div>
  );
  return (
    <div className="text-white mb-20  ">
      <NavBar child={content} type={2} username={username} setAuth={setAuth} />
    </div>
  );
};

export default Search;

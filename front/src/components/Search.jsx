import react, { useRef } from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Searching from "../assets/search-gray.svg";
import SearchBarShow from "./minicompo/SearchBarShow";
import { useNavigate } from "react-router-dom";
import SearchResultsBody from "./minicompo/SearchResultsBody.jsx";
//important notice : bear in mind to replace "not found pictures" with a default image
//add a functiion to check if show is animation if so redirect to a page saying that we don't have animations yet ;
const Search = () => {
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState(["",""]);
  const [shows, setShows] = useState([]);
  const searchRef = useRef(null);
  const [fullShows, setFullShows] = useState([]);
  const [updates, setUpdates] = useState(false);
  const [totalSearches, setTotalSearches] = useState([0,0]);
  const [pageNumber, setPageNumber] = useState(1);
  const margin = 200;

  useEffect(() => {
    async function getPosters(show_name) {
      try {
        setShows([]);
        if (query[0] === "" || searchRef.current.value === "" || query[0].length < 4)
          return;

        fetch(`http://www.omdbapi.com/?apikey=4a8e82cc&s=${show_name}&page=1`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (!data || !data.Search) return;

            setTotalSearches((prev) => [data.totalResults,prev[1]]);
            setShows((prev) => data.Search);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getPosters(query[0]);
  }, [query[0]]);
  useEffect(() => {
    if (updates) {
      setFullShows(shows);
      setUpdates(false);
    }
  }, [updates, shows]);
  const content = (
    <div className="w-full flex items-center rounded-2xl border gap-2 border-white px-3 py-1 text-gray-200 text-[19px] relative ">
      <img src={Searching} className="h-6" />
      <input
        style={{ outline: "none" }}
        type="text"
        ref={searchRef}
        className="w-full   bg-black "
        placeholder="Search"
        onChange={(e) => {
          setQuery((prev)=>[e.target.value,prev[1]]);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setQuery((prev)=>[prev[0],prev[0]]);
            setSearched((prev) => true);
            setUpdates((prev) => true);
            setTotalSearches((prev) => [prev[0],prev[0]]);
            e.target.value = "";
            e.preventDefault();
            setShows([]);
          }
        }}
      />
      {shows && shows.length > 0 && (
        <div className="absolute space-y-2 top-[40px] bg-gray-900 p-4 rounded-xl w-full  max-w-[650px] right-[1px]">
          {shows && shows.length > 0
            ? shows
                .slice(0, shows.length > 4 ? 4 : shows.length)
                .map((show, index) => {
                  return (
                    <SearchBarShow
                      show={show}
                      key={show.Title + index}
                      margin={index * 100}
                    />
                  );
                })
            : null}
        </div>
      )}
    </div>
  );
  return (
    <div className="text-white mb-20">
      <NavBar child={content} type={2} />
      {!searched ? (
        <h1>testi</h1>
      ) : (
        <div>
          <SearchResultsBody query={query[1]} page={pageNumber} />
        </div>
      )}
      <div className="w-full flex justify-center items-center gap-2">
        {Array.from(
          { length: Math.min(Math.ceil(totalSearches[1] / 10), 5) },
          (_, i) => (
            <button
              key={i}
              className="rounded-md w-[40px] h-[30px] bg-gray-900 text-xl "
              onClick={(e) => setPageNumber(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Search;

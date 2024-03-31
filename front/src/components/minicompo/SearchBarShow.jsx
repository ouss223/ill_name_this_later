import react from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SearchBarShow = ({ show,margin,setQuery,searchRef }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row space-x-2 cursor-pointer  "
    onClick={()=>
    {

        navigate(`/watch/${show.Type}/${show.imdbID}`);
        setQuery(["", ""]);
        searchRef.current.value = "";
    }
    }
    >
      <img src={show.Poster} className="h[50px] w-[50px]" />
      <div className="flex flex-col">
        <h1 className="text-[20px] text-white">{show.Title}</h1>
        <p className="text-[15px] text-gray-500">{show.Year}</p>
      </div>
    </div>
  );
};

export default SearchBarShow;

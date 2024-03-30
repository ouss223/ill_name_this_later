import react from "react";
import down from "../assets/down.svg";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Comments from "./minicompo/Comments.jsx";
const WatchingPage = ({ auth }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { id, type } = useParams();
  const vidSrc_serie = "https://vidsrc.to/embed/tv/";
  const vidSrc_movie = "https://vidsrc.to/embed/movie/";
  const [info, setInfo] = useState();
  const [currentSeason, setCurrentSeason] = useState();
  const [picked, setPicked] = useState([1, 1]);
  const [lists, setlists] = useState([false, false]);
  const watchLaterRef = useRef(null);
  const favoritesRef = useRef(null);
  const [adder, setAdder] = useState([false, false]);
  const [remover, setRemover] = useState([false, false]);

  useEffect(() => {
    async function checking() {
      setAdder([false, false]);
      setRemover([false, false]);

      try {
        await fetch("http://localhost:8000/api/inWatchlistOrFavorite.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({ show_name: id }),
        })
          .then((response) => response.json())
          .then((data) => {
            setlists([data.in_watchlist, data.in_favorites]);
          });
      } catch (e) {
        console.log(e);
      }
    }
    checking();
  }, [id]);

  useEffect(() => {
    async function getInfo() {
      setInfo(null);
      try {
        fetch(`http://www.omdbapi.com/?apikey=4a8e82cc&i=${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setInfo(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getInfo();
  }, [id]);
  useEffect(() => {
    async function getSeason() {
      if (type === "movie") return;
      try {
        fetch(
          `http://www.omdbapi.com/?apikey=4a8e82cc&i=${id}&Season=${picked[0]}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCurrentSeason(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getSeason();
  }, [info, picked]);
  useEffect(() => {
    async function addWatchLater() {
      try {
        await fetch("http://localhost:8000/api/addwatchlist.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({ show_name: id }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    async function addFavorites() {
      try {
        await fetch("http://localhost:8000/api/addFavorite.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({ show_name: id }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (adder[0]) {
      addWatchLater();
      setAdder([false, adder[1]]);
    }
    if (adder[1]) {
      addFavorites();
      setAdder([adder[0], false]);
    }
  }, [adder]);
  useEffect(() => {
    async function removeWatchlist() {
      try {
        await fetch("http://localhost:8000/api/removewatchlist.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({ show_name: id }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    async function removeFavorites() {
      try {
        await fetch("http://localhost:8000/api/removeFavorire.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({ show_name: id }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (remover[0]) {
      removeWatchlist();
      setRemover([false, remover[1]]);
      setlists([false, lists[1]]);
    }
    if (remover[1]) {
      removeFavorites();
      setRemover([remover[0], false]);
      setlists([lists[0], false]);
    }
  }, [remover]);

  return (
    <div className="mb-20  ">
      {info && (
        <h1 className="text-white  ml-10 mb-10 text-4xl text-glowy-pink font-semibold">
          {info.Title}
        </h1>
      )}
      <div className="flex flex-row mb-32 px-10 gap-5 ">
        <div className="w-4/6  flex flex-col justify-center items-center gap-4 ">
          <iframe
            sandbox="allow-same-origin allow-scripts"
            className="border-2 rounded-lg border-gray-800 w-full h-[500px]"
            src={
              type === "series"
                ? `${vidSrc_serie}${id}/${picked[0]}/${picked[1]}`
                : `${vidSrc_movie}${id}`
            }
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="flex gap-2 text-gray-200 text-[14px]">
            <div
              className="bg-gray-700 rounded-lg py-1 px-2 cursor-pointer"
              onClick={() => {
                if (lists[0]) {
                  setRemover((prev) => [true, prev[1]]);
                } else {
                  setAdder((prev) => [true, prev[1]]);
                }
                setlists((prev) => [!prev[0], lists[1]]);
              }}
            >
              Add Watch Later
              <Checkbox
                checked={lists[0]}
                ref={watchLaterRef}
                id="watchLater"
                {...label}
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon />}
              />
            </div>
            <div
              className="bg-gray-700 rounded-lg py-1 px-2 cursor-pointer"
              onClick={() => {
                if (lists[1]) {
                  setRemover((prev) => [prev[1], true]);
                } else {
                  setAdder((prev) => [prev[1], true]);
                }
                setlists((prev) => [prev[0], !lists[1]]);
              }}
            >
              Add Favorites
              <Checkbox
                checked={lists[1]}
                ref={favoritesRef}
                id="favorites"
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            </div>
          </div>
        </div>
        {type === "series" && (
          <div className="flex flex-col w-2/6 h-[500px] max-w-[700px] mx-auto bg-glowy-pink text-white">
            <div className="bg-purple-900 flex flex-row justify-center items-center">
              <select
                style={{ appearance: "none", outline: "none" }}
                className="p-2 bg-purple-900 text-white rounded-md cursor-pointer"
                name=""
                id=""
                onChange={(e) => {
                  const selectedSeason = parseInt(e.target.value);
                  setPicked((prev) => [selectedSeason, prev[1]]);
                }}
              >
                {info &&
                  info.totalSeasons &&
                  Array.from({ length: info.totalSeasons }, (_, index) => (
                    <option key={index} value={index + 1}>
                      Season {index + 1}
                    </option>
                  ))}
              </select>
              <img src={down} alt="down" className="h-3" />
            </div>

            <div className="overflow-y-auto font-semibold text-[17px]">
              {currentSeason &&
                currentSeason.Episodes.map((episode, index) => (
                  <div key={index} className="flex justify-between px-5 py-3">
                    <h1
                      className="cursor-pointer "
                      onClick={() => setPicked((prev) => [prev[0], index + 1])}
                    >
                      Episode {index + 1} : {episode.Title}
                    </h1>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Comments auth={auth} id={id} season={picked[0]} episode={picked[1]} />
    </div>
  );
};

export default WatchingPage;

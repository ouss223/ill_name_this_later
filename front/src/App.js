import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import NavBar from "./components/NavBar.jsx";
import { useState, useEffect } from "react";
import BottomBar from "./components/BottomBar.jsx";
import Search from "./components/Search.jsx";
import Login from "./components/Login.jsx"; 
import Lists from "./components/Lists.jsx";
import WatchingPage from "./components/WatchingPage.jsx";
import Profile from "./components/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  useAvatar } from './AvatarContext';

// Wrap your routes inside the Router component
//handle the wait for stuff to load
// tmdb api key = 43483510b31c8c74dd522ed9c8b18a28
//omdb api key = 4a8e82cc
function App() {
  const { avatarId, updateAvatarId } = useAvatar();
  const auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MTQ3NDEzNDZ9.dps5X4YCYaCDD7Fnszkcy0h3R_sS4g82k6eV1l4_i64";
  const [choice,setChoice]=useState(1);
  useEffect(() => {
    async function getUserInfos() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/getUserInfos.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
          }
        );
        const data = await response.json();
        updateAvatarId(data.avatar);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfos();
  }, [auth]);


    

  return (
    <div >
    <Router>
    <BottomBar choice={choice} setChoice={setChoice}/>

      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/search" element={<Search  />} />
        <Route exact path="/watchlist" element={<Lists list_type={"Watch Later"} auth={auth} />} />
        <Route exact path="/favorites" element={<Lists list_type={"Favorites"} auth={auth} />} />
        <Route exact path="/watch/:type/:id" element={<WatchingPage auth={auth} />} />
        <Route exact path="/profile" element={<Profile auth={auth} />} />
      </Routes>
      
    </Router>
    </div>
  );
}

export default App;

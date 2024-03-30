import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import { useState, useEffect } from "react";
import BottomBar from "./components/BottomBar.jsx";
import Lists from "./components/Lists.jsx";
import WatchingPage from "./components/WatchingPage.jsx";
import Profile from "./components/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  useAvatar } from './AvatarContext';
import SearchResultsBody from "./components/minicompo/SearchResultsBody.jsx";
import NavbarGlobal from "./components/NavbarGlobal.jsx";
import Footer from "./components/Footer.jsx";
import PostBlogPost from "./components/PostBlogPost.jsx";
import BlogPosts from "./components/BlogPosts.jsx";
// Wrap your routes inside the Router component
//handle the wait for stuff to load
// tmdb api key = 43483510b31c8c74dd522ed9c8b18a28
//omdb api key = 4a8e82cc
function App() {
  const { avatarId, updateAvatarId } = useAvatar();
  const auth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MTQ3NDEzNDZ9.dps5X4YCYaCDD7Fnszkcy0h3R_sS4g82k6eV1l4_i64";
  const [choice,setChoice]=useState(1);
  const[name,setName]=useState("");
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
        setName(data.username);
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
    <NavbarGlobal username={name} />
    
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/watchlist" element={<Lists list_type={"Watch Later"} auth={auth} />} />
        <Route exact path="/favorites" element={<Lists list_type={"Favorites"} auth={auth} />} />
        <Route exact path="/watch/:type/:id" element={<WatchingPage auth={auth} />} />
        <Route exact path="/settings" element={<Profile auth={auth} />} />
        <Route exact path="/search/:query/:totalSearches/:page" element={<SearchResultsBody />} />
        <Route exact path="/postblogpost" element={<PostBlogPost auth={auth} />} />
        <Route exact path="/blogposts" element={<BlogPosts auth={auth} />} />



      </Routes>
      <Footer />
      
    </Router>
    </div>
  );
}

export default App;

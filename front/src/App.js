import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import { useState, useEffect } from "react";
import BottomBar from "./components/BottomBar.jsx";
import Lists from "./components/Lists.jsx";
import WatchingPage from "./components/WatchingPage.jsx";
import Profile from "./components/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAvatar } from "./AvatarContext";
import SearchResultsBody from "./components/minicompo/SearchResultsBody.jsx";
import NavbarGlobal from "./components/NavbarGlobal.jsx";
import Footer from "./components/Footer.jsx";
import PostBlogPost from "./components/PostBlogPost.jsx";
import BlogPosts from "./components/BlogPosts.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Contact from "./components/Contact.jsx";
import Message from "./components/Message.jsx";
import AdminTools from "./components/minicompo/AdminTools.jsx";
import Cookies from "js-cookie";
import { motion } from "framer-motion"; // Import motion from Framer Motion

// Wrap your routes inside the Router component
//handle the wait for stuff to load
// tmdb api key = 43483510b31c8c74dd522ed9c8b18a28
//omdb api key = 4a8e82cc



function App() {
  const { avatarId, updateAvatarId } = useAvatar();
  const [auth, setAuth] = useState("");
  const [name, setName] = useState("nah");
  const [role, setRole] = useState("watcher");
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
        setRole(data.role);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfos();
  }, [auth]);
  console.log(name, "yeah");

  useEffect(() => {
    function createCookie() {
      console.log("creating cookie");
      const cookieExists = Cookies.get("auth") !== undefined;
      if (!cookieExists && auth) {
        Cookies.set("auth", auth, { expires: 360 });
      }
    }
    createCookie();
  }, [auth]);
  useEffect(() => {
    console.log("checking cookie");
    const cookieExists = Cookies.get("auth") !== undefined;
    if (cookieExists) {
      setAuth(Cookies.get("auth"));
    }
  }, []);

  return (
    <div>
      <Router>
        {auth && <NavbarGlobal username={name} setAuth={setAuth} />}
        <Routes>
          {auth && role === "watcher" ? (
            <>
              <Route exact path="*" element={<Dashboard />} />
              <Route
                exact
                path="/watchlist"
                element={<Lists list_type={"Watch Later"} auth={auth} />}
              />
              <Route
                exact
                path="/favorites"
                element={<Lists list_type={"Favorites"} auth={auth} />}
              />
              <Route
                exact
                path="/watch/:type/:id"
                element={<WatchingPage auth={auth} />}
              />
              <Route exact path="/settings" element={<Profile auth={auth} />} />
              <Route
                exact
                path="/search/:query/:totalSearches/:page"
                element={<SearchResultsBody />}
              />
              <Route
                exact
                path="/blogposts"
                element={<BlogPosts auth={auth} />}
              />
              <Route exact path="/contact-us" element={<Contact />} />
              <Route exact path="/message/:type" element={<Message  />} />
            </>
          ) : auth && role === "admin" ? (
            <>
              <Route
                exact
                path="/postblogpost"
                element={<PostBlogPost auth={auth} />}
              />
              <Route
                exact
                path="/blogposts"
                element={<BlogPosts auth={auth} />}
              />
              <Route exact path="/message/:type" element={<Message  />} />
              
              <Route exact path="/*" element={<AdminTools />} />
            </>
          ) : (
            <>
              <Route
                exact
                path="/login"
                element={
                  
                    <Login setAuth={setAuth} setRole={setRole} />
                }
              />
              <Route
                exact
                path="/signup"
                element={<Signup setAuth={setAuth} />}
              />
              <Route exact path="*" element={<LandingPage />} />
              <Route exact path="/contact-us" element={<Contact />} />
              <Route exact path="/message/:type" element={<Message />} />
            </>
          )}
        </Routes>
        {auth && <Footer />}
      </Router>
    </div>
  );
}

export default App;

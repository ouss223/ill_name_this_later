

import react from 'react';
import PostBlogPost from "./components/PostBlogPost.jsx";
import BlogPosts from "./components/BlogPosts.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Contact from "./components/Contact.jsx";
import Message from "./components/Message.jsx";
import AdminTools from "./components/minicompo/AdminTools.jsx";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Lists from "./components/Lists.jsx";
import WatchingPage from "./components/WatchingPage.jsx";
import Profile from "./components/Profile.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SearchResultsBody from "./components/minicompo/SearchResultsBody.jsx";
import { motion,AnimatePresence } from "framer-motion"; // Import motion from Framer Motion

function AnimatedRoutes({auth, role, setAuth, setRole})
{
    const location = useLocation();

    return(
        <AnimatePresence >
        <Routes location={location} key={location.pathname}>
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
                element={
                <SearchResultsBody />}
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
        </AnimatePresence>
    );
}

export default AnimatedRoutes;
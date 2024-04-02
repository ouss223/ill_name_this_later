import "./App.css";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import { useAvatar } from "./AvatarContext";
import NavbarGlobal from "./components/NavbarGlobal.jsx";
import Footer from "./components/Footer.jsx";

import Cookies from "js-cookie";
import AnimatedRoutes from "./AnimatedRoutes.jsx";
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
          <AnimatedRoutes auth={auth} role={role} setAuth={setAuth} setRole={setRole} />
        {auth && <Footer />}
      </Router>
    </div>
  );
}

export default App;

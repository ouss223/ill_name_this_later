import react, { useEffect } from "react";
import NavBar from "./NavBar";
import { useState, useRef } from "react";
import Switch from "@mui/material/Switch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FieldChange from "./minicompo/FieldChange";
import { useAvatar } from "../AvatarContext";
import right_arrow from "../assets/right-arrow.png";
import pen from "../assets/pen.png";
const Profile = ({ auth }) => {
  const urls = [
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/8-Employee-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/40-School_boy-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/5-Manager-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-07-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/12-Delivery_Man-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-13-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/30-Scientist-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/29-Software_Assistant-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-26-512.png",
  ];

  const { avatarId, updateAvatarId } = useAvatar();
  //const [restricted, setRestricted] = useState(null);
  //const [restrictmode,setRestrictmode] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

  const [appear, setAppear] = useState(false);
  const [fieldName, setFieldName] = useState("");

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
        setUserInfos(data);
        //setRestricted((prev)=>data.restriction==1?true:false);
        //setRestrictmode(data.restriction === 1 ? 1 : 0);
        console.log(data);
        //console.log(restrictmode,restricted);
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfos();
  }, [auth, appear]);
  /*useEffect(() => {
    async function setRestrictedMode() {
    if(restricted===null || (restrictmode!==1 && restrictmode!==0) || userInfos==null )return;
      try {
        const response = await fetch(
          "http://localhost:8000/api/modifyRestriction.php",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body:
                JSON.stringify({  
                    "state": restrictmode,
                  }),
            
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (e) {
        console.log(e,"yeah");
      }
    }
    setRestrictedMode(); 
  }, [restricted]);*/

  return (
    <div className="flex flex-col text-white justify-center w-full items-center relative pb-40">
      <div className="flex flex-col text-white justify-center w-full items-center space-y-2 mb-24">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setFieldName("avatar");
            setAppear(true);
          }}
        >
          <img
            className="rounded-full w-32 h-32 "
            src={urls[avatarId]}
            alt="profile pic"
          />
          <img src={pen} className="h-10 absolute right-0 top-20 " alt="pen" />
        </div>

        <h1 className="alegreya-bold text-[60px] text-glowy-pink">{userInfos?.username}</h1>
        <h2 className="alegreya-normal text-[30px] text-dark-pink">{userInfos?.email}</h2>
      </div>
      <div className="w-full sm:w-3/4 flex flex-col  bg-blackrounded-lg  pl-10 py-8 gap-8 text-xl  max-w-[650px] ">
        <div
          className="alegreya-bold cursor-pointer flex items-center justify-between gap-10 w-full text-[40px]"
          onClick={() => {
            setFieldName("password");
            setAppear(true);
          }}
        >
          <h1>change Password</h1>
          <img src={right_arrow} alt="arrow" />
        </div>
        <div
          className="alegreya-bold cursor-pointer flex items-center justify-between gap-10 w-full text-[40px]"
          onClick={() => {
            setFieldName("email");
            setAppear(true);
          }}
        >
          <h1>change Email</h1>
          <img src={right_arrow} alt="arrow" />
        </div>
        <div
          className="alegreya-bold cursor-pointer flex items-center justify-between gap-10 w-full text-[40px]"
        //functionality not yet implemented
        >
          <h1>change Username</h1>
          <img src={right_arrow} alt="arrow" />
        </div>
      </div>
      {appear && (
        <FieldChange fieldName={fieldName} setAppear={setAppear} auth={auth} />
      )}

    </div>
  );
};
export default Profile;

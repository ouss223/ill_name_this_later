import react, { useEffect } from "react";
import NavBar from "./NavBar";
import { useState, useRef } from "react";
import Switch from "@mui/material/Switch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FieldChange from "./minicompo/FieldChange";
import { useAvatar } from "../AvatarContext";
const Profile = ({ auth }) => {
  const urls= ["https://cdn2.iconfinder.com/data/icons/avatars-60/5985/8-Employee-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/40-School_boy-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/5-Manager-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-07-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/12-Delivery_Man-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-13-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/30-Scientist-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/29-Software_Assistant-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-26-512.png"]

  const { avatarId, updateAvatarId } = useAvatar();

  const content = (
    <div className="flex  ">
      <h1 className="invisible">movies</h1>
      <h1 className="invisible">series</h1>
    </div>
  );
  //const [restricted, setRestricted] = useState(null);
  //const [restrictmode,setRestrictmode] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

  const[appear,setAppear]=useState(false); 
  const [fieldName,setFieldName]=useState("");


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
  }, [auth,appear]);
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
    <div className="flex flex-col text-white justify-center w-full items-center relative">
      <NavBar child={content} type={1} />
      <div className="flex flex-col text-white justify-center w-full items-center space-y-2 mb-24">
        <img
          className="rounded-full w-32 h-32"
          src={urls[avatarId]}
          alt="profile pic"
        />
        <h1 className="text-4xl">{userInfos?.username}</h1>
        <h2>{userInfos?.email}</h2>
      </div>
      <div className="w-full sm:w-3/4 flex flex-col  bg-gray-800 rounded-lg  pl-10 py-8 gap-8 text-xl  max-w-[650px] ">
        <h1 className="cursor-pointer flex items-center gap-10 max-w-[fit-content] "
        onClick={()=>{
          setFieldName("password");
          setAppear(true);
        
        }}
        >
          change Password <ArrowForwardIcon />
        </h1>
        <h1 className="cursor-pointer flex items-center gap-10 max-w-[fit-content]"
         onClick={()=>{
          setFieldName("email");
          setAppear(true);
        
        }}
        >
          change Email <ArrowForwardIcon />{" "}
        </h1>
        
        <h1 className="cursor-pointer flex items-center gap-10 max-w-[fit-content] "
         onClick={()=>{
          setFieldName("avatar");
          setAppear(true);
        
        }}
        >
          Pick Profile Avatar <ArrowForwardIcon />
        </h1>
        
        
      </div>
      {appear && <FieldChange  fieldName={fieldName} setAppear={setAppear} auth={auth}/> }
      <div className="flex text-white justify-center items-center text-xl mt-8">
          <button className="bg-red-600 px-4 py-1 rounded-xl">
              Log out
          </button>
        </div>
      
      
    </div>
  );
};
export default Profile;

import react, { useEffect } from "react";
import { useState, useRef } from "react";
import { useAvatar } from "../../AvatarContext";

const FieldChange = ({ fieldName, setAppear, auth }) => {
  
  const [change, setChange] = useState(false);
  const { avatarId, updateAvatarId } = useAvatar();
  const [field, setField] = useState([avatarId, avatarId]);

  const urls= ["https://cdn2.iconfinder.com/data/icons/avatars-60/5985/8-Employee-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/40-School_boy-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/5-Manager-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-07-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/12-Delivery_Man-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-13-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/30-Scientist-512.png","https://cdn2.iconfinder.com/data/icons/avatars-60/5985/29-Software_Assistant-512.png","https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-26-512.png"]

  useEffect(() => {
    async function changeFiled() {
      if (!change) return;
      if (field[0] !== field[1]) {
        console.log("fields are not the same");
        setChange(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8000/api/changeField.php",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify({
              field_name: fieldName,
              field_value: field[0],
            }),
          }
        );
        const data = await response.json();
        if(fieldName==="avatar")updateAvatarId(field[0]);
        
        console.log(data);
        setAppear(false);
      } catch (e) {
        console.log(e);
      }
    }
    changeFiled();
  }, [change]);

  return (
    <div className="absolute max-w-[600px] mt-[400px]  sm:bg-gray-300 bg-gray-300 h-2/3 sm:w-8/12 w-full flex flex-col text-black sm:bg-opacity-90 bg-opacity-100 rounded-md justify-center p-4 abel ">
      <h1 className="text-black text-center mb-10 font-semibold text-2xl">
        Change {fieldName}
      </h1>
      {fieldName === "avatar" ? (
        <div className="grid grid-cols-3 justify-items-center items-center " >
          {
            urls.map((url,index)=>(
              <img
              key={url}
              className={ (index)==field[0] ? "h-24  w-24 rounded-full cursor-pointer border-4 border-gray-600  hover:scale-110 transition duration-200 ease-in-out":"h-20 w-20 m-2 rounded-full cursor-pointer hover:scale-110 transition duration-200 ease-in-out"}
                src={url}
                onClick={() => {
                  setField([index, index]);
                  

                }}
              />
            ))

          }
        </div>
      ) : (
        <>
          <label className="text-gray-700">New {fieldName}</label>
          <input
            type={fieldName}
            className="px-2 h-10 rounded-lg bg-gray-400"
            onChange={(e) => setField((prev) => [e.target.value, prev[1]])}
          />
          <label className="mt-4 text-gray-700">Confirm {fieldName}</label>
          <input
            type={fieldName}
            className="px-2 h-10 rounded-lg bg-gray-400"
            onChange={(e) => setField((prev) => [prev[0], e.target.value])}
          />
        </>
      )}

      <div className="flex flex-row gap-10">
        <button
          className="bg-gray-700 rounded-lg w-1/2 h-10 mt-8 text-white"
          onClick={() => setChange(true)}
        >
          apply changes
        </button>
        <button
          className="bg-gray-700 rounded-lg w-1/2 h-10 mt-8 text-white"
          onClick={() => setAppear(false)}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default FieldChange;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const titles=["Your message is sent Successfully!","Your account has been made Successfully","Your blog has been posted Successfully"];
const contents=["We acknowledge receipt of your message and you will be hearing from us ASAP.","You will be directed to the home page .Enjoy watching your favorite movies on Rakcha","Good work , You will be directed to the home page ."];
const button_texts=["Cool ! " ,"Start Watching !","cool ! "];



function Message({content, title, button_text}) {
  const navigate = useNavigate();
  const {type} = useParams();
  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 lg:p-12 text-center md:max-w-xl mx-4 md:mx-auto my-8 md:my-12">

        <br /><br />
        <p className="text-violet-950 alegreya-normal text-[50px]  mb-4">
        {titles[type]}
        </p>

        <br /><br />
        <div style={{ marginLeft: '13%', textAlign: 'left' }} className="text-violet-950 abel text-[30px]  mb-6">
       {contents[type]}
        </div>
        <br /> <br /> <br />
        <button onClick={() => navigate("/")} className="alegreya-normal bg-violet-950 text-white py-2 px-4 lg:px-6 lg:py-3  hover:bg-violet-900">
          <span className="text-lg lg:text-xl">{button_texts[type]}</span>
        </button>

      </div>
    </div>
  );
}
export default Message;
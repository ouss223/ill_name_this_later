import React from 'react';
import { useNavigate } from 'react-router-dom';
function Message() {
  const navigate = useNavigate();
  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 lg:p-12 text-center md:max-w-xl mx-4 md:mx-auto my-8 md:my-12">

        <br /><br />
        <p className="text-violet-950 alegreya-normal text-[50px]  mb-4">
          <big>Y</big>OUR MESSAGE IS SENT <big>S</big>UCCESSFULLY!
        </p>

        <br /><br />
        <div style={{ marginLeft: '13%', textAlign: 'left' }} className="text-violet-950 abel text-[30px]  mb-6">
          <div>We acknowledge receipt of your</div>
          <div>message and you will be hearing from</div>
          <div>us ASAP!</div>
        </div>
        <br /> <br /> <br />
        <button onClick={() => navigate("/")} className="alegreya-normal bg-violet-950 text-white py-2 px-4 lg:px-6 lg:py-3  hover:bg-violet-900">
          <span className="text-lg lg:text-xl">K</span>EEP <span className="text-lg lg:text-xl">W</span>ATCHING!
        </button>

      </div>
    </div>
  );
}
export default Message;
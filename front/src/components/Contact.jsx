import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cinemaClap from "../assets/img/cinemaClap.png";
import enveloppe1 from "../assets/img/enveloppe1.png";

function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowError(false);

    // Vérification des champs de formulaire
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      setShowError(true);
      return;
    }

    navigate("/message");
  };

  return (
    <div className="flex flex-col md:flex-row bg-black text-white min-h-screen ">
      {/* Partie gauche */}
      <div className="md:pt-40 pt-20 items-center md:w-1/2">
        <div className="text-center  ">
          <button onClick={() => navigate("/")}>
            <img
              src={cinemaClap}
              alt="Clap Cinema"
              className="w-16 h-auto cursor-pointer"
            />
          </button>
          <button onClick={() => navigate("/")}>
            <h1
              className="text-3xl sm:text-6xl font-normal mb-0 mt-2 sm:mt-0"
              style={{ letterSpacing: "1mm", cursor: "pointer" }}
            >
              <span className="text-4xl sm:text-7xl">R</span>AKCHA
            </h1>
          </button>
          <br />
          <button onClick={() => navigate("/")}>
            <h6
              className="text-xs text-gray-400 mb-2"
              style={{ cursor: "pointer" }}
            >
              el forja lila ba7thena!
            </h6>
          </button>
          <h2 className="alegreya-normal text-[50px] mb-5" style={{ fontWeight: 400 }}>
            <big>C</big>ONTACT US NOW!
          </h2>
        </div>
        <img
          src={enveloppe1}
          alt="designpage"
          className=" mx-auto  object-cover w-3/4 hidden md:block"
        />
      </div>
      <br />
      <br />
      {/* Partie droite */}
      <div className="flex justify-center items-center md:w-1/2">
        <div className="bg-white p-10 lg w-3/4 md:w-5/6">
          {/* Formulaire */}
          <form className="abel flex flex-col gap-10" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="p-2 border-b-2 border-pink-600 bg-transparent text-2xl text-violet-400 placeholder-violet-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border-b-2 border-pink-600   text-2xl text-violet-400 placeholder-violet-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              className="p-2 border-b-2 border-pink-600 text-2xl text-violet-400 placeholder-violet-400"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Message"
              className="p-2 border-b-2 border-pink-600 text-2xl text-violet-400 placeholder-violet-400"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {showError && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              className="alegreya-normal bg-indigo-950 text-white py-2 px-8 hover:bg-indigo-950 mt-4 self-end"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

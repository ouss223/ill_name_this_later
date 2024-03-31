import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
const AdminTools = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div onClick={() => navigate("/postblogpost")} className="h-16 bg-dark-pink text-white cursor-pointer mx-10">
        <h1 className="alegreya-bol text-5xl">Add Blog Post</h1>
      </div>
    </div>
  );
};

export default AdminTools;

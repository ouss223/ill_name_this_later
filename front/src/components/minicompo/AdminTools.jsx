import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const AdminTools = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="w-full min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        onClick={() => navigate("/postblogpost")}
        className="h-16 bg-dark-pink text-white cursor-pointer mx-10 rounded-lg"
      >
        <h1 className="alegreya-bol text-4xl p-2 ">Add Blog Post</h1>
      </div>
    </motion.div>
  );
};

export default AdminTools;

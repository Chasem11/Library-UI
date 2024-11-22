import React from "react";
import Navbar from "../components/Navbar";

const Home = ({ onLogout }) => {
  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div className="container mt-5">
          <h1>Welcome to the Dashboard!</h1>
          <button className="btn btn-danger mt-3" onClick={onLogout}>
              Logout
          </button>
      </div>
    </div>
  );
};

export default Home;

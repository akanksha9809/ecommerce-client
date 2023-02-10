import React from "react";
import { useNavigate } from "react-router";
import "./Hero.scss";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="Hero">
      <div className="hero-content center">
        <h2 className="heading">Fuel Your Imagination and Grow Your Mind</h2>
        <p className="subheading">Find Your Next Favorite Read Today!</p>
        <button
          onClick={() => navigate("/category")}
          className="cta btn-primary"
        >
          Explore more
        </button>
      </div>
    </div>
  );
}

export default Hero;

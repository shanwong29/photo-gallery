import React from "react";
import "./Navbar.css";

const Navbar = ({ mode, handleModeChange }) => {
  return (
    <div className="nav">
      <button
        className={`nav__modeBtn ${mode === "mosaic" ? "active" : ""}`}
        onClick={() => handleModeChange("mosaic")}
      >
        Mosaic
      </button>

      <button
        className={`nav__modeBtn ${mode === "carousel" ? "active" : ""}`}
        onClick={() => handleModeChange("carousel")}
      >
        Carousel
      </button>
    </div>
  );
};

export default Navbar;

import React from "react";
import "./Navbar.css";

const Navbar = ({ mode, handleModeChange }) => {
  console.log(mode);
  return (
    <div className="nav">
      <button
        className={`nav__modeBtn ${mode === "mosaic" ? "active" : ""}`}
        onClick={() => handleModeChange("mosaic")}
      >
        mosaic
      </button>

      <button
        className={`nav__modeBtn ${mode === "carousel" ? "active" : ""}`}
        onClick={() => handleModeChange("carousel")}
      >
        carousel
      </button>
    </div>
  );
};

export default Navbar;

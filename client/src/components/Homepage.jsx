import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import img from "../assets/Art.jpg";
import "../Forms.css";

const Homepage = () => {
  return (
    <>
      <div className="wrapper">
        <div className="header">
          <h1 className="header-title">Art Haven</h1>
        </div>
        <div className="welcome">
          <div className="text">
            <h3>
              AUGMENTED <br /> REALITY
              <br />
              <br />
            </h3>
            <p>
              Bringing digital objects within the real world is already possible
              thanks to augmented reality. ‍<br /> <br />
              As the line blurs between real and digital, AR offers new ways to
              experience artworks, at scale, within the comfort of your home.
              <br />
              <br />
              <br />
              The Art Haven is a sanctuary of creativity, boasting a spacious
              layout and refined design. With its five distinct niches and wide
              central hallway, it offers seamless navigation through an
              exquisite collection of artworks. Each corner of The Art Haven
              holds treasures waiting to be discovered, inviting visitors to
              immerse themselves in a world of artistic wonder.
            </p>
          </div>
          <div className="image">
            <img src={img} alt="Art" />
          </div>
        </div>
        <div className="gallery-section">
          <h1>Checkout our Gallery</h1>
          <p>Enter to explore our collection.</p>
          <Link to="/gallery">
            <button>Enter</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homepage;

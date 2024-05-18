import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import img from "../assets/Art.jpg";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20">
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold uppercase">Art Haven</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center p-4">
          <div className="flex-1 p-4">
            <h3 className="text-2xl font-semibold mb-4">
              AUGMENTED <br /> REALITY
            </h3>
            <p className="text-lg leading-relaxed text-justify">
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
          <div className="flex-1 p-4">
            <img src={img} alt="Art" className="rounded-lg shadow-md" />
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-3xl font-bold mb-4">Checkout our Gallery</h1>
          <p className="text-lg mb-4">Enter to explore our collection.</p>
          <Link to="/gallery">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Enter
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homepage;

import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import met from "../assets/met.png";
import uffizi from "../assets/uffizi.png";
import artic from "../assets/artic.png";
import Auth from "../utils/auth";

const Homepage = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const galleries = [
    { id: 1, src: met, title: "Metropolitan Museum of New York" },
    { id: 2, src: artic, title: "Art Institute of Chicago" },
    { id: 3, src: uffizi, title: "Gallerie degli Uffizi" },
    { id: 4, src: met, title: "Metropolitan Museum of New York" },
    { id: 5, src: artic, title: "Art Institute of Chicago" },
    { id: 6, src: uffizi, title: "Gallerie degli Uffizi" },
  ];

  useEffect(() => {
  setIsLoggedIn(Auth.loggedIn());

  const swiper = new Swiper(".tranding-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1, // Adjust this to show parts of the adjacent slides on mobile
      },
      600: {
        slidesPerView: 1.5, // Adjust this as needed
      },
      1024: {
        slidesPerView: 2.5, // Adjust this as needed
      },
      1440: {
        slidesPerView: 3.5, // Adjust this as needed
      }
    },
    on: {
      slideChange: function () {
        setActiveIndex(this.realIndex);
      },
    },
  });
}, []);
  const handleImageClick = (index) => {
    if (index === activeIndex) {
      setClickedIndex(index);
    } else {
      setClickedIndex(null);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleEnter = () => {
    navigate("/gallery");
  };

  return (
    <>
      <Row id="hero" className="flex justify-center">
        <Container id="logo">
          <img src="/logo.svg" alt="Panorama - Virtual Art Gallery" />
        </Container>
      </Row>

      <Row id="intro" className="flex justify-center">
        <Container
          id="text-intro"
          className="d-flex justify-center text-center"
        >
          <h1 className="text-4xl p-5 font-extrabold">
            An Immersive
            <br />
            Art Experience
          </h1>
          <p className="p-6">
            Welcome to{" "}
            <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
              Panorama
            </span>
            , where the art world comes alive in a breathtaking 3D environment.
            Navigate through meticulously designed rooms, explore stunning
            artworks from renowned galleries, and experience the thrill of
            discovering art from the comfort of your home. Immerse yourself in
            the beauty of creativity, interact with masterpieces, and let your
            journey through Panorama ignite your passion for art.
          </p>
        </Container>
      </Row>

      <Row id="tranding" className="flex justify-center">
        <div className="container">
          <div className="swiper tranding-slider">
            <div className="swiper-wrapper">
              {galleries.map((gallery, index) => (
                <div
                  key={gallery.id}
                  className={`swiper-slide tranding-slide ${
                    index === clickedIndex ? "clicked" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <div className="tranding-slide-img">
                    <img src={gallery.src} alt={gallery.title} />
                    {index === clickedIndex && (
                      <div className="overlay">
                        {isLoggedIn ? (
                          <button
                            className="enter-button"
                            onClick={handleEnter}
                          >
                            Enter
                          </button>
                        ) : (
                          <>
                            <button
                              className="login-button"
                              onClick={handleLogin}
                            >
                              Login
                            </button>
                            <button
                              className="signup-button"
                              onClick={handleSignUp}
                            >
                              Sign Up
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {/* <div className="tranding-slide-content">
                    <div className="tranding-slide-content-bottom">
                      <h2 className="gallery-name">{gallery.title}</h2>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>

            {/* <div className="tranding-slider-control">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
              <div className="swiper-pagination"></div>
            </div> */}
          </div>
        </div>
      </Row>
    </>
  );
};

export default Homepage;

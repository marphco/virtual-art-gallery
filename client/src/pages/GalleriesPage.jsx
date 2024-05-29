import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import met from "../assets/met.png";
import uffizi from "../assets/uffizi.png";
import artic from "../assets/artic.png";
import Auth from "../utils/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GalleriesPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const galleries = [
    { id: 1, src: met, title: "Metropolitan Museum of New York", locked: true },
    { id: 2, src: artic, title: "Art Institute of Chicago", locked: false },
    { id: 3, src: uffizi, title: "Gallerie degli Uffizi", locked: true },
    { id: 4, src: met, title: "Metropolitan Museum of New York", locked: true },
    { id: 5, src: artic, title: "Art Institute of Chicago", locked: false },
    { id: 6, src: uffizi, title: "Gallerie degli Uffizi", locked: true },
  ];

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());
  }, []);

  useEffect(() => {
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
        slideShadows: false,
        scale: 1.2,
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
          slidesPerView: 1.1,
        },
        600: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 2.5,
        },
        1440: {
          slidesPerView: 3.5,
        },
      },
      on: {
        slideChange: function () {
          setActiveForm(this.realIndex);
        },
      },
    });
  }, []);

  const handleEnter = () => {
    navigate("/gallery");
  };

  const handleBuyNow = () => {
    navigate("/shop?view=subscriptions");
  };

  return (
    <>
      <Navbar
        showModal={showModal}
        setShowModal={setShowModal}
        activeForm={activeForm}
        setActiveForm={setActiveForm}
      />
      <Row id="tranding" className="flex justify-center">
        <Container>
          <h2 className="text-3xl font-bold mb-4 mt-24 text-center">
            Explore Our Stunning Galleries
          </h2>
          <p className="text-lg mb-6 text-center p-2">
            Explore our curated galleries and discover masterpieces from around
            the globe. Immerse yourself in diverse artistic expressions and let
            your imagination soar. Each gallery offers a unique experience that
            will captivate your senses. Start your art journey today!
          </p>

          <div className="swiper tranding-slider">
            <div className="swiper-wrapper">
              {galleries.map((gallery) => (
                <div key={gallery.id} className="swiper-slide tranding-slide">
                  <div className="tranding-slide-img relative rounded-lg overflow-hidden">
                    <img
                      src={gallery.src}
                      alt={gallery.title}
                      className="rounded-lg"
                    />
                    <div className="overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      {isLoggedIn ? (
                        gallery.locked ? (
                          <button
                            className="buy-now-button bg-white text-black py-2 px-4 rounded-lg"
                            onClick={handleBuyNow}
                          >
                            Subscribe
                          </button>
                        ) : (
                          <button
                            className="enter-button bg-white text-black py-2 px-4 rounded-lg"
                            onClick={handleEnter}
                          >
                            Enter
                          </button>
                        )
                      ) : (
                        <>
                          <button
                            className="login-button bg-white text-black py-2 px-4 rounded-lg mr-4"
                            onClick={() => {
                              setActiveForm("login");
                              setShowModal(true);
                            }}
                          >
                            Login
                          </button>
                          <button
                            className="signup-button bg-white text-black py-2 px-4 rounded-lg"
                            onClick={() => {
                              setActiveForm("signup");
                              setShowModal(true);
                            }}
                          >
                            Sign Up
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Row>
      <Footer />
    </>
  );
};

export default GalleriesPage;

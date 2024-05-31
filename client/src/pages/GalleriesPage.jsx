import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import met from "../assets/met.png";
import uffizi from "../assets/uffizi.png";
import artic from "../assets/artic.png";
import Arnaud from '../assets/arnaud.png';
import ArtCenterTokyo from '../assets/art-center-tokyo.png';
import CentroCultural from '../assets/centro-cultural.png';
import Lacroix from '../assets/lacroix.png';
import Lam from '../assets/lam.png';
import Louvre from '../assets/louvre.png';
import NationalGallery from '../assets/national-gallery.png';
import Randall from '../assets/randall.png';
import ScienceMuseum from '../assets/science-museum.png';
import Auth from "../utils/auth";

const GalleriesPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // Add this line

  const handleSubscribe = () => {
    navigate("/shop?view=subscriptions");
  };

  const galleries = [
    { id: 1, src: artic, title: "Art Institute of Chicago", locked: false },
    { id: 2, src: met, title: "Metropolitan Museum of New York", locked: true },
    { id: 3, src: uffizi, title: "Gallerie degli Uffizi", locked: true },
    { id: 4, src: Arnaud, title: "Galeria Raquel Arnaud", locked: true },
    { id: 5, src: CentroCultural, title: "Centro Cultural Rio De Janeiro", locked: true },
    { id: 6, src: Lacroix, title: "The Lacroix Art and History", locked: true },
    { id: 7, src: Lam, title: "Lam Museum of Anthropology", locked: true },
    { id: 8, src: Louvre, title: "Musée du Louvre", locked: true },
    { id: 9, src: NationalGallery, title: "National Gallery of Art", locked: true },
    { id: 10, src: Randall, title: "Randall Museum of Science", locked: true },
    { id: 11, src: ScienceMuseum, title: "International Science Museum", locked: true },
    { id: 12, src: ArtCenterTokyo, title: "Tokyo National Art Center", locked: true },
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
          setActiveIndex(this.realIndex);
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
      <Row className="tranding flex justify-center">
        <Container>
          <h1 className="title-gallery-page text-3xl font-bold mb-4 text-center">
            Explore Our Stunning Galleries
          </h1>
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
                            className="buy-now-button bg-white text-grey-700 py-2 px-4 rounded-full"
                            onClick={handleSubscribe}
                          >
                            Subscribe
                          </button>
                        ) : (
                          <button
                            className="enter-button text-xl bg-white text-black py-2 px-4 rounded-full"
                            onClick={handleEnter}
                          >
                            Enter
                          </button>
                        )
                      ) : (
                        <>
                          <button
                            className="login-button bg-white text-black py-2 px-4 rounded-full mr-4"
                            onClick={() => {
                              setActiveForm("login");
                              setShowModal(true);
                            }}
                          >
                            Login
                          </button>
                          <button
                            className="signup-button bg-white text-black py-2 px-4 rounded-full"
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
    </>
  );
};

export default GalleriesPage;

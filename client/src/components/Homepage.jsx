import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import met from "../assets/met.png";
import uffizi from "../assets/uffizi.png";
import artic from "../assets/artic.png";
import AuthService from "../utils/auth"; // Import AuthService

const Homepage = () => {
  const navigate = useNavigate();

  const galleries = [
    { id: 1, src: met, title: "Metropolitan Museum of New York", link: "/met" },
    { id: 2, src: artic, title: "Art Institute of Chicago", link: "/gallery" },
    { id: 3, src: uffizi, title: "Gallerie degli Uffizi", link: "/uffizi" },
    { id: 4, src: met, title: "Metropolitan Museum of New York", link: "/met" },
    { id: 5, src: artic, title: "Art Institute of Chicago", link: "/gallery" },
    { id: 6, src: uffizi, title: "Gallerie degli Uffizi", link: "/uffizi" },
  ];

  const handleGalleryClick = (link) => {
    if (AuthService.loggedIn()) {
      navigate(link);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div id="hero" className="flex justify-center items-center bg-gray-200">
        <div id="logo" className="text-center my-4">
          <img
            src="/logo.svg"
            alt="Panorama - Virtual Art Gallery"
            className="mx-auto w-82 h-auto mb-10"
          />
        </div>
      </div>
      <div
        id="intro"
        className="flex justify-center items-center bg-gray-100 py-16"
      >
        <div id="text-intro" className="text-center my-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            An Immersive Art Experience
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to <strong>Panorama</strong>, where the art world comes
            alive in a breathtaking 3D environment. Navigate through
            meticulously designed rooms, explore stunning artworks from renowned
            galleries, and experience the thrill of discovering art from the
            comfort of your home. Immerse yourself in the beauty of creativity,
            interact with masterpieces, and let your journey through Panorama
            ignite your passion for art.
          </p>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={20}
        slidesPerView={1.9}
        centeredSlides={true}
        loop={true}
        className="py-10"
      >
        {galleries.map((gallery) => (
          <SwiperSlide key={gallery.id}>
            <div
              onClick={() => handleGalleryClick(gallery.link)}
              className="gallery-item block relative cursor-pointer"
            >
              <img
                src={gallery.src}
                alt={gallery.title}
                className="gallery-image rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 mx-auto"
              />
              <div className="gallery-caption absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg">
                <p className="gallery-title">{gallery.title}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Homepage;

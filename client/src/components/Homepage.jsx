import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import img from "../assets/Art.jpg";
import met from "../assets/met.png";
import uffizi from "../assets/uffizi.png";
import artic from "../assets/artic.png";


const Homepage = () => {
  const galleries = [
    { id: 1, src: met, title: "Metropolitan Museum of New York" },
    { id: 2, src: artic, title: "Art Institute of Chicago" },
    { id: 3, src: uffizi, title: "Gallerie degli Uffizi" },
    { id: 4, src: met, title: "Metropolitan Museum of New York" },
    { id: 2, src: artic, title: "Art Institute of Chicago" },
    { id: 3, src: uffizi, title: "Gallerie degli Uffizi" },
  ];

  return (
    <>
      <Row id="hero" className="flex justify-center">
        <Container id="logo">
          <img src='/logo.svg' alt="Panorama - Virtual Art Gallery" />
        </Container>
      </Row>

      <Row id="intro" className="flex justify-center">
        <Container id="text-intro" className="d-flex justify-center text-center">
          <h1 className="text-2xl font-extrabold">An Immersive Art Experience</h1>
          <p>Welcome to <strong>Panorama</strong>, where the art world comes alive in a breathtaking 3D environment. Navigate through meticulously designed rooms, explore stunning artworks from renowned galleries, and experience the thrill of discovering art from the comfort of your home. Immerse yourself in the beauty of creativity, interact with masterpieces, and let your journey through Panorama ignite your passion for art.</p>
        </Container>
      </Row>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={20}
        slidesPerView={1.9}
        centeredSlides={true}
        loop={true}
      >
        {galleries.map((gallery) => (
          <SwiperSlide key={gallery.id}>
            <div className="gallery-item">
              <img src={gallery.src} alt={gallery.title} className="gallery-image" />
              <p>{gallery.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20">
        <div className="flex p-4">
          <img src='/logo.svg' alt="Panorama - Virtual Art Gallery" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center p-4">
          <div className="flex-1 p-4">
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

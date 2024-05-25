import React, { useEffect, useState, useRef } from "react";
import { Form, Button, FloatingLabel, Row, Container } from "react-bootstrap";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link, useNavigate } from "react-router-dom";
import met from "../assets/met.png";
import uffizi from "../assets/uffizi.png";
import artic from "../assets/artic.png";
import check from "../assets/check.svg";
import github from "../assets/github.svg";
import success from "../assets/success.svg";
import Auth from "../utils/auth";
import { useCart } from "../context/CartContext.jsx";
import emailjs from "@emailjs/browser";

const Result = () => {
  return (
    <div className="flex items-center">
      <img src={success} alt="success" className="h-6 pr-2 flex" />
      <p className="flex">Your message has been sent successfully!</p>
    </div>
  );
};

const Homepage = () => {
  const [result, showResult] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_5k75c3p", "template_ycb9v97", form.current, {
        publicKey: "e8n6PmtSDDwjsxchJ",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          showResult(true);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    e.target.reset();
  };

  const [clickedIndex, setClickedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const galleries = [
    { id: 1, src: met, title: "Metropolitan Museum of New York" },
    { id: 2, src: artic, title: "Art Institute of Chicago" },
    { id: 3, src: uffizi, title: "Gallerie degli Uffizi" },
    { id: 4, src: met, title: "Metropolitan Museum of New York" },
    { id: 5, src: artic, title: "Art Institute of Chicago" },
    { id: 6, src: uffizi, title: "Gallerie degli Uffizi" },
  ];

  const subscriptionItems = [
    {
      id: "1",
      title: "1 Month Subscription",
      price: 10,
      perks: [
        "Monthly Art Newsletter",
        "Digital Art Workshop",
        "Exclusive Member Badge",
      ],
    },
    {
      id: "2",
      title: "6 Month Subscription",
      price: 50,
      perks: [
        "Everything in 1 Month Subscription",
        "Access to Premium Galleries",
        "Early Access to New Exhibits",
      ],
    },
    {
      id: "3",
      title: "1 Year Subscription",
      price: 90,
      perks: [
        "Everything in 6 Month Subscription",
        "Unlimited Access to All Galleries",
        "Personalized Art Recommendations",
      ],
    },
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

  const handleAddToCart = (item) => {
    addToCart(item);
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
        <Container>
          <h2 className="text-3xl font-bold mb-4 mt-8 text-center">
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
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Row>

      <Container
        id="subscription-text"
        className="flex justify-center flex-col mt-8"
      >
        <h2 className="text-3xl font-bold text-center">
          Unlock Exclusive Benefits with Our Subscriptions
        </h2>
        <p className="text-lg mb-6 text-center p-6">
          Join our art community and unlock exclusive benefits. Enjoy premium
          galleries, personalized recommendations, and special events with our
          subscription plans. Choose a monthly, six-month, or yearly plan to
          enrich your art experience and stay connected!
        </p>
      </Container>

      <Row id="subscription-block" className="flex justify-center mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {subscriptionItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleAddToCart(item)}
            >
              <h3 className="text-2xl font-semibold mb-4 text-900 sub-title">
                {item.title}
              </h3>
              <p className="text-lg font-semibold text-600 dollar">
                $<span id="price">{item.price}</span>
              </p>
              <ul className="mb-4 text-left mt-4">
                {item.perks.map((perk, index) => (
                  <li key={index} className="mb-2 flex items-center">
                    <img src={check} alt="check" className="h-6 pr-2" />
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
                className="py-2 px-6 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </Row>

      <Container className="flex justify-center flex-col mt-40">
        <h2 className="text-3xl font-bold text-center">Get in Touch with Us</h2>
        <p className="text-lg mb-6 text-center p-6 pb-4">
          Have questions or feedback? Reach out to us using the form below, and
          we'll respond promptly. We're here to help!
        </p>
      </Container>

      <Container id="form">
        <Form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg"
        >
          <FloatingLabel controlId="floatingName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              name="from_name"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-opacity-50"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="reply_to"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-opacity-50"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              placeholder="Leave your message here"
              style={{ height: "200px" }}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-opacity-50"
              name="message"
              required
            />
          </FloatingLabel>

          <Button
            as="input"
            type="submit"
            value="Send Message!"
            className="button w-full py-3 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50"
          />

          <Row className="success">{result ? <Result /> : null}</Row>
        </Form>
      </Container>

      <Container id="footer" className="flex flex-col items-center mt-20">
  <h3 className="text-xl font-bold mb-4 text-center">Created by</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <button className="flex items-center justify-center p-2 rounded-full text-white bg-gray-800">
      <a className="flex items-center" href="https://github.com/heeyitsrissa/" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className="flex h-6 pr-2" />
        Marissa
      </a>
    </button>
    <button className="flex items-center justify-center p-2 rounded-full text-white bg-gray-800">
      <a className="flex items-center" href="https://github.com/Levangul" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className="flex h-6 pr-2" />
        Levan
      </a>
    </button>
    <button className="flex items-center justify-center p-2 rounded-full text-white bg-gray-800">
      <a className="flex items-center" href="https://github.com/Jetniksyla" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className="flex h-6 pr-2" />
        Jetnik
      </a>
    </button>
    <button className="flex items-center justify-center p-2 rounded-full text-white bg-gray-800">
      <a className="flex items-center" href="https://github.com/marphco" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="github" className="flex h-6 pr-2" />
        Marco
      </a>
    </button>
  </div>
</Container>

<Container id="footer" className="flex flex-col items-center mt-8">
  <p className="text-xs mb-4 text-center">© 2024 Spicys🌶️ - All Rights Reserved.</p>
</Container>


    </>
  );
};

export default Homepage;

import React, { useEffect, useState, useRef } from "react";
import { Form, Button, FloatingLabel, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import met from "../assets/met.png";
import uffizi from "../assets/uffizi.png";
import artic from "../assets/artic.png";
import Arnaud from "../assets/arnaud.png";
import ArtCenterTokyo from "../assets/art-center-tokyo.png";
import CentroCultural from "../assets/centro-cultural.png";
import Lacroix from "../assets/lacroix.png";
import Lam from "../assets/lam.png";
import Louvre from "../assets/louvre.png";
import NationalGallery from "../assets/national-gallery.png";
import Randall from "../assets/randall.png";
import ScienceMuseum from "../assets/science-museum.png";
import check from "../assets/check.svg";
import success from "../assets/success.svg";
import Auth from "../utils/auth";
import { useCart } from "../context/CartContext.jsx";
import emailjs from "@emailjs/browser";
import Navbar from "./Navbar";
import Notification from "./Shop/Notification";

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
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const galleries = [
    { id: 1, src: artic, title: "Art Institute of Chicago", locked: false },
    { id: 2, src: met, title: "Metropolitan Museum of New York", locked: true },
    { id: 3, src: uffizi, title: "Gallerie degli Uffizi", locked: true },
    { id: 4, src: Arnaud, title: "Galeria Raquel Arnaud", locked: true },
    {
      id: 5,
      src: CentroCultural,
      title: "Centro Cultural Rio De Janeiro",
      locked: true,
    },
    { id: 6, src: Lacroix, title: "The Lacroix Art and History", locked: true },
    { id: 7, src: Lam, title: "Lam Museum of Anthropology", locked: true },
    { id: 8, src: Louvre, title: "Musée du Louvre", locked: true },
    {
      id: 9,
      src: NationalGallery,
      title: "National Gallery of Art",
      locked: true,
    },
    { id: 10, src: Randall, title: "Randall Museum of Science", locked: true },
    {
      id: 11,
      src: ScienceMuseum,
      title: "International Science Museum",
      locked: true,
    },
    {
      id: 12,
      src: ArtCenterTokyo,
      title: "Tokyo National Art Center",
      locked: true,
    },
  ];

  const subscriptionItems = [
    {
      id: "1",
      title: "1 Month Subscription",
      price: 10,
      imageUrl: logo,
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
      imageUrl: logo,
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
      imageUrl: logo,
      perks: [
        "Everything in 6 Month Subscription",
        "Unlimited Access to All Galleries",
        "Personalized Art Recommendations",
      ],
    },
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
  }, [isLoggedIn]);

  const handleEnter = () => {
    navigate("/gallery");
  };

  const handleSubscribe = () => {
    navigate("/shop?view=subscriptions");
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
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

  const handleAddToCart = (item) => {
    const imageUrl = item.imageUrl || logo;
    addToCart({ ...item, imageUrl });
    setNotification({
      visible: true,
      message: `${item.title} has been added to cart!`,
      imageUrl,
    });
    setTimeout(
      () => setNotification({ visible: false, message: "", imageUrl: "" }),
      3000
    );
  };

  return (
    <>
      <Navbar
        showModal={showModal}
        setShowModal={setShowModal}
        activeForm={activeForm}
        setActiveForm={setActiveForm}
      />
      <Row id="hero" className="flex justify-center">
        <Container id="logo">
          <img src={logo} alt="Panorama - Virtual Art Gallery" />
        </Container>
      </Row>
      <Row id="intro" className="flex justify-center">
        <Container
          id="text-intro"
          className="d-flex justify-center text-center"
        >
          <h1 className="text-4xl p-5 font-bold">
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
      <Row className="tranding flex justify-center">
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

          <div
            className="swiper tranding-slider"
            key={isLoggedIn ? "loggedIn" : "loggedOut"}
          >
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
                $<span className="price">{item.price}</span>
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
                <FontAwesomeIcon
                  icon={faCartPlus}
                  className="text-white-500 pr-3 cursor-pointer"
                />
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
      <Container>
        <Form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg"
        >
          <FloatingLabel controlId="floatingName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              name="user_name"
              className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:ring-opacity-50"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="user_email"
              className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:ring-opacity-50"
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              placeholder="Leave your message here"
              style={{ height: "200px" }}
              className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:ring-opacity-50"
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
      <Notification notification={notification} />{" "}
      {/* Include Notification component */}
    </>
  );
};

export default Homepage;

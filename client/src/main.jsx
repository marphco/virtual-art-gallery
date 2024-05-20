// src/main.jsx
import ReactDOM from "react-dom/client";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Gallery from "./components/Gallery.jsx";
import Error from "./pages/Error.jsx";
import App from "./App.jsx";
import Login from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import OpenAI from "./components/OpenAI.jsx";
import Favorite from "./components/Favorite.jsx";
import Shop from './pages/Shop.jsx';
import Checkout from './pages/Checkout.jsx';
import { CartProvider } from './context/CartContext.jsx'; 
import "./index.css";





if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/openai",
        element: <OpenAI />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: '/shop',
        element: <Shop />,
      },
      {
        path: '/checkout',
        element: <Checkout />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);

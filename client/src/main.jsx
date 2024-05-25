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
import AuthForm from "./components/AuthForm.jsx";
import Profile from "./pages/Profile.jsx";
import Shop from "./pages/Shop.jsx";
import Checkout from "./pages/Checkout.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        // Service worker registered successfully
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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/openai",
        element: <OpenAI />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/login-signup",
        element: <AuthForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);

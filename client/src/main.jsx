import ReactDOM from "react-dom/client";
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate, useLocation } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Gallery from "./components/Gallery.jsx";
import Error from "./pages/Error.jsx";
import App from "./App.jsx";
import OpenAI from "./components/OpenAI.jsx";
import AuthForm from "./components/AuthForm.jsx";
import Profile from "./pages/Profile.jsx";
import Shop from "./pages/Shop.jsx";
import Checkout from "./pages/Checkout.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { useAuth, AuthProvider } from "./context/AuthContext.jsx";
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

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login-signup', { replace: true, state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return isAuthenticated ? children : null;
};

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
        path: "/gallery",
        element: (
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/openai",
        element: (
          <ProtectedRoute>
            <OpenAI />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shop",
        element: (
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "../src/components/Homepage.jsx";
import Gallery from "./components/Gallery.jsx";
import Error from "./pages/Error.jsx";
import App from "./App.jsx";
import Login from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";

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
        path: "/Signup",
        element: <SignupForm />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

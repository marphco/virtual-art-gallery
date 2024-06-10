import React, { useEffect, useRef, useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoomNavbar from "./components/RoomNavbar";
import InfoModal from "./components/InfoModal";
import "./App.css";
import OpenAI from "./components/OpenAI";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext"; 
import dotenv from 'dotenv';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const AppContext = React.createContext();

function App() {
  const [favoriteArts, setFavoriteArts] = useState([]);
  const installButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const installButton = installButtonRef.current;
    let deferredPrompt;

    if (installButton) {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredPrompt = event;
        installButton.classList.toggle("hidden", false);
      });

      installButton.addEventListener("click", async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const choiceResult = await deferredPrompt.userChoice;
          console.log("User choice:", choiceResult);
          deferredPrompt = null;
          installButton.classList.toggle("hidden", true);
        }
      });

      window.addEventListener("appinstalled", () => {
        console.log("👍", "appinstalled");
        deferredPrompt = null;
      });
    }
  }, []);

  const footerPaths = ["/", "/profile", "/login-signup", "/checkout", "/shop", "/galleries"];
  const navbarPaths = ["/profile", "/login-signup", "/checkout", "/shop", "/galleries"];
  const RoomNavbarPath = ["/gallery"];
  const InfoModalPath = ["/gallery"];

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <AppContext.Provider value={{ favoriteArts, setFavoriteArts }}>
          <div>
            {navbarPaths.includes(location.pathname) && <Navbar />}
          </div>
          <div>
            <Outlet />
          </div>
          <div>
            {InfoModalPath.includes(location.pathname) && <InfoModal />}
          </div>
          <div>
            {RoomNavbarPath.includes(location.pathname) && <RoomNavbar />}
          </div>
          <div>
            <OpenAI />
          </div>
          {footerPaths.includes(location.pathname) && <Footer />}
        </AppContext.Provider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

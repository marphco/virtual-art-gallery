// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import OpenAI from "./components/OpenAI";
import Footer from "./components/Footer"; // Import the Footer component

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
  const location = useLocation(); // Use the useLocation hook

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

  // Define the paths where the Footer should be displayed
  const footerPaths = ["/", "/profile", "/login-signup", "/checkout", "/shop"];

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{ favoriteArts, setFavoriteArts }}>
        <div>
          <Navbar />
        </div>
        <div>
          <Outlet />
        </div>
        <div>
          <OpenAI />
        </div>
        {/* Conditionally render Footer based on the current path */}
        {footerPaths.includes(location.pathname) && <Footer />}
        {/* <button ref={installButtonRef} id="installButton" className="hidden">Install App</button> */}
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;

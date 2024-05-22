import React, { useEffect, useRef } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import OpenAI from "./components/OpenAI";
import "./App.css";




const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const installButtonRef = useRef(null);


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

  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <OpenAI />
      </div>
      {/* <button ref={installButtonRef} id="installButton" className="hidden">Install App</button> */}
    </ApolloProvider>
  );
}

export default App;

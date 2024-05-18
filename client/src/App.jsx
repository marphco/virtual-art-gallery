import { useState, useEffect } from 'react'
import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import OpenAI from "./components/OpenAI";

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql", // Replace with your GraphQL server URI
  cache: new InMemoryCache(),
});

function App() {
  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setPromptInstall(event)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    if (promptInstall) {
      promptInstall.prompt()
      promptInstall.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
      })
    }
  }

  return (
    <ApolloProvider client={client}>
      <>
        <div>
          <Navbar />
        </div>
        <div>
          <Outlet />
        </div>
        <div>
          <OpenAI />
          <button onClick={handleInstallClick}>Install PWA</button>
        </div>
      </>
    </ApolloProvider>
  );
}

export default App;
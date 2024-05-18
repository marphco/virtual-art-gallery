import React, { useEffect, useRef } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import OpenAI from './components/OpenAI';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const installButtonRef = useRef(null);

  useEffect(() => {
    const installButton = installButtonRef.current;
    let deferredPrompt;

    if (installButton) {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        installButton.classList.toggle('hidden', false);
      });

      installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const choiceResult = await deferredPrompt.userChoice;
          console.log('User choice:', choiceResult);
          deferredPrompt = null;
          installButton.classList.toggle('hidden', true);
        }
      });

      window.addEventListener('appinstalled', () => {
        console.log('👍', 'appinstalled');
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
      <button ref={installButtonRef} id="installButton" className="hidden">Install App</button>
    </ApolloProvider>
  );
}

export default App;

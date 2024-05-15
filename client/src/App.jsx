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
        </div>
      </>
    </ApolloProvider>
  );
}

export default App;

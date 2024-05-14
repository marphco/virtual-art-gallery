import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import OpenAI from "./components/OpenAI";

function App() {
  return (
    <>
      <div>
        <Navbar/>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <OpenAI/>
      </div>
    </>
  );
}

export default App;

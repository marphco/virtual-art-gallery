import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar/>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;

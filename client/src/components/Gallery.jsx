import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Room from "./Room";
import CustomOrbitControls from "./CameraControls";
import Modal from "../pages/Modal"; 
import "../App.css";

function App() {
  const [selectedArt, setSelectedArt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaintingClick = (artDetails) => {
    setSelectedArt(artDetails);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArt(null);
  };

  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 1, 2], fov: 75 }}>
        <ambientLight intensity={0.8} color="#ffffff" />
        <pointLight position={[8, 8, 8]} intensity={100} color="#ffffff" />
        <pointLight position={[-8, 8, 8]} intensity={100} color="#ffffff" />
        <pointLight position={[8, 8, -8]} intensity={100} color="#ffffff" />
        <pointLight position={[-8, 8, -8]} intensity={60} color="#ffffff" />

        <pointLight position={[-12, 8, -8]} intensity={60} color="#ffffff" />
        <pointLight position={[-29, 8, -8]} intensity={100} color="#ffffff" />
        <pointLight position={[-29, 8, 8]} intensity={100} color="#ffffff" />
        <pointLight position={[-12, 8, 8]} intensity={60} color="#ffffff" />

        <pointLight position={[-20, 8, 0]} intensity={100} color="#ffffff" />
        <pointLight position={[0, 8, 0]} intensity={100} color="#ffffff" />

        <Room onPaintingClick={handlePaintingClick} />
        <CustomOrbitControls />
      </Canvas>

      {isModalOpen && selectedArt && (
        <Modal art={selectedArt} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;

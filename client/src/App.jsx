import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "../src/components/Room";
import CameraControls from "../src/components/CameraControls";
import Error from "../src/pages/Error";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      {/* <ErrorPage /> */}
      <Canvas camera={{ position: [0, 1, 2], fov: 75 }}>
        <ambientLight intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 1, 0]} intensity={1300} color="#ffffff" />
        <Room />
        <CameraControls />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}

export default App;

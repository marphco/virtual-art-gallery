import React, { useState, useEffect } from "react";
import { useLoader, extend } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls, TransformControls } from "three-stdlib";

extend({ OrbitControls, TransformControls });

function Room({ onPaintingClick }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(
          "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_titles,image_id,thumbnail&limit=6"
        );
        const data = await response.json();

        const formattedArt = data.data.map((art) => ({
          id: art.id,
          title: art.title,
          artist_titles: art.artist_titles,
          description: art.thumbnail ? art.thumbnail.alt_text : "No description available",
          imageUrl: art.image_id ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg` : null 
        }));
        setArtworks(formattedArt);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handlePaintingClick = (id, texture, title, artist, description) => {
    // Handle painting click here
  };
  const positions = [
    { x: 0, y: 2, z: 9 },
    { x: 0, y: 2, z: -9 },
    { x: 9, y: 2, z: 0 },
    { x: -20, y: 2, z: 9 },
    { x: -20, y: 2, z: -9 },
    { x: -29, y: 2, z: 0 },
  ];

  const rotations = [
    [1.6, Math.PI / 1, 0],
    [1.6, Math.PI / 1000, 0],
    [1.57, 0, Math.PI / 2],
    [1.6, Math.PI / 1, 0],
    [1.6, Math.PI / 1000, 0],
    [-1.57, 0, Math.PI / 2],
  ];

  return (
    <>
      {/* Perimeter Walls and Floor */}
      <Box
        args={[0.8, 12, 6]}
        position={[-10, 1, -7]}
        rotation={[0, Math.PI / 1, 0]}
        material={lightGreyMaterial}
      />
      <Box
        args={[0.8, 12, 6]}
        position={[-10, 1, 7]}
        rotation={[0, Math.PI / 1, 0]}
        material={lightGreyMaterial}
      />
      <Box
        args={[0.8, 12, 20]}
        position={[10, 1, 0]}
        rotation={[0, Math.PI / 1, 0]}
        material={lightGreyMaterial}
      />
      <Box
        args={[20, 12, 0.8]}
        position={[0, 1, 10]}
        material={lightGreyMaterial}
      />
      <Box
        args={[20, 12, 0.8]}
        position={[-20, 1, 10]}
        material={lightGreyMaterial}
      />
      <Box
        args={[20, 12, 0.8]}
        position={[0, 1, -10]}
        material={lightGreyMaterial}
      />
      <Box
        args={[20, 12, 0.8]}
        position={[-20, 1, -10]}
        material={lightGreyMaterial}
      />
      <Box
        args={[0.8, 12, 20]}
        position={[-30, 1, 0]}
        rotation={[0, Math.PI / 1, 0]}
        material={lightGreyMaterial}
      />
      <Box
        args={[40, 0.2, 20]}
        position={[-10, -3, 0]}
        material={darkGreyMaterial}
        userData={{ name: "floor" }}
      />
      <Box
        args={[10, 0.2, 10]}
        position={[0, -2.9, 0]}
        material={lightGreyMaterial}
        userData={{ name: "floor" }}
      />
      <Box
        args={[10, 0.2, 10]}
        position={[-20, -2.9, 0]}
        material={lightGreyMaterial}
        userData={{ name: "floor" }}
      />

      {/* Arts on the Walls */}
      {artworks.map((artwork, index) => (
        <React.Fragment key={artwork.id}>
          <Box
            args={[6.5, 0.3, 5]}
            position={[
              positions[index].x,
              positions[index].y,
              positions[index].z + 0.1,
            ]}
            rotation={rotations[index]}
            material={frameMaterial}
            userData={{ name: "art", id: artwork.id }}
            onClick={() =>
              handlePaintingClick(
                artwork.id,
                textures[index],
                artwork.title,
                `Artist ${index + 1}`,
                artwork.description
              )
            }
          />
          <Box
            args={[6, 0.2, 4.5]}
            position={[
              positions[index].x,
              positions[index].y,
              positions[index].z,
            ]}
            rotation={rotations[index]}
            material={new THREE.MeshStandardMaterial({ map: textures[index] })}
            userData={{ name: "painting", id: artwork.id }}
          />
        </React.Fragment>
      ))}

      {/* Ceiling */}
      <Box
        args={[10, 0.2, 10]}
        position={[0, 6.9, 0]}
        material={blueMaterial}
      />
      <Box
        args={[10, 0.2, 10]}
        position={[-20, 7, 0]}
        material={blueMaterial}
      />
      <Box
        args={[5, 2, 20]}
        position={[7.5, 8, 0]}
        material={lightGreyMaterial}
      />
      <Box
        args={[10, 2, 20]}
        position={[-10, 8, 0]}
        material={lightGreyMaterial}
      />
      <Box
        args={[10, 2, 5]}
        position={[-20, 8, -7.5]}
        material={lightGreyMaterial}
      />
      <Box
        args={[10, 2, 5]}
        position={[-20, 8, 7.5]}
        material={lightGreyMaterial}
      />
      <Box
        args={[5, 2, 20]}
        position={[-27.5, 8, 0]}
        material={lightGreyMaterial}
      />
      <Box
        args={[10, 2, 5]}
        position={[0, 8, -7.5]}
        material={lightGreyMaterial}
      />
      <Box
        args={[10, 2, 5]}
        position={[0, 8, 7.5]}
        material={lightGreyMaterial}
      />
    </>
  );
}

export default Room;

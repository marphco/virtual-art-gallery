// src/components/Room.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_ART } from "../utils/mutations";
import { TextureLoader } from "three";
import { Box } from "@react-three/drei";
import * as THREE from "three";

const Room = ({ onPaintingClick }) => {
  const [artworks, setArtworks] = useState([]);
  const [textures, setTextures] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const [saveArt] = useMutation(SAVE_ART);

  const loadArtworks = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=6&fields=id,title,artist_title,image_id,thumbnail`
      );
      const data = await response.json();
      const newArtworks = data.data
        .filter((art) => art.image_id)
        .map((art) => ({
          id: art.id,
          title: art.title,
          artist_titles: art.artist_title,
          description: art.thumbnail?.alt_text || "No description",
          imageUrl: art.image_id
            ? `https://www.artic.edu/iiif/2/${art.image_id}/full/full/0/default.jpg`
            : null,
        }));
      setArtworks((prevArtworks) => [...prevArtworks, ...newArtworks]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [page]);

  useEffect(() => {
    loadArtworks();
  }, [loadArtworks]);

  useEffect(() => {
    if (artworks.length > 0) {
      const loadTextures = async () => {
        const textureLoader = new TextureLoader();
        const texturePromises = artworks.map((art) =>
          textureLoader.loadAsync(art.imageUrl)
        );
        try {
          const loadedTextures = await Promise.all(texturePromises);
          setTextures(loadedTextures);
        } catch (error) {
          console.error("Error loading textures:", error);
        }
      };

      loadTextures();
    }
  }, [artworks]);

  const lastArtElementRef = useRef();
  const lightGreyMaterial = new THREE.MeshStandardMaterial({
    color: "#f0f0f0",
  });
  const darkGreyMaterial = new THREE.MeshStandardMaterial({ color: "#9f9f9f" });
  const blueMaterial = new THREE.MeshStandardMaterial({
    color: "#48BEFF",
    opacity: 0.5,
    transparent: true,
  });
  const frameMaterial = new THREE.MeshStandardMaterial({ color: "#9f9f9f" });

  const handlePaintingClick = (art) => {
    onPaintingClick(art);
  };

  const handleSaveClick = async (art) => {
    const artData = {
      id: art.id,
      title: art.title,
      artist_titles: art.artist_titles,
      description: art.description,
      imageUrl: art.imageUrl,
    };

    try {
      const { data } = await saveArt({ variables: { artData } });
      console.log("Artwork saved:", data.saveArt);
    } catch (error) {
      console.error("Error saving artwork:", error);
    }
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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(callback, options);
    if (lastArtElementRef.current) {
      observer.current.observe(lastArtElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [lastArtElementRef]);

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
      {artworks.map((art, index) => (
        <React.Fragment key={art.id}>
          <Box
            args={[6.5, 0.1, 5]}
            position={[
              positions[index % positions.length].x,
              positions[index % positions.length].y,
              positions[index % positions.length].z + 0.1,
            ]}
            rotation={rotations[index % rotations.length]}
            material={frameMaterial}
            userData={{ name: "art", id: art.id }}
            onClick={(e) => {
              e.stopPropagation();
              handlePaintingClick(art);
              handleSaveClick(art);
            }}
            ref={index === artworks.length - 1 ? lastArtElementRef : null}
          />
          {textures[index] && (
            <Box
              args={[6, 0.35, 4.5]}
              position={[
                positions[index % positions.length].x,
                positions[index % positions.length].y,
                positions[index % positions.length].z,
              ]}
              rotation={rotations[index % rotations.length]}
              material={
                new THREE.MeshStandardMaterial({ map: textures[index] })
              }
              userData={{ name: "painting", id: art.id }}
            />
          )}
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
};

export default Room;

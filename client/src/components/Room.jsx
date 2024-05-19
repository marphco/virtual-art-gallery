import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Box } from '@react-three/drei';
import * as THREE from 'three';
import Img1 from '../assets/metropolitan-museum/01.jpg';
import Img2 from '../assets/metropolitan-museum/02.jpg';
import Img3 from '../assets/metropolitan-museum/03.jpg';
import Img4 from '../assets/metropolitan-museum/04.jpg';
import Img5 from '../assets/metropolitan-museum/05.jpg';
import Img6 from '../assets/metropolitan-museum/06.jpg';

function Room({ onPaintingClick }) {
  const lightGreyMaterial = new THREE.MeshStandardMaterial({ color: '#f0f0f0' });
  const darkGreyMaterial = new THREE.MeshStandardMaterial({ color: '#9f9f9f' });
  const blueMaterial = new THREE.MeshStandardMaterial({ color: '#48BEFF', opacity: 0.5, transparent: true });
  const frameMaterial = new THREE.MeshStandardMaterial({ color: '#9f9f9f' });

  // Load the image textures
  const img1Texture = useLoader(TextureLoader, Img1);
  const img2Texture = useLoader(TextureLoader, Img2);
  const img3Texture = useLoader(TextureLoader, Img3);
  const img4Texture = useLoader(TextureLoader, Img4);
  const img5Texture = useLoader(TextureLoader, Img5);
  const img6Texture = useLoader(TextureLoader, Img6);

  const handlePaintingClick = (id, texture) => {
    const paintingDetails = {
      id,
      texture,
      title: `Title of Art ${id}`,
      artist: `Artist ${id}`,
      description: `Description of Art ${id}`
    };
    onPaintingClick(paintingDetails);
  };

  return (
    <>
      {/* Perimeter Walls and Floor */}
      <Box args={[0.8, 12, 6]} position={[-10, 1, -7]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />
      <Box args={[0.8, 12, 6]} position={[-10, 1, 7]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />
      <Box args={[0.8, 12, 20]} position={[10, 1, 0]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />
      <Box args={[20, 12, 0.8]} position={[0, 1, 10]} material={lightGreyMaterial} />
      <Box args={[20, 12, 0.8]} position={[-20, 1, 10]} material={lightGreyMaterial} />
      <Box args={[20, 12, 0.8]} position={[0, 1, -10]} material={lightGreyMaterial} />
      <Box args={[20, 12, 0.8]} position={[-20, 1, -10]} material={lightGreyMaterial} />
      <Box args={[0.8, 12, 20]} position={[-30, 1, 0]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />
      <Box args={[40, 0.2, 20]} position={[-10, -3, 0]} material={lightGreyMaterial} userData={{ name: 'floor' }} />
      <Box args={[10, 0.2, 10]} position={[0, -2.9, 0]} material={darkGreyMaterial} userData={{ name: 'floor' }} />
      <Box args={[10, 0.2, 10]} position={[-20, -2.9, 0]} material={darkGreyMaterial} userData={{ name: 'floor' }} />

      {/* Arts on the Walls */}
      <Box args={[6.5, 0.3, 5]} position={[0, 2, 9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} userData={{ name: 'art', id: 'art1' }} onClick={() => handlePaintingClick('art1', img1Texture)} />
      <Box args={[6, 0.2, 4.5]} position={[0, 2, 9]} rotation={[1.6, Math.PI / 1, 0]} material={new THREE.MeshStandardMaterial({ map: img1Texture })} userData={{ name: 'painting', id: 'art1' }} />

      <Box args={[6.5, 0.3, 5]} position={[0, 2, -9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} userData={{ name: 'art', id: 'art2' }} onClick={() => handlePaintingClick('art2', img2Texture)} />
      <Box args={[6, 0.2, 4.5]} position={[0, 2, -9]} rotation={[1.6, Math.PI / 1000, 0]} material={new THREE.MeshStandardMaterial({ map: img2Texture })} userData={{ name: 'painting', id: 'art2' }} />

      <Box args={[5, 0.3, 6.5]} position={[9.1, 2, 0]} rotation={[1.57, 0, Math.PI / 2]} material={frameMaterial} userData={{ name: 'art', id: 'art3' }} onClick={() => handlePaintingClick('art3', img3Texture)} />
      <Box args={[4.5, 0.2, 6]} position={[9, 2, 0]} rotation={[1.57, 0, Math.PI / 2]} material={new THREE.MeshStandardMaterial({ map: img3Texture })} userData={{ name: 'painting', id: 'art3' }} />

      <Box args={[6.5, 0.3, 5]} position={[-20, 2, 9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} userData={{ name: 'art', id: 'art4' }} onClick={() => handlePaintingClick('art4', img4Texture)} />
      <Box args={[6, 0.2, 4.5]} position={[-20, 2, 9]} rotation={[1.6, Math.PI / 1, 0]} material={new THREE.MeshStandardMaterial({ map: img4Texture })} userData={{ name: 'painting', id: 'art4' }} />

      <Box args={[6.5, 0.3, 5]} position={[-20, 2, -9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} userData={{ name: 'art', id: 'art5' }} onClick={() => handlePaintingClick('art5', img5Texture)} />
      <Box args={[6, 0.2, 4.5]} position={[-20, 2, -9]} rotation={[1.6, Math.PI / 1000, 0]} material={new THREE.MeshStandardMaterial({ map: img5Texture })} userData={{ name: 'painting', id: 'art5' }} />

      <Box args={[5, 0.3, 6.5]} position={[-29.4, 2, 0]} rotation={[-1.57, 0, Math.PI / 2]} material={frameMaterial} userData={{ name: 'art', id: 'art6' }} onClick={() => handlePaintingClick('art6', img6Texture)} />
      <Box args={[4.5, 0.2, 6]} position={[-29.3, 2, 0]} rotation={[-1.57, 0, Math.PI / 2]} material={new THREE.MeshStandardMaterial({ map: img6Texture })} userData={{ name: 'painting', id: 'art6' }} />

      {/* Ceiling */}
      <Box args={[10, 0.2, 10]} position={[0, 6.9, 0]} material={blueMaterial} />
      <Box args={[10, 0.2, 10]} position={[-20, 7, 0]} material={blueMaterial} />
      <Box args={[5, 2, 20]} position={[7.5, 8, 0]} material={lightGreyMaterial} />
      <Box args={[10, 2, 20]} position={[-10, 8, 0]} material={lightGreyMaterial} />
      <Box args={[10, 2, 5]} position={[-20, 8, -7.5]} material={lightGreyMaterial} />
      <Box args={[10, 2, 5]} position={[-20, 8, 7.5]} material={lightGreyMaterial} />
      <Box args={[5, 2, 20]} position={[-27.5, 8, 0]} material={lightGreyMaterial} />
      <Box args={[10, 2, 5]} position={[0, 8, -7.5]} material={lightGreyMaterial} />
      <Box args={[10, 2, 5]} position={[0, 8, 7.5]} material={lightGreyMaterial} />
    </>
  );
}

export default Room;

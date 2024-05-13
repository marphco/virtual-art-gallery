import { Box } from '@react-three/drei';
import * as THREE from 'three';

function Room() {
  const lightGreyMaterial = new THREE.MeshStandardMaterial({ color: '#f0f0f0' });
  const darkGreyMaterial = new THREE.MeshStandardMaterial({ color: '#9f9f9f' });
  const blueMaterial = new THREE.MeshStandardMaterial({ color: '#48BEFF', opacity: 0.5, transparent: true });

  return (
    <>
      {/* Thick Walls */}
      {/* SMALL WALL 1*/}
      <Box args={[0.8, 12, 6]} position={[-10, 1, -7]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} /> 
      {/* SMALL WALL 1*/}
      <Box args={[0.8, 12, 6]} position={[-10, 1, 7]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />
      {/* PERIMETER WALLS */}
      <Box args={[0.8, 12, 20]} position={[10, 1, 0]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />
      <Box args={[20, 12, 0.8]} position={[0, 1, 10]} material={lightGreyMaterial} />
      <Box args={[20, 12, 0.8]} position={[-20, 1, 10]} material={lightGreyMaterial} />
      <Box args={[20, 12, 0.8]} position={[0, 1, -10]} material={lightGreyMaterial} />
      <Box args={[20, 12, 0.8]} position={[-20, 1, -10]} material={lightGreyMaterial} />
      <Box args={[0.8, 12, 20]} position={[-30, 1, 0]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />

      {/* Floor */}
      <Box args={[40, 0.2, 20]} position={[-10, -3, 0]} material={lightGreyMaterial} />
      <Box args={[10, 0.2, 10]} position={[0, -2.9, 0]} material={darkGreyMaterial} />
      <Box args={[10, 0.2, 10]} position={[-20, -2.9, 0]} material={darkGreyMaterial} />

      {/* Ceiling */}
      <Box args={[10, 0.2, 10]} position={[0, 7, 0]} material={blueMaterial} />
      <Box args={[10, 0.2, 10]} position={[-20, 7, 0]} material={blueMaterial} />
    </>
  );
}

export default Room;

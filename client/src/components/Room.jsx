import { Plane } from '@react-three/drei';
import * as THREE from 'three'; 

function Room() {
  const lightGreyMaterial = new THREE.MeshStandardMaterial({ color: '#f0f0f0' }); // Light grey color
  const darkGreyMaterial = new THREE.MeshStandardMaterial({ color: '#9f9f9f' }); // Dark grey color
  const blueMaterial = new THREE.MeshStandardMaterial({ color: '#48BEFF', opacity: '.5'}); // Light blue color


  return (
    <>
      {/* Walls */}
      <Plane args={[20, 8]} position={[-10, 1, 0]} rotation={[0, Math.PI / 2, 0]} material={lightGreyMaterial} />
      <Plane args={[20, 8]} position={[10, 1, 0]} rotation={[0, -Math.PI / 2, 0]} material={lightGreyMaterial} />
      <Plane args={[20, 8]} position={[0, 1, 10]} rotation={[0, Math.PI, 0]} material={lightGreyMaterial} />
      <Plane args={[20, 8]} position={[0, 1, -10]} material={lightGreyMaterial} />

      

      {/* Floor */}
      <Plane args={[30, 30]} position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} material={lightGreyMaterial} />
      <Plane args={[10, 10]} position={[0, -2.9, 0]} rotation={[-Math.PI / 2, 0, 0]} material={darkGreyMaterial} />
      <Plane args={[30, 30]} position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]} material={blueMaterial} />


      
    </>
  );
}

export default Room;

// import { useLoader } from '@react-three/fiber';
// import { TextureLoader } from 'three';
// import { Box } from '@react-three/drei';
// import * as THREE from 'three';
// import Img1 from '../assets/metropolitan-museum/01.jpg';
// import Img2 from '../assets/metropolitan-museum/02.jpg';
// import Img3 from '../assets/metropolitan-museum/03.jpg';
// import Img4 from '../assets/metropolitan-museum/04.jpg';
// import Img5 from '../assets/metropolitan-museum/05.jpg';
// import Img6 from '../assets/metropolitan-museum/06.jpg';

// function Room() {
//   const lightGreyMaterial = new THREE.MeshStandardMaterial({ color: '#f0f0f0' });
//   const darkGreyMaterial = new THREE.MeshStandardMaterial({ color: '#9f9f9f' });
//   const blueMaterial = new THREE.MeshStandardMaterial({ color: '#48BEFF', opacity: 0.5, transparent: true });
//   const frameMaterial = new THREE.MeshStandardMaterial({ color: '#9f9f9f' });

//   // Load the image texture
//   const img1Texture = useLoader(TextureLoader, Img1);
//   const img2Texture = useLoader(TextureLoader, Img2);
//   const img3Texture = useLoader(TextureLoader, Img3);
//   const img4Texture = useLoader(TextureLoader, Img4);
//   const img5Texture = useLoader(TextureLoader, Img5);
//   const img6Texture = useLoader(TextureLoader, Img6);

//   // Use the texture as the material for the art piece with adjusted properties
//   const artMaterial1 = new THREE.MeshStandardMaterial({ map: img1Texture, metalness: 0, roughness: 1 });
//   const artMaterial2 = new THREE.MeshStandardMaterial({ map: img2Texture, metalness: 0, roughness: 1 });
//   const artMaterial3 = new THREE.MeshStandardMaterial({ map: img3Texture, metalness: 0, roughness: 1 });
//   const artMaterial4 = new THREE.MeshStandardMaterial({ map: img4Texture, metalness: 0, roughness: 1 });
//   const artMaterial5 = new THREE.MeshStandardMaterial({ map: img5Texture, metalness: 0, roughness: 1 });
//   const artMaterial6 = new THREE.MeshStandardMaterial({ map: img6Texture, metalness: 0, roughness: 1 });

//   return (
//     <>
//       {/* SMALL WALL 1 */}
//       <Box args={[0.8, 12, 6]} position={[-10, 1, -7]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} /> 
      
//       {/* SMALL WALL 2 */}
//       <Box args={[0.8, 12, 6]} position={[-10, 1, 7]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />
      
//       {/* PERIMETER WALLS */}
//       <Box args={[0.8, 12, 20]} position={[10, 1, 0]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />
//       <Box args={[20, 12, 0.8]} position={[0, 1, 10]} material={lightGreyMaterial} />
//       <Box args={[20, 12, 0.8]} position={[-20, 1, 10]} material={lightGreyMaterial} />
//       <Box args={[20, 12, 0.8]} position={[0, 1, -10]} material={lightGreyMaterial} />
//       <Box args={[20, 12, 0.8]} position={[-20, 1, -10]} material={lightGreyMaterial} />
//       <Box args={[0.8, 12, 20]} position={[-30, 1, 0]} rotation={[0, Math.PI / 1, 0]} material={lightGreyMaterial} />

//       {/* FLOOR */}
//       <Box args={[40, 0.2, 20]} position={[-10, -3, 0]} material={lightGreyMaterial} userData={{ name: 'floor' }} />
//       <Box args={[10, 0.2, 10]} position={[0, -2.9, 0]} material={darkGreyMaterial} userData={{ name: 'floor' }} />
//       <Box args={[10, 0.2, 10]} position={[-20, -2.9, 0]} material={darkGreyMaterial} userData={{ name: 'floor' }} />

//       {/* ARTS ON THE WALLS */}
//       {/* ART1 */}
//       <Box args={[6.5, 0.3, 5]} position={[0, 2, 9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} />
//       <Box args={[6, 0.2, 4.5]} position={[0, 2, 9]} rotation={[1.6, Math.PI / 1, 0]} material={artMaterial1} />

//       {/* ART2 */}
//       <Box args={[6.5, 0.3, 5]} position={[0, 2, -9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} />
//       <Box args={[6, 0.2, 4.5]} position={[0, 2, -9]} rotation={[1.6, Math.PI / 1000, 0]} material={artMaterial2} />

//       {/* ART3 */}
//       <Box args={[5, 0.3, 6.5]} position={[9.1, 2, 0]} rotation={[1.57, 0, Math.PI / 2]} material={frameMaterial} />
//       <Box args={[4.5, 0.2, 6]} position={[9, 2, 0]} rotation={[1.57, 0, Math.PI / 2]} material={artMaterial3} />

//       {/* ART4 */}
//       <Box args={[6.5, 0.3, 5]} position={[-20, 2, 9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} />
//       <Box args={[6, 0.2, 4.5]} position={[-20, 2, 9]} rotation={[1.6, Math.PI / 1, 0]} material={artMaterial4} />

//       {/* ART5 */}
//       <Box args={[6.5, 0.3, 5]} position={[-20, 2, -9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} />
//       <Box args={[6, 0.2, 4.5]} position={[-20, 2, -9]} rotation={[1.6, Math.PI / 1000, 0]} material={artMaterial5} />

//       {/* ART6 */}
//       <Box args={[5, 0.3, 6.5]} position={[-29.4, 2, 0]} rotation={[-1.57, 0, Math.PI / 2]} material={frameMaterial} />
//       <Box args={[4.5, 0.2, 6]} position={[-29.3, 2, 0]} rotation={[-1.57, 0, Math.PI / 2]} material={artMaterial6} />
      
//       {/* CEILING */}
//       <Box args={[10, 0.2, 10]} position={[0, 6.9, 0]} material={blueMaterial} />
//       <Box args={[10, 0.2, 10]} position={[-20, 7, 0]} material={blueMaterial} />
//       <Box args={[5, 2, 20]} position={[7.5, 8, 0]} material={lightGreyMaterial} />
//       <Box args={[10, 2, 20]} position={[-10, 8, 0]} material={lightGreyMaterial} />
//       <Box args={[10, 2, 5]} position={[-20, 8, -7.5]} material={lightGreyMaterial} />
//       <Box args={[10, 2, 5]} position={[-20, 8, 7.5]} material={lightGreyMaterial} />
//       <Box args={[5, 2, 20]} position={[-27.5, 8, 0]} material={lightGreyMaterial} />
//       <Box args={[10, 2, 5]} position={[0, 8, -7.5]} material={lightGreyMaterial} />
//       <Box args={[10, 2, 5]} position={[0, 8, 7.5]} material={lightGreyMaterial} />
//     </>
//   );
// }

// export default Room;

import { useQuery, gql } from '@apollo/client';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const GET_ARTWORKS = gql`
  query GetArtworks {
    artwork {
      id
      title
      image_id
      description
    }
  }
`;

function Room() {
  
  const { loading, error, data } = useQuery(GET_ARTWORKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const artworks = data.artwork;

  const artMaterials = artworks.map(artwork => {
    const texture = new THREE.TextureLoader().load(artwork.image_id);
    return new THREE.MeshStandardMaterial({ map: texture, metalness: 0, roughness: 1 });
  });

  const wallMaterial = new THREE.MeshStandardMaterial({ color: '#f0f0f0' });
  const floorMaterial = new THREE.MeshStandardMaterial({ color: '#9f9f9f' });
  const frameMaterial = new THREE.MeshStandardMaterial({ color: '#9f9f9f' });
  const ceilingMaterial = new THREE.MeshStandardMaterial({ color: '#48BEFF', opacity: 0.5, transparent: true });

  return (
    <>
      <Box args={[0.8, 12, 6]} position={[-10, 1, -7]} rotation={[0, Math.PI / 1, 0]} material={wallMaterial} /> 
      <Box args={[0.8, 12, 6]} position={[-10, 1, 7]} rotation={[0, Math.PI / 1, 0]} material={wallMaterial} />
      <Box args={[0.8, 12, 20]} position={[10, 1, 0]} rotation={[0, Math.PI / 1, 0]} material={wallMaterial} />
      <Box args={[20, 12, 0.8]} position={[0, 1, 10]} material={wallMaterial} />
      <Box args={[20, 12, 0.8]} position={[-20, 1, 10]} material={wallMaterial} />
      <Box args={[20, 12, 0.8]} position={[0, 1, -10]} material={wallMaterial} />
      <Box args={[20, 12, 0.8]} position={[-20, 1, -10]} material={wallMaterial} />
      <Box args={[0.8, 12, 20]} position={[-30, 1, 0]} rotation={[0, Math.PI / 1, 0]} material={wallMaterial} />

      <Box args={[40, 0.2, 20]} position={[-10, -3, 0]} material={floorMaterial} userData={{ name: 'floor' }} />
      <Box args={[10, 0.2, 10]} position={[0, -2.9, 0]} material={floorMaterial} userData={{ name: 'floor' }} />
      <Box args={[10, 0.2, 10]} position={[-20, -2.9, 0]} material={floorMaterial} userData={{ name: 'floor' }} />

      <Box args={[6.5, 0.3, 5]} position={[0, 2, 9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} />
      <Box args={[6, 0.2, 4.5]} position={[0, 2, 9]} rotation={[1.6, Math.PI / 1, 0]} material={artMaterials[0]} />

      <Box args={[6.5, 0.3, 5]} position={[0, 2, -9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} />
      <Box args={[6, 0.2, 4.5]} position={[0, 2, -9]} rotation={[1.6, Math.PI / 1000, 0]} material={artMaterials[1]} />

      <Box args={[5, 0.3, 6.5]} position={[9.1, 2, 0]} rotation={[1.57, 0, Math.PI / 2]} material={frameMaterial} />
      <Box args={[4.5, 0.2, 6]} position={[9, 2, 0]} rotation={[1.57, 0, Math.PI / 2]} material={artMaterials[2]} />

      <Box args={[6.5, 0.3, 5]} position={[-20, 2, 9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} />
      <Box args={[6, 0.2, 4.5]} position={[-20, 2, 9]} rotation={[1.6, Math.PI / 1, 0]} material={artMaterials[3]} />

      <Box args={[6.5, 0.3, 5]} position={[-20, 2, -9.1]} rotation={[1.6, Math.PI / 1, 0]} material={frameMaterial} />
      <Box args={[6, 0.2, 4.5]} position={[-20, 2, -9]} rotation={[1.6, Math.PI / 1000, 0]} material={artMaterials[4]} />

      <Box args={[5, 0.3, 6.5]} position={[-29.4, 2, 0]} rotation={[-1.57, 0, Math.PI / 2]} material={frameMaterial} />
      <Box args={[4.5, 0.2, 6]} position={[-29.3, 2, 0]} rotation={[-1.57, 0, Math.PI / 2]} material={artMaterials[5]} />
      
      <Box args={[10, 0.2, 10]} position={[0, 6.9, 0]} material={ceilingMaterial} />
      <Box args={[10, 0.2, 10]} position={[-20, 7, 0]} material={ceilingMaterial} />
      <Box args={[5, 2, 20]} position={[7.5, 8, 0]} material={wallMaterial} />
      <Box args={[10, 2, 20]} position={[-10, 8, 0]} material={wallMaterial} />
      <Box args={[10, 2, 5]} position={[-20, 8, -7.5]} material={wallMaterial} />
      <Box args={[10, 2, 5]} position={[-20, 8, 7.5]} material={wallMaterial} />
      <Box args={[5, 2, 20]} position={[-27.5, 8, 0]} material={wallMaterial} />
      <Box args={[10, 2, 5]} position={[0, 8, -7.5]} material={wallMaterial} />
      <Box args={[10, 2, 5]} position={[0, 8, 7.5]} material={wallMaterial} />
    </>
  );
}

export default Room;

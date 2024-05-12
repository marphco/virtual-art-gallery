import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

function CameraControls() {
  const { camera } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);

  useFrame(() => {
    if (moveForward.current && camera.position.z > -10) {
      camera.translateZ(-0.1);
    }
    if (moveBackward.current && camera.position.z < 10) {
      camera.translateZ(0.1);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        moveForward.current = true;
      } else if (event.key === 'ArrowDown') {
        moveBackward.current = true;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        moveForward.current = false;
        moveBackward.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return null;
}

export default CameraControls;

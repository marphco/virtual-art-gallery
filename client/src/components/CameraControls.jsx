import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CameraControls() {
  const { camera, gl: { domElement } } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const rotateLeft = useRef(false);
  const rotateRight = useRef(false);
  const velocity = useRef(new THREE.Vector3());
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const yaw = useRef(0);
  const pitch = useRef(0);

  useFrame(() => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Ensure horizontal movement only
    direction.normalize();

    const speed = 0.1;
    if (moveForward.current) {
      velocity.current.addScaledVector(direction, speed);
    }
    if (moveBackward.current) {
      velocity.current.addScaledVector(direction, -speed);
    }

    if (rotateLeft.current) {
      yaw.current += 0.02;
    }
    if (rotateRight.current) {
      yaw.current -= 0.02;
    }

    camera.quaternion.setFromEuler(new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ'));

    velocity.current.multiplyScalar(0.9);
    camera.position.add(velocity.current);

    // Confine the camera within the specified boundaries with precise values
    const boundaryBuffer = 2; // Half the thickness of your walls
    camera.position.x = Math.max(-30 + boundaryBuffer, Math.min(10 - boundaryBuffer, camera.position.x));
    camera.position.z = Math.max(-10 + boundaryBuffer, Math.min(10 - boundaryBuffer, camera.position.z));

    camera.position.y = 1; // Maintain a constant height
    velocity.current.set(0, 0, 0);
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          moveForward.current = true;
          break;
        case 'ArrowDown':
          moveBackward.current = true;
          break;
        case 'ArrowLeft':
          rotateLeft.current = true;
          break;
        case 'ArrowRight':
          rotateRight.current = true;
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          moveForward.current = false;
          moveBackward.current = false;
          break;
        case 'ArrowLeft':
          rotateLeft.current = false;
          break;
        case 'ArrowRight':
          rotateRight.current = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging.current) {
        const deltaX = event.clientX - prevMousePos.current.x;
        const deltaY = event.clientY - prevMousePos.current.y;

        // Adjust yaw based on horizontal mouse movements
        yaw.current -= deltaX * 0.002;
        // Adjust pitch based on vertical mouse movements and clamp it
        pitch.current -= deltaY * 0.002;
        pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current));

        prevMousePos.current.x = event.clientX;
        prevMousePos.current.y = event.clientY;
      }
    };

    const handleMouseDown = (event) => {
      isDragging.current = true;
      prevMousePos.current.x = event.clientX;
      prevMousePos.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mousedown', handleMouseDown);
    domElement.addEventListener('mouseup', handleMouseUp);

    return () => {
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [domElement]);

  return null;
}

export default CameraControls;

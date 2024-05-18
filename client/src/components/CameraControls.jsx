import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CameraControls() {
  const { camera, gl: { domElement }, scene } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const rotateLeft = useRef(false);
  const rotateRight = useRef(false);
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const yaw = useRef(0);
  const pitch = useRef(0);
  const [targetPosition, setTargetPosition] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const speed = 0.1;
  const movementSpeed = 0.2;

  // Encapsulate movement logic into functions
  const handleMovement = (movement) => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    if (moveForward.current) {
      movement.addScaledVector(direction, movementSpeed);
    }
    if (moveBackward.current) {
      movement.addScaledVector(direction, -movementSpeed);
    }
    if (moveLeft.current) {
      const left = new THREE.Vector3().crossVectors(camera.up, direction).normalize();
      movement.addScaledVector(left, movementSpeed);
    }
    if (moveRight.current) {
      const right = new THREE.Vector3().crossVectors(direction, camera.up).normalize();
      movement.addScaledVector(right, movementSpeed);
    }

    if (rotateLeft.current) {
      yaw.current += 0.02;
    }
    if (rotateRight.current) {
      yaw.current -= 0.02;
    }

    camera.quaternion.setFromEuler(new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ'));
  };

  const handleTapNavigation = (movement) => {
    if (targetPosition) {
      const distance = targetPosition.distanceTo(camera.position);
      if (distance > 0.1) {
        const moveDirection = targetPosition.clone().sub(camera.position).normalize();
        movement.addScaledVector(moveDirection, speed);
        setIsMoving(true);
      } else {
        setTargetPosition(null);
        setIsMoving(false);
      }
    }
  };

  useFrame(() => {
    const movement = new THREE.Vector3();

    if (!isMoving) {
      handleMovement(movement);
    } else {
      handleTapNavigation(movement);
    }

    movement.multiplyScalar(0.9);
    const newPosition = camera.position.clone().add(movement);

    // Confine the camera within the specified boundaries
    const boundaryBuffer = 2;
    newPosition.x = Math.max(-30 + boundaryBuffer, Math.min(10 - boundaryBuffer, newPosition.x));
    newPosition.z = Math.max(-10 + boundaryBuffer, Math.min(10 - boundaryBuffer, newPosition.z));
    newPosition.y = 1; // Maintain a constant height

    camera.position.copy(newPosition);
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isMoving) return;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          console.log('Key down: moveForward');
          moveForward.current = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          console.log('Key down: moveBackward');
          moveBackward.current = true;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          console.log('Key down: moveLeft');
          moveLeft.current = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          console.log('Key down: moveRight');
          moveRight.current = true;
          break;
        case 'q':
        case 'Q':
          console.log('Key down: rotateLeft');
          rotateLeft.current = true;
          break;
        case 'e':
        case 'E':
          console.log('Key down: rotateRight');
          rotateRight.current = true;
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          console.log('Key up: moveForward');
          moveForward.current = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          console.log('Key up: moveBackward');
          moveBackward.current = false;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          console.log('Key up: moveLeft');
          moveLeft.current = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          console.log('Key up: moveRight');
          moveRight.current = false;
          break;
        case 'q':
        case 'Q':
          console.log('Key up: rotateLeft');
          rotateLeft.current = false;
          break;
        case 'e':
        case 'E':
          console.log('Key up: rotateRight');
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
  }, [isMoving]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging.current) {
        const deltaX = event.clientX - prevMousePos.current.x;
        const deltaY = event.clientY - prevMousePos.current.y;

        yaw.current -= deltaX * 0.002;
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

  useEffect(() => {
    const handleTapNavigation = (event) => {
      if (isMoving) return;

      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const intersect = intersects.find(i => i.object.userData.name === 'floor');
        if (intersect) {
          console.log('Tap navigation: Moving to', intersect.point);
          setTargetPosition(intersect.point);
          setIsMoving(true);
        }
      }
    };

    domElement.addEventListener('click', handleTapNavigation);

    return () => {
      domElement.removeEventListener('click', handleTapNavigation);
    };
  }, [domElement, scene, camera]);

  useEffect(() => {
    if (!targetPosition && isMoving) {
      setIsMoving(false);
    }
  }, [targetPosition, isMoving]);

  useEffect(() => {
    if (!isMoving) {
      moveForward.current = false;
      moveBackward.current = false;
      moveLeft.current = false;
      moveRight.current = false;
      rotateLeft.current = false;
      rotateRight.current = false;
    }
  }, [isMoving]);

  // Add logging
  useEffect(() => {
    console.log('isMoving state changed:', isMoving);
  }, [isMoving]);

  useEffect(() => {
    console.log('Target position set to:', targetPosition);
  }, [targetPosition]);

  return null;
}

export default CameraControls;

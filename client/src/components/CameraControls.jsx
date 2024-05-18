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

    if (isMoving) {
      handleTapNavigation(movement);
    } else {
      handleMovement(movement);
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
          moveForward.current = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          moveBackward.current = true;
          break;
        case 'ArrowLeft':
        case 'q':
        case 'Q':
          rotateLeft.current = true;
          break;
        case 'ArrowRight':
        case 'e':
        case 'E':
          rotateRight.current = true;
          break;
        case 'a':
        case 'A':
          moveLeft.current = true;
          break;
        case 'd':
        case 'D':
          moveRight.current = true;
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          moveForward.current = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          moveBackward.current = false;
          break;
        case 'ArrowLeft':
        case 'q':
        case 'Q':
          rotateLeft.current = false;
          break;
        case 'ArrowRight':
        case 'e':
        case 'E':
          rotateRight.current = false;
          break;
        case 'a':
        case 'A':
          moveLeft.current = false;
          break;
        case 'd':
        case 'D':
          moveRight.current = false;
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

    const handleTouchMove = (event) => {
      if (isDragging.current && event.touches.length === 1) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - prevMousePos.current.x;
        const deltaY = touch.clientY - prevMousePos.current.y;

        yaw.current -= deltaX * 0.002;
        pitch.current -= deltaY * 0.002;
        pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current));

        prevMousePos.current.x = touch.clientX;
        prevMousePos.current.y = touch.clientY;
      }
    };

    const handleTouchStart = (event) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        isDragging.current = true;
        prevMousePos.current.x = touch.clientX;
        prevMousePos.current.y = touch.clientY;
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mousedown', handleMouseDown);
    domElement.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchmove', handleTouchMove);
    domElement.addEventListener('touchstart', handleTouchStart);
    domElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchmove', handleTouchMove);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchend', handleTouchEnd);
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
    domElement.addEventListener('touchstart', handleTapNavigation);

    return () => {
      domElement.removeEventListener('click', handleTapNavigation);
      domElement.removeEventListener('touchstart', handleTapNavigation);
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

  return null;
}

export default CameraControls;

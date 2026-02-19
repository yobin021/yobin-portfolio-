'use client';

import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface Model3DProps {
    modelPath: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number] | number;
}

export default function Model3D({
    modelPath,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}: Model3DProps) {
    const { scene, animations } = useGLTF(modelPath);
    const { actions } = useAnimations(animations, scene);
    const group = useRef<Group>(null);

    // Play all animations on mount
    React.useEffect(() => {
        if (actions) {
            Object.values(actions).forEach(action => {
                action?.play();
            });
        }
    }, [actions]);

    // Optional: Add a slow rotation to make it feel alive (on top of built-in animations)
    useFrame((state) => {
        if (group.current) {
            // Gentle floating animation
            group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale} dispose={null}>
            <primitive object={scene} />
        </group>
    );
}

// Preload the model to avoid pop-in
useGLTF.preload('/models/industrial_robot_arm.glb');

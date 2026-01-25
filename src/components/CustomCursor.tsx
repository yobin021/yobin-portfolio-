"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if device is mobile/touch
        const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

        if (isTouchDevice) {
            setIsVisible(false);
            return;
        }

        // Add custom cursor class to body
        document.body.classList.add('custom-cursor-active');

        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        let animationFrameId: number;

        // Smooth cursor movement
        const updateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.35;
            cursorY += dy * 0.35;

            cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
            animationFrameId = requestAnimationFrame(updateCursor);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Start animation loop
        animationFrameId = requestAnimationFrame(updateCursor);

        return () => {
            document.body.classList.remove('custom-cursor-active');
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
        >
            <div className="cursor-blur" />
            <div className="cursor-ring" />
            <div className="cursor-dot" />
        </div>
    );
}

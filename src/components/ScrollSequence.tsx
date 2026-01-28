"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const frameCount = 40;
const framePaths = Array.from(
    { length: frameCount },
    (_, i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
);

export default function ScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Track window dimensions
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress to 5 stages:
    // Stage 1 (0-0.2): Welcome - frames 0 to 13
    // Stage 2 (0.2-0.4): About Me - frames 13 to 26
    // Stage 3 (0.4-0.6): Paragraph - frames 26 to 39 (last frame)
    // Stage 4 (0.6-0.8): Hold on last frame
    // Stage 5 (0.8-1.0): Skills popup appears (still on last frame)
    const frameIndex = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 1],
        [0, 13, 26, frameCount - 1, frameCount - 1]
    );

    // 1. Handle Resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Set initial size
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 2. Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        framePaths.forEach((path, index) => {
            const img = new Image();
            img.src = path;

            img.onload = () => {
                loadedCount++;
                loadedImages[index] = img;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setIsLoading(false);
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${path}`);
            };
        });
    }, []);

    // 3. Render Loop (Updated for Portrait/Landscape Logic)
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (dimensions.width !== 0) {
            canvas.width = dimensions.width;
            canvas.height = dimensions.height;
        }

        const render = (index: number) => {
            if (!context || dimensions.width === 0) return;

            const img = images[Math.round(index)];
            if (img) {



                // Calculate scale to cover the screen
                const scale = Math.max(
                    dimensions.width / img.width,
                    dimensions.height / img.height
                );

                // Calculate base center position (Normal condition)
                let x = dimensions.width / 2 - (img.width / 2) * scale;
                const y = dimensions.height / 2 - (img.height / 2) * scale;




                context.clearRect(0, 0, dimensions.width, dimensions.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        render(frameIndex.get());

        const unsubscribe = frameIndex.on("change", (latest) => {
            render(latest);
        });

        return () => unsubscribe();
    }, [frameIndex, images, dimensions]);

    return (
        <div id="about-me" ref={containerRef} className="relative h-[400vh] w-full">
            {isLoading ? (
                <div className="sticky top-0 flex h-screen w-full items-center justify-center bg-background text-primary-text">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
            ) : (
                <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

                    <canvas ref={canvasRef} className="block h-full w-full object-cover" />

                    {/* Text Overlays - 5 Stage Progression */}
                    {/* Stage 1 (0-20%): Welcome */}
                    <OverlayText start={0} end={0.2} scrollYProgress={scrollYProgress} className="items-center justify-center text-center">
                        <h1 className="text-4xl font-bold tracking-tighter text-white md:text-7xl lg:text-9xl font-display">
                            Welcome
                        </h1>
                    </OverlayText>

                    {/* Stage 2 (20-40%): About Me */}
                    <OverlayText start={0.2} end={0.4} scrollYProgress={scrollYProgress} className="items-center justify-start px-4 text-left md:px-20">
                        <div>
                            <h2 className="text-3xl font-semibold text-white md:text-6xl font-display">ABOUT ME</h2>
                            <h3 className="mt-4 max-w-[280px] text-base text-white md:max-w-md md:text-xl">
                                I am a passionate Electronics and Communication Engineering student
                                from Loyola-ICAM College of Engineering and Technology.
                            </h3>
                        </div>
                    </OverlayText>

                    {/* Stage 3 (40-60%): Paragraph */}
                    <OverlayText start={0.4} end={0.6} scrollYProgress={scrollYProgress} className="items-center justify-end px-4 text-right md:px-20">
                        <div>
                            <h3 className="mt-4 max-w-[280px] text-base text-white md:max-w-md md:text-xl">
                                I specialize in embedded systems, IoT and full-stack development.
                            </h3>
                        </div>
                    </OverlayText>

                    {/* Stage 4 (60-80%): Last image visible (no text overlay) */}
                    {/* Stage 5 (80-100%): Skills popup appears (handled by TechStackVShape component) */}



                </div>
            )}
        </div>
    );
}

function OverlayText({
    children,
    start,
    end,
    scrollYProgress,
    className = "",
}: {
    children: React.ReactNode;
    start: number;
    end: number;
    scrollYProgress: any;
    className?: string;
}) {
    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [20, 0, 0, -20]);
    const pointerEvents = useTransform(scrollYProgress, (v: any) => (v >= start && v <= end ? "auto" : "none"));

    return (
        <motion.div
            style={{ opacity, y, pointerEvents }}
            className={`absolute inset-0 flex h-full w-full ${className}`}
        >
            {children}
        </motion.div>
    );
}
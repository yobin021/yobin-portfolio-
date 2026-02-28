"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

import DotGrid from "./DotGrid";

interface Project {
    title: string;
    description: string;
    tags: string[];
    links: {
        github?: string;
        demo?: string;
    };
}

const projects: Project[] = [
    {
        title: "Bluseques",
        description: "BluSeques combines industrial IoT with the Internet Computer (ICP) to automate real-time CO₂ tracking. It enables instant, transparent carbon credit trading, replacing slow traditional markets.",
        tags: ["JavaScript", "HTML", "CSS", "Motoko"],
        links: { github: "https://github.com/yobin021/bluseques", demo: "#" },
    },
    {
        title: "Smart classroom",
        description: "Smart Classroom Automation uses Raspberry Pi 4 and a webcam to detect a person's position in a classroom. The room is divided into zones, and only the fan and light in the occupied zone turn ON automatically. When no person is detected, devices turn OFF after a delay, saving energy.",
        tags: ["Python"],
        links: { github: "https://github.com/yobin021/smart_classroom", demo: "#" },
    },
    {
        title: "Parking-today",
        description: "This project is a Raspberry Pi based ANPR system that detects vehicles using YOLO, captures the license plate, extracts text using OCR, validates Indian plate formats, and updates real-time parking entry/exit status with fee calculation using Supabase database and FastAPI integration.",
        tags: ["Python", "Raspberry Pi", "YOLO", "OCR", "Supabase", "FastAPI"],
        links: { github: "https://github.com/yobin021/Parking-today", demo: "#" },
    },
    {
        title: "Portfolio",
        description: "This portfolio showcases my journey as an Electronics and Communication Engineer with a strong interest in embedded systems, robotics, and web development.",
        tags: ["TypeScript", "JavaScript", "CSS"],
        links: { github: "https://github.com/yobin021/yobin-portfolio-", demo: "#" },
    },
    {
        title: "Slice2025",
        description: "Slice 2025 national level technical Symposium",
        tags: ["HTML", "CSS", "JavaScript"],
        links: { github: "https://github.com/yobin021/slice2025", demo: "https://slice2025.in/" },
    },

];


export default function Projects({ isEmbedded = false }: { isEmbedded?: boolean }) {

    // Switch between a section (standalone) and a div (embedded)
    const Component = isEmbedded ? "div" : "section";

    // If embedded, we remove the main background to blend with the parent.
    // If standalone, we keep the main background (now provided by StarsBackground).
    // In standalone mode, we rely on StarsBackground for the bg, so we use distinct styling.
    const className = isEmbedded
        ? "flex w-full flex-col items-center justify-center gap-12 px-6 py-24 text-primary-text"
        : "relative z-30 flex min-h-screen w-full flex-col items-center justify-center gap-12 overflow-hidden px-6 py-24 text-primary-text";

    return (
        <Component id="projects" className={className}>
            {!isEmbedded && (
                <div className="absolute inset-0 z-0">
                    <DotGrid
                        dotSize={5}
                        gap={15}
                        baseColor="#271E37"
                        activeColor="#5227FF"
                        proximity={120}
                        shockRadius={250}
                        shockStrength={5}
                        resistance={750}
                        returnDuration={1.5}
                    />
                </div>
            )}
            <div className="relative z-10 flex flex-col items-center justify-center gap-12 w-full max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold tracking-tighter text-white md:text-6xl font-display">Projects</h2>
                    <p className="mt-4 text-gray-400">Some things I&apos;ve built.</p>
                </motion.div>

                <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="project-card-parent"
                        >
                            <div className="project-card">
                                <div className="project-card-logo">
                                    <span className="project-card-circle project-card-circle1" />
                                    <span className="project-card-circle project-card-circle2" />
                                    <span className="project-card-circle project-card-circle3" />
                                    <span className="project-card-circle project-card-circle4" />
                                    <span className="project-card-circle project-card-circle5">
                                        {project.links.github ? (
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-full h-full pointer-events-auto"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github className="text-white w-5 h-5" />
                                            </a>
                                        ) : (
                                            <Github className="text-white w-5 h-5" />
                                        )}
                                    </span>
                                </div>
                                <div className="project-card-glass" />
                                <div className="project-card-content">
                                    <span className="project-card-title">{project.title}</span>
                                    <span className="project-card-text line-clamp-3">{project.description}</span>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white/80">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="project-card-bottom">
                                    <a href={project.links.demo || project.links.github || "#"} target="_blank" rel="noopener noreferrer" className="project-card-view-more ml-auto">
                                        <button className="project-card-view-more-button">Explore</button>
                                        <svg className="project-card-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Component>
    );
}
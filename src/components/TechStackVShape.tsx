"use client";

import React, { useRef } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaReact, FaNodeJs } from "react-icons/fa";
import { SiC, SiPostgresql, SiMysql, SiInternetcomputer } from "react-icons/si";
import { motion, useScroll, useTransform } from "framer-motion";
// 1. Import Projects
import Projects from "./Projects";

import DotGrid from "./DotGrid";

export default function TechStackVShape() {
    // ... (Keep your existing icons array) ...
    const icons = [
        // Row 1
        [
            { Icon: FaHtml5, color: "text-orange-500", name: "HTML" },
            { Icon: FaCss3Alt, color: "text-blue-500", name: "CSS" },
            { Icon: FaJs, color: "text-yellow-400", name: "JavaScript" },
            { Icon: FaPython, color: "text-blue-400", name: "Python" },
        ],
        // Row 2
        [
            { Icon: SiC, color: "text-blue-600", name: "C Programming" },
            { Icon: FaReact, color: "text-cyan-400", name: "React" },
            { Icon: FaNodeJs, color: "text-green-500", name: "Node.js" },
        ],
        // Row 3
        [
            { Icon: SiInternetcomputer, color: "text-purple-500", name: "Motoko" },
            { Icon: SiPostgresql, color: "text-blue-300", name: "PostgreSQL" },
        ],
        // Row 4
        [
            { Icon: SiMysql, color: "text-blue-500", name: "MySQL" },
        ],
    ];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            id="skills"
            className="relative z-30 -mt-[100vh] flex w-full flex-col items-center justify-start pointer-events-none"
        >
            {/* REMOVED THE SPACER DIV AS PER PREVIOUS FIX */}

            <motion.div
                style={{ opacity }}
                // Added rounded-b-[3rem] to make the bottom of the projects look nice too
                className="pointer-events-auto relative flex min-h-screen w-full flex-col items-center justify-center gap-12 rounded-t-[3rem] rounded-b-[3rem] bg-[#090a0f] overflow-hidden px-4 py-24 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
                {/* DotGrid Background */}
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
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent rounded-t-[3rem] z-10" />

                <motion.div style={{ y }} className="flex flex-col items-center gap-12 w-full z-10">
                    <h2 className="text-4xl font-bold tracking-tighter text-white md:text-6xl font-display drop-shadow-2xl">
                        Skills
                    </h2>

                    <div className="flex flex-col items-center gap-6 md:gap-10">
                        {icons.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex gap-4 md:gap-12">
                                {row.map(({ Icon, color, name }, index) => (
                                    <div
                                        key={name}
                                        className="group relative flex items-center justify-center"
                                    >
                                        <div className="absolute inset-0 rounded-full bg-white/5 blur-xl transition-all group-hover:bg-white/20" />
                                        <Icon className={`relative h-12 w-12 md:h-20 md:w-20 ${color} transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 filter drop-shadow-lg`} />
                                        <span className="absolute -bottom-10 scale-0 rounded bg-black/80 px-3 py-1 text-xs text-white backdrop-blur-md transition-all group-hover:scale-100 whitespace-nowrap border border-white/10">
                                            {name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 2. INSERT PROJECTS HERE */}
                {/* This allows Projects to exist INSIDE the same glass container */}
                <div className="w-full mt-12">
                    <Projects isEmbedded={true} />
                </div>

            </motion.div>
        </section>
    );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Menu, X, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Social links array
    const socialLinks = [
        { Icon: Linkedin, href: "https://www.linkedin.com/in/yobin-s-55681b290/", label: "LinkedIn" },
        { Icon: Github, href: "https://github.com/yobin021", label: "Github" },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4"
        >
            {/* 1. Left Side (Branding) */}
            <div className="flex items-center gap-3">
                <span className="text-xl font-medium tracking-wide text-primary-text font-display">
                    Yobin
                </span>
            </div>

            {/* 2. Center (The Pill - Desktop) */}
            <div className="hidden md:block">
                <div className="flex items-center gap-10 rounded-full border border-white/5 bg-white/10 px-10 py-2 backdrop-blur-md">
                    {["About me", "Skills", "Projects"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                            className="relative text-lg text-secondary-text transition-all duration-300 px-6 py-2 rounded-full hover:text-white group"
                        >
                            {/* Violet pill background on hover */}
                            <span className="absolute inset-0 bg-violet-600/80 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10"></span>
                            {item}
                        </Link>
                    ))}
                </div>
            </div>

            {/* 3. Right Side (Socials - Desktop) */}
            <div className="hidden items-center gap-3 md:flex">
                {socialLinks.map(({ Icon, href, label }, i) => (
                    <div key={i} className="relative group">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white overflow-hidden transition-all duration-300 hover:shadow-[3px_2px_45px_0px_rgba(0,0,0,0.12)]"
                        >
                            {/* Fill effect from top */}
                            <div
                                className={`absolute top-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full ${label === "LinkedIn" ? "bg-[#0274b3]" : "bg-[#24262a]"
                                    }`}
                            />
                            <Icon className="relative z-10 h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                        </a>
                        {/* Tooltip */}
                        <div
                            className={`absolute -bottom-7 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md text-white text-sm opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:-bottom-12 ${label === "LinkedIn" ? "bg-[#0274b3]" : "bg-[#24262a]"
                                }`}
                        >
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Toggle */}
            <button
                className="block text-primary-text md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* === MOBILE MENU OVERLAY (Updated for Glass Theme) === */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    // 👇 UPDATED CLASSES HERE
                    className="absolute left-0 top-16 w-full border-b border-white/10 bg-black/30 px-6 py-6 backdrop-blur-xl md:hidden"
                >
                    <div className="flex flex-col space-y-6">
                        {["About me", "Skills", "Projects"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                                className="text-lg font-medium text-primary-text transition-colors hover:text-accent font-display"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}

                        {/* Mobile Socials */}
                        <div className="flex gap-4 pt-4 border-t border-white/10">
                            {socialLinks.map(({ Icon, href, label }, i) => (
                                <div key={i} className="relative group">
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white overflow-hidden transition-all duration-300"
                                    >
                                        {/* Fill effect from top */}
                                        <div
                                            className={`absolute top-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full ${label === "LinkedIn" ? "bg-[#0274b3]" : "bg-[#24262a]"
                                                }`}
                                        />
                                        <Icon className="relative z-10 h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
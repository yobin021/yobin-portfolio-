"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ScrollSequence from "@/components/ScrollSequence";
import TechStackVShape from "@/components/TechStackVShape";

export default function HomeClient() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Always wait until mounted to avoid hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <main className="relative min-h-screen">
            <Navbar />
            <ScrollSequence />
            <TechStackVShape />

        </main>
    );
}

"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ScrollSequence from "@/components/ScrollSequence";
import TechStackVShape from "@/components/TechStackVShape";
import ContactForm from "@/components/ContactForm";
import Loader from "@/components/Loader";

export default function HomeClient() {
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Show loader for 2 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Always show loader until mounted and timer completes
    if (!mounted || loading) {
        return <Loader />;
    }

    return (
        <main className="relative min-h-screen">
            <Navbar />
            <ScrollSequence />
            <TechStackVShape />
            <ContactForm />
        </main>
    );
}

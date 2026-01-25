"use client";

import React from 'react';

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="relative w-full max-w-[200px]">
                <div className="relative h-[30px] w-full rounded-[10px] overflow-hidden shadow-[0_0_3px_rgba(255,255,255,0.5)]">
                    {/* Gradient background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-black bg-[length:200%_100%] animate-gradient-slide" />

                    {/* Reflection effect */}
                    <div className="absolute top-[31px] left-0 right-0 h-[30px] rounded-[10px] bg-gradient-to-b from-transparent to-black/40 scale-y-[-1]" />
                </div>

                {/* Loading text */}
                <p className="absolute inset-0 flex items-center justify-center text-white text-xs font-[Arial,Helvetica,sans-serif] tracking-[5px] mix-blend-difference text-shadow-sm m-0 leading-[30px]">
                    Loading....
                    <span className="inline-block w-2 h-2 ml-1 bg-white rounded-full animate-pulse" />
                </p>
            </div>
        </div>
    );
}

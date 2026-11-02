'use client';

import React from 'react';
import Link from 'next/link';
import { 
Video, 
Code2, 
Camera, 
Sparkles, 
Palette, 
Film, 
Cpu, 
ArrowRight,
Monitor
} from 'lucide-react';

export default function SplashScreen() {
return (
<main className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 overflow-hidden bg-[#0e0d0c] text-[#f5f2eb]">
    
    {/* Dynamic Floating/Tiled Pattern Background */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.04] grid grid-cols-4 md:grid-cols-6 gap-8 p-8 justify-items-center items-center select-none">
    <Video className="w-16 h-16" />
    <Code2 className="w-16 h-16" />
    <Camera className="w-16 h-16" />
    <Palette className="w-16 h-16" />
    <Film className="w-16 h-16" />
    <Cpu className="w-16 h-16" />
    <Monitor className="w-16 h-16" />
    <Sparkles className="w-16 h-16" />
    <Camera className="w-16 h-16" />
    <Video className="w-16 h-16" />
    <Code2 className="w-16 h-16" />
    <Film className="w-16 h-16" />
    <Palette className="w-16 h-16" />
    <Cpu className="w-16 h-16" />
    <Video className="w-16 h-16" />
    <Code2 className="w-16 h-16" />
    <Camera className="w-16 h-16" />
    <Monitor className="w-16 h-16" />
    </div>

    {/* Radial Gradient overlay for smooth depth */}
    {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(200,131,70,0.12)_0%,transparent_70%)]" /> */}
    {/* Center Welcome Section */}
    <section className="relative z-10 max-w-2xl text-center space-y-6 my-auto">
    <div className="space-y-3">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#f5f2eb]">
        Welcome to <span className="text-[#c88346]">Footlight</span>
        </h1>
        
        <p className="text-base md:text-lg text-[#a09a90] max-w-lg mx-auto leading-relaxed">
        A unified stage for creators, developers, visual artists, and filmmakers to forge and showcase high-impact portfolios.
        </p>
    </div>

    {/* Multi-Creative Discipline Tags */}
    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-[#d8d0c5]">
        Video Production
        </span>
        <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-[#d8d0c5]">
        Software Engineering
        </span>
        <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-[#d8d0c5]">
        Photography
        </span>
        <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-[#d8d0c5]">
        Visual Design
        </span>
    </div>
    </section>

    {/* Base Action Button */}
    <footer className="relative z-10 w-full max-w-xs text-center">
    <Link
        href="/signup"
        className="group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#c88346] hover:bg-[#b07138] text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-[#c88346]/20 active:scale-[0.98]"
    >
        <span>Explore Showcase</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
    </footer>
</main>
);
}
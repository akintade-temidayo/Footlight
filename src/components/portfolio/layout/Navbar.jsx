'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function PortfolioNavbar({ user }) {
const [isMobileOpen, setIsMobileOpen] = useState(false);

const handle = user?.handle || '';
const aboutHref = handle ? `/${handle}/about` : '/about';
const contactHref = handle ? `/${handle}/contact` : '/contact';
const resumeDownloadHref = handle ? `/api/public/${handle}/resume` : '';

const navLinks = [
    { label: 'Projects', href: handle ? `/${handle}/projects` : '/projects' },
    { label: 'Experience', href: handle ? `/${handle}/experience` : '/experience' },
    { label: 'Education', href: handle ? `/${handle}/education` : '/education' },
    { label: 'Certifications', href: handle ? `/${handle}/certifications` : '/certifications' },
    { label: 'Services', href: handle ? `/${handle}/services` : '/services' },
    { label: 'Reviews', href: handle ? `/${handle}/testimonials` : '/testimonials' },
];

return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-(--bg-main)/80 border-b border-(--border-subtle) transition-colors">
    <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* Profile / Brand Header  */}
        <Link href={aboutHref} className="flex items-center gap-3 group" title="View About Page">
        <Image
            src="/footlight-icon.svg"
            alt="Footlight"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg object-contain"
        />
        {user?.avatarUrl || user?.avatar ? (
            <Image
            src={user?.avatarUrl || user?.avatar}
            alt={user.name || 'User Avatar'}
            unoptimized
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border border-(--border-subtle) group-hover:border-(--accent-warm) transition-colors"
            />
        ) : (
            <div className="w-10 h-10 rounded-full bg-(--accent-warm) text-white font-bold flex items-center justify-center text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
        )}
        <span className="font-serif font-bold text-base text-(--text-primary) group-hover:text-(--accent-warm) transition-colors">
            {user?.name || 'Portfolio'}
        </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link) => (
            <Link
            key={link.label}
            href={link.href}
            className="text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            >
            {link.label}
            </Link>
        ))}
        </nav>

        {/* Desktop Contact CTA */}
        <div className="hidden md:flex items-center gap-2">
        {user?.resumeUrl && (
            <a href={`${resumeDownloadHref}?view=1`} target="_blank" rel="noopener noreferrer" className="px-4 py-3.5 rounded-xl text-xs font-semibold border border-(--border-subtle) text-(--text-primary) hover:border-(--accent-warm) transition-colors">
                View CV
            </a>
        )}
        <Link
            href={contactHref}
            className="px-6 py-3.5 rounded-xl text-xs font-semibold bg-(--accent-warm) text-(--text-primary) flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-sm"
        >
            <span>Hire me</span>
            <ArrowUpRight className="w-4 h-4" />
        </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
        type="button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden p-2 rounded-lg border border-(--border-subtle) bg-(--bg-surface) text-(--text-primary)"
        aria-label="Toggle menu"
        >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Dropdown Drawer */}
        {isMobileOpen && (
        <div className="absolute top-20 left-0 right-0 p-6 bg-(--bg-surface) border-b border-(--border-subtle) shadow-2xl flex flex-col gap-4 md:hidden font-sans">
            <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
        <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-medium text-(--text-primary) hover:text-(--accent-warm) py-2 border-b border-(--border-subtle)/50"
                >
                {link.label}
                </Link>
            ))}
            </div>

            <Link
            href={contactHref}
            onClick={() => setIsMobileOpen(false)}
            className="w-full mt-2 px-6 py-3.5 rounded-xl text-xs font-semibold bg-(--accent-warm) text-(--text-primary) flex items-center justify-center gap-2 shadow-sm"
            >
            <span>Hire me</span>
            <ArrowUpRight className="w-4 h-4" />
        </Link>
            {user?.resumeUrl && (
            <div className="grid grid-cols-1 gap-2">
                <a href={`${resumeDownloadHref}?view=1`} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileOpen(false)} className="rounded-xl border border-(--border-subtle) px-4 py-3 text-center text-xs font-semibold text-(--text-primary)">
                View CV
                </a>
            </div>
            )}
        </div>
        )}
    </div>
    </header>
);
}

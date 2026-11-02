'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowUp, Heart, Send } from 'lucide-react';
import {
FaYoutube,
FaInstagram,
FaLinkedin,
FaTwitter,
FaGithub,
FaFacebook,
FaTiktok,
FaGlobe,
} from 'react-icons/fa';

export default function Footer({ user }) {
const currentYear = new Date().getFullYear();
const [showScrollTop, setShowScrollTop] = useState(false);
const contactHref = user?.handle ? `/${user.handle}/contact` : '/contact';

// Dynamic role detection: grabs first item in expertise or falls back to 'Developer / Creator'
const primaryRole =
user?.expertise && user.expertise.length > 0
    ? user.expertise[0]
    : user?.title || user?.role || 'Developer & Creator';

// Detect scroll position to show/hide floating button
useEffect(() => {
const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
};

window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

const scrollToTop = () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
};

const socialIcons = {
youtube: <FaYoutube className="w-4 h-4" />,
instagram: <FaInstagram className="w-4 h-4" />,
linkedin: <FaLinkedin className="w-4 h-4" />,
twitter: <FaTwitter className="w-4 h-4" />,
x: <FaTwitter className="w-4 h-4" />,
github: <FaGithub className="w-4 h-4" />,
facebook: <FaFacebook className="w-4 h-4" />,
tiktok: <FaTiktok className="w-4 h-4" />,
};

// Filter out empty or missing social links
const activeSocials = user?.socialLinks
? Object.entries(user.socialLinks).filter(
    ([_, url]) => typeof url === 'string' && url.trim() !== ''
    )
: [];

return (
<footer id="contact" className="border-t border-(--border-subtle) bg-(--bg-main) transition-colors relative">
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-10 sm:py-12 space-y-6 sm:space-y-8">
    
    {/* Brand Info & Dynamic Socials */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
        <div className="flex items-center gap-3">
        <Image
            src="/footlight-icon.svg"
            alt="Footlight"
            width={44}
            height={44}
            className="w-11 h-11 rounded-lg object-contain"
        />
        <div className="space-y-1">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-(--text-primary)">
            {user?.name || 'Portfolio'}
        </h3>
        {/* Dynamic Role / Expertise */}
        <p className="text-xs text-(--text-secondary) font-medium">
            {primaryRole}
        </p>
        </div>
        </div>

        {/* Social Icons List */}
        {activeSocials.length > 0 && (
        <div className="flex items-center gap-2.5 flex-wrap">
            {activeSocials.map(([platform, url]) => {
            const key = platform.toLowerCase().trim();
            const icon = socialIcons[key] || <FaGlobe className="w-4 h-4" />;

            return (
                <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-(--border-subtle) bg-(--bg-surface) text-(--text-secondary) hover:text-(--accent-warm) hover:border-(--accent-warm) flex items-center justify-center transition-colors"
                title={`Visit ${platform}`}
                >
                {icon}
                </a>
            );
            })}
        </div>
        )}
    </div>

    {/* Copyright Bar */}
    <div className="border-t border-(--border-subtle) pt-6 flex justify-center sm:justify-end text-xs text-(--text-secondary)">
        <p>© {currentYear} {user?.name || 'Creator'}. All rights reserved.</p>
    </div>
    </div>

    {/* Floating Back to Top FAB */}
    <button
    type="button"
    onClick={scrollToTop}
    aria-label="Back to top"
    className={`fixed bottom-6 right-6 z-50 p-3 sm:p-3.5 rounded-full border border-(--border-subtle) bg-(--bg-surface) text-(--text-primary) shadow-2xl hover:border-(--accent-warm) hover:text-(--accent-warm) transition-all duration-300 cursor-pointer flex items-center justify-center ${
        showScrollTop
        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
    }`}
    >
    <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
</footer>
);
}
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import { FaHandshake } from "react-icons/fa";

export default function BentoHero({ user }) {
if (!user) return null;

const name = user.name || 'Anonymous Creator';
const title = user.title || user.headline || 'Digital Creator & Builder';
const userBio = user?.bio || '';
const userAvatar = user?.avatarUrl || '';
const email = user.email || '';
const contactHref = user?.handle ? `/${user.handle}/contact` : '/contact';

// Merge and deduplicate skills/expertise tags
const expertiseList = Array.isArray(user?.expertise) ? user.expertise : [];
const skillsList = Array.isArray(user?.skills) ? user.skills : [];
const tags = Array.from(new Set([...expertiseList, ...skillsList]));

return (
<section id="hero" className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* 1. Main Bio Box (Spans 2 Columns) */}
    <div 
    className="md:col-span-2 rounded-2xl p-6 sm:p-8 border flex flex-col justify-between gap-6 transition-all shadow-sm"
    style={{ 
        backgroundColor: 'var(--bg-surface)', 
        borderColor: 'var(--border-subtle)' 
    }}
    >
    <div className="space-y-4">
        {/* User Profile Info */}
        <div className="flex items-start gap-4">
        {userAvatar && (
            <div 
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border shrink-0"
            style={{ borderColor: 'var(--border-subtle)' }}
            >
            <Image
                src={userAvatar}
                unoptimized
                alt={name}
                fill
                sizes="64px"
                className="object-cover"
            />
            </div>
        )}

        <div className="space-y-1">
            <h1 
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
            >
            {name}
            </h1>
            <p 
            className="text-sm font-medium"
            style={{ color: 'var(--accent-warm)' }}
            >
            {user?.expertise?.[0] || user?.title || title}
            </p>
        </div>
        </div>

        {/* Bio text */}
        {userBio && (
        <p 
            className="text-xs sm:text-sm leading-relaxed max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
        >
            {userBio}
        </p>
        )}

        {/* Inline Skills list */}
        {tags.length > 0 && (
        <p
            className="text-xs font-medium tracking-wide pt-1 flex flex-wrap gap-2 items-center"
            style={{ color: 'var(--text-secondary)' }}
        >
            {tags.map((tag, idx) => (
            <span key={idx} className="flex items-center gap-2">
                <span>{tag}</span>
                {idx < tags.length - 1 && (
                <span className="opacity-40 font-light">|</span>
                )}
            </span>
            ))}
        </p>
        )}
    </div>

    {/* Hero Actions */}
    {email && (
        <div className="pt-2 flex items-center gap-3">
        <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: 'var(--accent-warm)' }}
        >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
        </a>
        </div>
    )}
    </div>

    {/* 2. Side Card / Quick CTA Box (Spans 1 Column) */}
    <div 
    className="rounded-2xl p-6 border flex flex-col justify-between gap-6 shadow-sm"
    style={{ 
        backgroundColor: 'var(--bg-surface)', 
        borderColor: 'var(--border-subtle)' 
    }}
    >
    <div className="space-y-3">
        <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center border"
        style={{ 
            backgroundColor: 'var(--bg-main)', 
            borderColor: 'var(--border-subtle)',
            color: 'var(--accent-warm)' 
        }}
        >
        <FaHandshake className="w-5 h-5" />
        </div>

        <div>
        <h3 
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: 'var(--text-secondary)' }}
        >
            Collaboration
        </h3>
        <p 
            className="text-base font-bold mt-1"
            style={{ color: 'var(--text-primary)' }}
        >
            Let’s build something great together.
        </p>
        </div>

        <p 
        className="text-xs leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
        >
        Open for freelance projects, full-time roles, and technical consulting.
        </p>
    </div>

    <Link 
        href={contactHref}
        className="inline-flex items-center justify-between w-full p-3 rounded-xl border text-xs font-semibold transition-all hover:opacity-80"
        style={{ 
        backgroundColor: 'var(--bg-main)', 
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)' 
        }}
    >
        <span>Let&apos;s connect</span>
        <ArrowUpRight className="w-4 h-4" />
    </Link>
    </div>
</section>
);
}
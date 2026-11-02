'use client';

import React from 'react';
import Image from 'next/image';

export default function ModernHero({ user }) {
const userName = user?.name || '';
const userAvatar = user?.avatarUrl || '';
const userBio = user?.bio || '';
const primaryRole = user?.expertise?.[0] || '';

return (
    <section id="about" className="text-center max-w-3xl mx-auto space-y-5 py-12 px-4 w-full overflow-hidden">
    
    {/* Profile Image / Avatar */}
    <div className="relative w-24 h-24 mx-auto rounded-full bg-(--accent-warm) overflow-hidden flex items-center justify-center font-bold text-[#1c1917] text-3xl shrink-0 border-2 border-(--border-subtle) shadow-md">
        {userAvatar ? (
        <Image 
            src={userAvatar}
        unoptimized
            alt={userName} 
            fill 
            loading="eager"
            sizes="96px" 
            className="object-cover" 
        />
        ) : (
        userName.charAt(0).toUpperCase()
        )}
    </div>

    {/* Name & Primary Role */}
    <div className="space-y-1 max-w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-(--text-primary) wrap-break-words">
        {userName}
        </h1>
        {primaryRole && (
        <p className="text-sm md:text-base font-semibold text-(--accent-warm) wrap-break-words">
            {primaryRole}
        </p>
        )}
    </div>

    {/* Dynamic Bio */}
    {userBio ? (
        <p className="text-base md:text-lg text-(--text-secondary) leading-relaxed max-w-2xl mx-auto wrap-break-words">
        {userBio}
        </p>
    ) : (
        <p className="text-sm text-(--text-secondary) italic">
        No bio provided yet.
        </p>
    )}

    {/* Modern Responsive Skills (Wraps cleanly on small screens) */}
    {user?.skills && user.skills.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-1.5 text-xs font-bold uppercase tracking-widest text-(--text-secondary) pt-2 max-w-full">
        {user.skills.map((skill, index) => (
            <React.Fragment key={index}>
            <span className="hover:text-(--accent-warm) transition-colors whitespace-nowrap">
                {skill}
            </span>
            {index < user.skills.length - 1 && (
                <span className="text-(--border-subtle) font-normal">|</span>
            )}
            </React.Fragment>
        ))}
        </div>
    )}
    </section>
);
}

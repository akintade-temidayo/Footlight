'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
Film,
FolderTree,
Star,
Briefcase,
User,
LogOut,
LayoutDashboard,
Menu,
X,
MessageSquarePlus,
History,
Globe,
GraduationCap,
FileText,
} from 'lucide-react';
import { FaInfoCircle } from 'react-icons/fa';
import { LiaCertificateSolid } from 'react-icons/lia';
import SidebarThemeSwitcher from '@/components/ui/SidebarThemeSwitcher';
import OnboardingTour from '@/components/layout/OnboardingTour';
import { OnboardingProvider } from '@/context/OnboardingContext';
import RequestDrawerContent from '@/components/admin/RequestDrawerContent';

export default function AdminLayout({ children, user: initialUser }) {
const [currentUser, setCurrentUser] = useState(initialUser || null);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isRequestDrawerOpen, setIsRequestDrawerOpen] = useState(false);
const [runTour, setRunTour] = useState(false);
const [tourKey, setTourKey] = useState(0);
const pathname = usePathname();
const router = useRouter();

const isAuthPage =
    pathname.includes('/admin/login') ||
    pathname.includes('/admin/forgot-password') ||
    pathname.includes('/admin/reset-password');

React.useEffect(() => {
    async function fetchUser() {
    try {
        const res = await fetch('/api/admin/profile');
        const data = await res.json();
        if (data.success && data.user) {
        setCurrentUser(data.user);
        } else {
        setCurrentUser(null);
        }
    } catch (error) {
        console.error('Failed to fetch sidebar user:', error);
        setCurrentUser(null);
    }
    }

    fetchUser();
}, [pathname]);

// Reset the mobile menu whenever the route changes
const [prevPathname, setPrevPathname] = useState(pathname);
if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
}

React.useEffect(() => {
    if (isAuthPage || !currentUser) return;

    if (window.innerWidth < 768) return;

    const userId = currentUser._id || currentUser.id;
    const key = `footlight_onboarding_${userId || 'guest'}`;
    const hasSeenGuide = localStorage.getItem(key);

    if (!hasSeenGuide) {
    const timer = window.setTimeout(() => {
        setRunTour(true);
    }, 300);

    return () => window.clearTimeout(timer);
    }
}, [currentUser, isAuthPage]);

const handleLogout = async () => {
    try {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    router.push('/admin/login');
    } catch (err) {
    console.error('Logout failed:', err);
    }
};

const userName = currentUser?.name || 'Guest User';
const userAvatar = currentUser?.avatarUrl || '';
const userInitial = userName.charAt(0).toUpperCase();

const navItems = [
    { label: 'Overview', href: '/admin/overview', icon: LayoutDashboard, tourId: 'tour-overview' },
    { label: 'Public Link', href: '/admin/public-link', icon: Globe, tourId: 'tour-public-link' },
    { label: 'Projects', href: '/admin/projects', icon: Film, tourId: 'tour-projects' },
    { label: 'Experience', href: '/admin/experience', icon: History, tourId: 'tour-experience' },
    { label: 'Education', href: '/admin/education', icon: GraduationCap, tourId: 'tour-education' },
    { label: 'Services', href: '/admin/services', icon: Briefcase, tourId: 'tour-services' },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree, tourId: 'tour-categories' },
    { label: 'Certifications', href: '/admin/certifications', icon: LiaCertificateSolid, tourId: 'tour-certifications' },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Star, tourId: 'tour-testimonials' },
    { label: 'Resume / CV', href: '/admin/resume', icon: FileText },
];

const openOnboarding = () => {
    if (window.innerWidth < 768) {
    setIsMobileMenuOpen(true);
    window.requestAnimationFrame(() => {
        setTourKey((currentKey) => currentKey + 1);
        setRunTour(true);
    });
    return;
    }
    setTourKey((currentKey) => currentKey + 1);
    setRunTour(true);
};

const handleTourEnd = () => {
    setRunTour(false);
    if (window.innerWidth < 768) {
    setIsMobileMenuOpen(false);
    }
    const userId = currentUser?._id || currentUser?.id;
    const key = `footlight_onboarding_${userId || 'guest'}`;
    localStorage.setItem(key, 'true');
};

const renderNavList = () => (
    <nav className="space-y-1">
    {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        if (isAuthPage || !currentUser) {
        return (
            <div
            key={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-(--text-secondary) opacity-40 cursor-not-allowed select-none"
            >
            <Icon className="w-4 h-4 text-(--text-secondary)" />
            <span>{item.label}</span>
            </div>
        );
        }

        return (
        <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            data-tour={item.tourId}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            isActive
                ? 'bg-(--bg-surface-hover) text-(--text-primary) font-medium'
                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-surface-hover)'
            }`}
        >
            <Icon className={`w-4 h-4 ${isActive ? 'text-(--accent-warm)' : 'text-(--text-secondary)'}`} />
            <span>{item.label}</span>
        </Link>
        );
    })}
    </nav>
);

const renderFooterActions = () => (
    <div className="pt-4 border-t border-(--border-subtle) mt-6 md:mt-0 space-y-1">
    <SidebarThemeSwitcher />

    {!isAuthPage && currentUser && (
        <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
        >
        <LogOut className="w-4 h-4 text-red-400" />
        <span>Logout</span>
        </button>
    )}
    </div>
);

return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-(--bg-main) text-(--text-primary) flex flex-col md:flex-row transition-colors duration-200 relative">
    {/* Mobile Top Navigation Header */}
    <div className="md:hidden sticky top-0 z-40 w-full bg-(--bg-surface) border-b border-(--border-subtle)">
        <div className="flex items-center justify-between p-4 relative">
        <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg bg-(--accent-warm) overflow-hidden flex items-center justify-center font-bold text-[#1c1917] text-sm shrink-0 border border-(--border-subtle)">
            {userAvatar ? (
                <Image src={userAvatar} alt={userName} fill sizes="32px" className="object-cover" unoptimized />
            ) : (
                userInitial
            )}
            </div>
            <div>
            <h2 className="font-semibold text-sm text-(--text-primary) line-clamp-1">{userName}</h2>
            <span className="text-[10px] text-(--text-secondary) block -mt-0.5">Admin Portal</span>
            </div>
            {!isAuthPage && currentUser && (
            <button
                type="button"
                onClick={openOnboarding}
                className="p-1.5 rounded-lg text-(--text-secondary) hover:text-(--accent-warm) transition-colors"
                title="Restart onboarding guide"
                aria-label="Restart onboarding guide"
                data-tour="tour-info-icon"
            >
                <FaInfoCircle className="w-4 h-4" />
            </button>
            )}
        </div>

        <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-(--bg-main) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle) transition-colors"
            aria-label="Toggle menu"
        >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 p-6 bg-(--bg-surface) border-b border-(--border-subtle) shadow-2xl flex flex-col gap-4 max-h-[calc(100vh-80px)] overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
                {renderNavList()}
            </div>
            {renderFooterActions()}
            </div>
        )}
        </div>
    </div>

    {/* Desktop Sidebar Navigation */}
    <aside className="hidden md:flex w-64 md:h-screen md:overflow-hidden bg-(--bg-surface) border-r border-(--border-subtle) p-6 flex-col shrink-0">
        <div className="flex flex-1 min-h-0 flex-col">
        {isAuthPage || !currentUser ? (
            <div className="flex items-center gap-3 mb-8 p-2 -mx-2 opacity-50 cursor-not-allowed">
            <div className="relative w-9 h-9 rounded-lg bg-(--accent-warm) overflow-hidden flex items-center justify-center font-bold text-[#1c1917] shrink-0 border border-(--border-subtle)">
                {userAvatar ? (
                <Image src={userAvatar} alt={userName} fill sizes="36px" className="object-cover" unoptimized />
                ) : (
                userInitial
                )}
            </div>
            <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-sm text-(--text-primary) truncate">{userName}</h2>
                <span className="text-xs text-(--text-secondary) block truncate">Portal Locked</span>
            </div>
            </div>
        ) : (
            <div className="flex items-center gap-2 mb-8 p-2 -mx-2 rounded-xl hover:bg-(--bg-surface-hover) transition-colors group" data-tour="tour-profile-row">
            <Link href="/admin/profile" className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative w-9 h-9 rounded-lg bg-(--accent-warm) overflow-hidden flex items-center justify-center font-bold text-[#1c1917] shrink-0 border border-(--border-subtle)">
                {userAvatar ? (
                    <Image src={userAvatar} alt={userName} fill sizes="36px" className="object-cover" unoptimized />
                ) : (
                    userInitial
                )}
                </div>
                <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-sm text-(--text-primary) group-hover:text-(--accent-warm) transition-colors truncate">
                    {userName}
                </h2>
                <span className="text-xs text-(--text-secondary) block truncate">View Profile</span>
                </div>
            </Link>
            <button
                type="button"
                onClick={openOnboarding}
                className="p-1.5 rounded-lg text-(--text-secondary) hover:text-(--accent-warm) transition-colors shrink-0"
                title="Restart onboarding guide"
                aria-label="Restart onboarding guide"
                data-tour="tour-info-icon"
            >
                <FaInfoCircle className="w-4 h-4" />
            </button>
            </div>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-1">
            {renderNavList()}
        </div>
        </div>

        {renderFooterActions()}
    </aside>

    {/* Main Content Area */}
    <main className="flex-1 md:h-screen p-4 md:p-10 overflow-y-auto no-scrollbar">
        <div className="max-w-5xl mx-auto">
        <OnboardingProvider openOnboarding={openOnboarding}>{children}</OnboardingProvider>
        </div>
    </main>

    {/* Floating Action Button */}
    {!isAuthPage && currentUser && (
        <button
        type="button"
        onClick={() => setIsRequestDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-(--accent-warm) text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
        title="Send Request"
        aria-label="Open Request Form"
        data-tour="tour-send-request"
        >
        <MessageSquarePlus className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-700 ease-in-out text-xs font-semibold group-hover:ml-2">
            Send Request
        </span>
        </button>
    )}

    {/* Slide-over Side Drawer Container */}
    {isRequestDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
        <div
            className="fixed inset-0"
            onClick={() => setIsRequestDrawerOpen(false)}
        />
        <div className="relative w-full max-w-lg h-full bg-(--bg-surface) border-l border-(--border-subtle) shadow-2xl p-6 sm:p-8 overflow-y-auto z-10 animate-in slide-in-from-right duration-700 [scrollbar:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
            type="button"
            onClick={() => setIsRequestDrawerOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-lg bg-(--bg-main) border border-(--border-subtle) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            >
            <X className="w-5 h-5" />
            </button>
            <RequestDrawerContent onClose={() => setIsRequestDrawerOpen(false)} />
        </div>
        </div>
    )}

    {!isAuthPage && currentUser && (
        <OnboardingTour key={tourKey} run={runTour} onEnd={handleTourEnd} />
    )}
    </div>
);
}

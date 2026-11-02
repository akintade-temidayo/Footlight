'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import {
Film, FolderTree, Star, Briefcase, UserPen, Mail, Phone,
AlertTriangle, Globe,
} from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from 'sonner';

const SOCIAL_ICONS = { linkedin: FaLinkedin, instagram: FaInstagram, twitter: FaTwitter, github: FaGithub, website: Globe };

function EmptyField({ label }) {
return (
<div>
    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</p>
    <p className="text-sm italic mt-0.5" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>Not set yet</p>
</div>
);
}

export default function ProfilePage() {
const router = useRouter();

const [profile, setProfile] = useState(null);
const [stats, setStats] = useState({ projectsCount: 0, servicesCount: 0, categoriesCount: 0, testimonialsCount: 0 });
const [isLoading, setIsLoading] = useState(true);
const [isClearContentModalOpen, setIsClearContentModalOpen] = useState(false);
const [isClearingContent, setIsClearingContent] = useState(false);
const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
const [clearProgress, setClearProgress] = useState(0);
const [clearStatus, setClearStatus] = useState('Preparing...');
const [clearWasCancelled, setClearWasCancelled] = useState(false);
const clearAbortControllerRef = useRef(null);
const clearCancelledRef = useRef(false);
const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
const [isDeactivating, setIsDeactivating] = useState(false);

useEffect(() => {
async function fetchProfileData() {
    try {
    setIsLoading(true);
    const res = await fetch('/api/admin/profile');
    if (!res.ok) throw new Error('Failed to fetch profile data');

    const data = await res.json();
    setProfile(data.user || null);

    const countData = data.counts || data.stats || {};
    setStats({
        projectsCount: countData.projects ?? countData.projectsCount ?? 0,
        servicesCount: countData.services ?? countData.servicesCount ?? 0,
        categoriesCount: countData.categories ?? countData.categoriesCount ?? 0,
        testimonialsCount: countData.testimonials ?? countData.testimonialsCount ?? 0,
    });
    } catch (err) {
    console.error('Profile fetch error:', err);
    } finally {
    setIsLoading(false);
    }
}

fetchProfileData();
}, []);

const handleClearContent = async () => {
setIsClearContentModalOpen(false);
setIsProgressModalOpen(true);
setIsClearingContent(true);
setClearProgress(0);
setClearStatus('Preparing to delete portfolio content...');
setClearWasCancelled(false);
clearCancelledRef.current = false;
clearAbortControllerRef.current = new AbortController();

const stages = [
    { key: 'projects', label: 'Deleting projects...', progress: 12 },
    { key: 'categories', label: 'Deleting categories...', progress: 25 },
    { key: 'services', label: 'Deleting services...', progress: 38 },
    { key: 'testimonials', label: 'Deleting testimonials...', progress: 52 },
    { key: 'experience', label: 'Deleting experience entries...', progress: 66 },
    { key: 'education', label: 'Deleting education entries...', progress: 80 },
    { key: 'certifications', label: 'Deleting certifications...', progress: 94 },
];

try {
    for (let index = 0; index < stages.length; index += 1) {
    if (clearCancelledRef.current) break;

    const stage = stages[index];
    setClearStatus(stage.label);
    setClearProgress(stage.progress);

    const res = await fetch('/api/admin/profile/content', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collections: [stage.key] }),
        signal: clearAbortControllerRef.current.signal,
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
        throw new Error(data.message || `Failed to delete ${stage.key}.`);
    }

    await new Promise((resolve) => window.setTimeout(resolve, 520));
    }

    if (!clearCancelledRef.current) {
    setClearProgress(100);
    setClearStatus('Portfolio content deleted.');
    setStats({ projectsCount: 0, servicesCount: 0, categoriesCount: 0, testimonialsCount: 0 });
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setIsProgressModalOpen(false);
    toast.success('All portfolio content cleared successfully.');
    }
} catch (err) {
    if (err.name !== 'AbortError') {
    console.error('Clear content error:', err);
    toast.error(err.message || 'An unexpected error occurred while clearing content.');
    setIsProgressModalOpen(false);
    }
} finally {
    setIsClearingContent(false);
}
};

const handleCancelClearContent = () => {
if (clearProgress >= 80 || !isClearingContent) return;
clearCancelledRef.current = true;
clearAbortControllerRef.current?.abort();
setClearWasCancelled(true);
setClearStatus('Deletion cancelled. Your remaining content was kept.');
window.setTimeout(() => setIsProgressModalOpen(false), 900);
};

const handleDeactivateAccount = async () => {
try {
    setIsDeactivating(true);
    const res = await fetch('/api/admin/profile/deactivate', { method: 'DELETE' });
    const data = await res.json();
    if (res.ok && data.success) {
    toast.error('Profile deleted successfully.');
    router.push('/admin/login');
    } else {
    toast.error(data.message || 'Failed to deactivate account.');
    }
} catch (err) {
    console.error('Deactivation error:', err);
    toast.error('An unexpected error occurred during deactivation.');
} finally {
    setIsDeactivating(false);
}
};

if (isLoading || !profile) {
return (
    <div className="py-20 text-center animate-pulse" style={{ color: 'var(--text-secondary)' }}>
    Loading profile & stats...
    </div>
);
}

const socialEntries = Object.entries(profile.socialLinks || {}).filter(([, url]) => url);

return (
<div className="space-y-8 pb-12">
    <div className="flex items-start justify-between gap-4">
    <div>
        <h1 className="text-2xl font-serif font-medium" style={{ color: 'var(--text-primary)' }}>Talent Profile</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
        Your personal details, public bio, and content performance.
        </p>
    </div>

    <button
        onClick={() => router.push('/admin/profile/edit')}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shrink-0"
        style={{ backgroundColor: 'var(--accent-warm)', color: 'var(--bg-main)' }}
    >
        <UserPen className="w-4 h-4" />
        <span>Edit Profile</span>
    </button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
        { icon: Film, count: stats.projectsCount, label: 'Projects' },
        { icon: Briefcase, count: stats.servicesCount, label: 'Services' },
        { icon: FolderTree, count: stats.categoriesCount, label: 'Categories' },
        { icon: Star, count: stats.testimonialsCount, label: 'Testimonials' },
    ].map(({ icon: Icon, count, label }) => (
        <div
        key={label}
        className="p-5 rounded-xl border flex items-center gap-4 transition-colors"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(200, 131, 70, 0.15)', color: 'var(--accent-warm)' }}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <span className="text-2xl font-bold block" style={{ color: 'var(--text-primary)' }}>{count}</span>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        </div>
        </div>
    ))}
    </div>

    <div className="p-6 md:p-8 rounded-2xl border space-y-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
    <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6" style={{ borderColor: 'var(--border-subtle)' }}>
        <div
        className="w-24 h-24 rounded-full overflow-hidden border flex items-center justify-center"
        style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-main)' }}
        >
        {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt={profile.name || 'Profile picture'} className="w-full h-full object-cover" />
        ) : (
            <span className="text-2xl font-serif" style={{ color: 'var(--text-secondary)' }}>{profile.name?.[0] || '?'}</span>
        )}
        </div>
        <div className="text-center md:text-left">
        <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{profile.name}</h3>
        <p className="text-xs mt-1 flex items-center gap-1.5 justify-center md:justify-start" style={{ color: 'var(--text-secondary)' }}>
            <Mail className="w-3.5 h-3.5" /> {profile.email}
        </p>
        {profile.phoneNumber && (
            <p className="text-xs mt-1 flex items-center gap-1.5 justify-center md:justify-start" style={{ color: 'var(--text-secondary)' }}>
            <Phone className="w-3.5 h-3.5" /> {profile.phoneNumber}
            </p>
        )}
        </div>
    </div>

    <div>
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Public Bio</p>
        {profile.bio ? (
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{profile.bio}</p>
        ) : (
        <EmptyField label="" />
        )}
    </div>

    <div className="border-t pt-6" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Social Links</p>
        {socialEntries.length > 0 ? (
        <div className="flex flex-wrap gap-2">
            {socialEntries.map(([platform, url]) => {
            const Icon = SOCIAL_ICONS[platform] || Globe;
            return (
                <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors hover:opacity-80"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent-warm)' }}
                >
                <Icon className="w-3.5 h-3.5" /> {platform}
                </a>
            );
            })}
        </div>
        ) : (
        <EmptyField label="" />
        )}
    </div>

    <div className="border-t pt-6" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Areas of Expertise</p>
        {profile.expertise?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
            {profile.expertise.map((e) => (
            <span key={e} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>{e}</span>
            ))}
        </div>
        ) : (
        <EmptyField label="" />
        )}
    </div>

    <div>
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Skills</p>
        {profile.skills?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
            <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(200, 131, 70, 0.15)', color: 'var(--accent-warm)' }}
            >
                {s}
            </span>
            ))}
        </div>
        ) : (
        <EmptyField label="" />
        )}
    </div>
    </div>

    <div className="p-6 md:p-8 rounded-2xl border space-y-0 border-red-500/20" style={{ backgroundColor: 'var(--bg-surface)' }}>
    <div className="pb-5">
        <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" /> Danger Zone
        </h3>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Clear Portfolio Content</h4>
        <p className="text-xs mt-1 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Permanently remove all projects, categories, services, testimonials, experience, education, and certifications. Your account and profile details will remain.
        </p>
        </div>
        <button
        type="button"
        onClick={() => setIsClearContentModalOpen(true)}
        className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors shrink-0"
        >
        Clear All Content
        </button>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Deactivate Account</h4>
        <p className="text-xs mt-1 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Permanently delete your account, portfolio profile, and all portfolio content.
        </p>
        </div>
        <button
        type="button"
        onClick={() => setIsDeactivateModalOpen(true)}
        className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors shrink-0"
        >
        Deactivate Account
        </button>
    </div>
    </div>

    <Modal isOpen={isClearContentModalOpen} onClose={() => setIsClearContentModalOpen(false)} title="Clear All Portfolio Content?">
    <div className="space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Are you sure you want to permanently clear everything on your portfolio?
        </p>
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 leading-relaxed">
        This will delete projects, categories, services, testimonials, experience, education, and certifications. Your account and profile details will stay intact.
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <button type="button" onClick={() => setIsClearContentModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Cancel
        </button>
        <button
            type="button"
            onClick={handleClearContent}
            disabled={isClearingContent}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
        >
            {isClearingContent ? 'Clearing...' : 'Yes, Clear All Content'}
        </button>
        </div>
    </div>
    </Modal>

    <Modal
    isOpen={isProgressModalOpen}
    onClose={() => {
        if (clearProgress < 80) handleCancelClearContent();
    }}
    title="Clearing Portfolio Content"
    >
    <div className="space-y-5">
        <div className="flex items-center justify-between text-sm">
        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{clearStatus}</span>
        <span className="font-bold tabular-nums" style={{ color: 'var(--accent-warm)' }}>{clearProgress}%</span>
        </div>

        <div
        className="h-3 w-full rounded-full overflow-hidden border"
        style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)' }}
        aria-label="Portfolio content deletion progress"
        >
        <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${clearProgress}%`, backgroundColor: clearProgress >= 80 ? '#dc2626' : 'var(--accent-warm)' }}
        />
        </div>

        <div className="min-h-14 p-3 rounded-xl border text-xs leading-relaxed" style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
        {clearWasCancelled
            ? 'Deletion stopped. Any collections already processed were removed.'
            : clearProgress >= 80
            ? 'The cancellation window has closed. Clearing the remaining content now.'
            : 'You can cancel this process until it reaches 80%. The account and profile details will not be deleted.'}
        </div>

        <div className="flex items-center justify-end pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
            type="button"
            onClick={handleCancelClearContent}
            disabled={clearProgress >= 80 || clearWasCancelled || !isClearingContent}
            className="px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
        >
            Cancel Process
        </button>
        </div>
    </div>
    </Modal>

    <Modal isOpen={isDeactivateModalOpen} onClose={() => setIsDeactivateModalOpen(false)} title="Deactivate Account?">
    <div className="space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Are you sure you want to deactivate your account?
        </p>
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 leading-relaxed">
        This action is permanent and will completely delete all your saved projects, services, categories, and testimonials from our database.
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <button type="button" onClick={() => setIsDeactivateModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Cancel
        </button>
        <button
            type="button"
            onClick={handleDeactivateAccount}
            disabled={isDeactivating}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
        >
            {isDeactivating ? 'Deactivating...' : 'Yes, Delete Account'}
        </button>
        </div>
    </div>
    </Modal>
</div>
);
}
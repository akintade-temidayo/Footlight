'use client';

import { useRef } from 'react';
import { Loader2, User, Camera } from 'lucide-react';
import { useFileUpload } from '@/app/hooks/useFileUpload';
import Image from 'next/image';

export default function AvatarPicker({ avatarUrl, onAvatarChange }) {
const fileInputRef = useRef(null);
const { upload, isUploading, error } = useFileUpload();

const handleFileSelect = async (file) => {
if (!file) return;
const url = await upload(file);
if (url) onAvatarChange(url);
};

return (
<div className="flex flex-col items-center gap-2">
    <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    disabled={isUploading}
    className="relative w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors hover:border-(--accent-warm)"
    style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-main)' }}
    >
    {isUploading ? (
        <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--accent-warm)' }} />
    ) : avatarUrl ? (
        <Image src={avatarUrl} alt="Profile preview" className="w-full h-full object-cover" fill unoptimized />
    ) : (
        <User className="w-7 h-7" style={{ color: 'var(--text-secondary)' }} />
    )}

    <div
        className="absolute bottom-0 right-0 p-1 rounded-full"
        style={{ backgroundColor: 'var(--accent-warm)' }}
    >
        <Camera className="w-3 h-3 text-white" />
    </div>

    <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        className="hidden"
    />
    </button>

    <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
    {isUploading ? 'Uploading...' : 'Profile photo (optional)'}
    </span>

    {error && <span className="text-[11px] text-red-400">{error}</span>}
</div>
);
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AvatarPicker from '@/components/auth/AvatarPicker';
import { 
Flame, 
Eye, 
EyeOff, 
Video, 
Code2, 
Camera, 
Palette, 
Film, 
Cpu, 
Sparkles, 
Monitor 
} from 'lucide-react';

export default function SplashSignUpPage() {
const router = useRouter();
const [formData, setFormData] = useState({
name: '',
email: '',
phoneNumber: '',
password: '',
avatarUrl: '',
});

const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

try {
    const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');

    
    router.push('/admin/login');
} catch (err) {
    setError(err.message);
} finally {
    setLoading(false);
}
};

return (
<div className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 overflow-hidden bg-[#0e0d0c] text-[#f5f2eb]">
    
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
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(200,131,70,0.12)_0%,transparent_70%)]" />

    {/* Form Card Content */}
    <div className="relative z-10 w-full max-w-md text-center space-y-3 mb-6">
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c88346]/10 border border-[#c88346]/20 text-xs text-[#c88346] font-medium">
        <Sparkles className="w-3.5 h-3.5" /> Footlight Creator Network
    </div>
    <h1 className="text-3xl font-serif font-bold text-[#f5f2eb]">
        Claim Your Portfolio
    </h1>
    <p className="text-xs text-[#a09a90]">
        Showcase your projects, services, and client reviews under your custom link.
    </p>
    </div>

    <div className="relative z-10 w-full max-w-md p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md space-y-6 shadow-2xl">
    <form onSubmit={handleSignUp} className="space-y-4">
        <AvatarPicker
        avatarUrl={formData.avatarUrl}
        onAvatarChange={(url) => setFormData({ ...formData, avatarUrl: url })}
        />

        <div>
        <label className="text-xs font-medium text-[#a09a90] mb-1.5 block text-left">
            Full Name / Brand Name
        </label>
        <Input
            type="text"
            placeholder="e.g. Creator OG"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
        />
        </div>

        <div>
        <label className="text-xs font-medium text-[#a09a90] mb-1.5 block text-left">
            Email Address
        </label>
        <Input
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
        />
        </div>

        <div>
        <label className="text-xs font-medium text-[#a09a90] mb-1.5 block text-left">
            Phone Number (11 Digits)
        </label>
        <Input
            type="tel"
            placeholder="08012345678"
            maxLength={11}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
            required
        />
        </div>

        <div>
        <label className="text-xs font-medium text-[#a09a90] mb-1.5 block text-left">
            Password
        </label>
        <div className="relative">
            <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            minLength={8}
            className="pr-10"
            required
            />
            <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a09a90] hover:text-[#f5f2eb] transition-colors"
            tabIndex={-1}
            >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
        </div>
        </div>

        {error && <p className="text-xs text-red-400 text-left">{error}</p>}

        <Button 
        type="submit" 
        isLoading={loading} 
        className="w-full py-3 bg-[#c88346] hover:bg-[#b07138] text-white font-medium"
        >
        Create Portfolio Space
        </Button>
    </form>

    <div className="text-center pt-2 border-t border-white/10">
        <p className="text-xs text-[#a09a90] flex items-center justify-center gap-1.5">
        Already have an account?
        <Link href="/admin/login" className="font-semibold text-[#c88346] hover:underline inline-flex items-center gap-1">
            Sign In <Flame className="w-3.5 h-3.5 text-[#c88346]" />
        </Link>
        </p>
    </div>
    </div>
</div>
);
}

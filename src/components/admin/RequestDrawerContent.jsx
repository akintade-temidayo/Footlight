'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export default function RequestDrawerContent({ onClose }) {
const [requestType, setRequestType] = useState('Theme Request');
const [description, setDescription] = useState('');
const [user, setUser] = useState(null);

const [state, handleSubmit] = useForm('xppakpdq');

useEffect(() => {
    async function loadUser() {
    try {
        const res = await fetch('/api/admin/profile');
        const data = await res.json();
        if (data.success) setUser(data.user);
    } catch (err) {
        console.error('Failed to load user info for request drawer', err);
    }
    }
    loadUser();
}, []);

return (
    <div className="space-y-6 pt-4">
    {/* Header */}
    <div className="space-y-2 pr-8">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-(--text-primary)">
        Request Features or Themes
        </h2>
        <p className="text-xs text-(--text-secondary)">
        &ldquo;Ask and you shall receive&rdquo; <br />
        Need a specific color scheme, page layout, or something else? Drop your request below!
        </p>
    </div>

    {state.succeeded ? (
        <div className="py-12 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
        <h3 className="text-lg font-serif font-bold text-(--text-primary)">
            Request Sent Successfully!
        </h3>
        <p className="text-xs text-(--text-secondary) max-w-xs mx-auto">
            Thanks for submitting your ideas! Your message was delivered straight to our mailbox.
        </p>
        <div className="flex gap-3 justify-center pt-2">
            <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-(--bg-main) border border-(--border-subtle) text-(--text-primary) text-xs font-medium hover:bg-(--bg-surface-hover) transition-all"
            >
            Close
            </button>
            <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-xl bg-(--accent-warm) text-white font-semibold text-xs hover:opacity-90 transition-all cursor-pointer"
            >
            Send Another
            </button>
        </div>
        </div>
    ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="senderName" value={user?.name || 'Footlight User'} />
        <input type="hidden" name="senderEmail" value={user?.email || 'No email provided'} />
        <input type="hidden" name="userHandle" value={user?.handle || 'N/A'} />
        <input type="hidden" name="requestType" value={requestType} />

        {/* User Meta Card */}
        {user && (
            <div className="p-3 rounded-xl border border-(--border-subtle) bg-(--bg-main) flex items-center justify-between text-xs">
            <div className="truncate pr-2">
                <span className="text-(--text-secondary) block text-[10px]">Sending as:</span>
                <span className="font-semibold text-(--text-primary) truncate block">
                {user.name}
                </span>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-(--accent-warm)/10 text-(--accent-warm) font-mono text-[10px] shrink-0">
                @{user.handle}
            </span>
            </div>
        )}

        {/* Type Selector */}
        <div className="space-y-2">
            <label className="text-xs font-semibold text-(--text-primary)">
            What type of request is this?
            </label>
            <div className="flex flex-col gap-2">
            {[
                { id: 'Theme Request', label: 'New Theme Color' },
                { id: 'Layout Request', label: 'New Template / Layout' },
                { id: 'Others Request', label: 'Others' },
            ].map((type) => (
                <button
                key={type.id}
                type="button"
                onClick={() => setRequestType(type.id)}
                className={`py-2.5 px-3 text-xs font-medium rounded-xl border transition-all cursor-pointer text-left ${
                    requestType === type.id
                    ? 'border-(--accent-warm) bg-(--accent-warm)/10 text-(--accent-warm) font-semibold'
                    : 'border-(--border-subtle) bg-(--bg-main) text-(--text-secondary) hover:border-(--accent-warm)'
                }`}
                >
                {type.label}
                </button>
            ))}
            </div>
        </div>

        {/* Message Area */}
        <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-semibold text-(--text-primary)">
            Request Details
            </label>
            <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
                requestType === 'Theme Request'
                ? 'Describe your ideal color palette...'
                : requestType === 'Layout Request'
                ? 'Describe your ideal design layout...'
                : 'Describe what you want...'
            }
            className="w-full text-xs p-3.5 rounded-xl border border-(--border-subtle) bg-(--bg-main) text-(--text-primary) focus:outline-none focus:border-(--accent-warm) transition-colors resize-none placeholder:text-(--text-secondary)"
            />
            <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-xs text-red-400 mt-1"
            />
        </div>

        {/* Actions */}
        <button
            type="submit"
            disabled={state.submitting || !description.trim()}
            className="w-full py-3 rounded-xl bg-(--accent-warm) text-white font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
            {state.submitting ? (
            <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
            </>
            ) : (
            <>
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
            </>
            )}
        </button>
        </form>
    )}
    </div>
);
}
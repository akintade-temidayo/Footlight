'use client';

import React, { useState, useEffect } from 'react';
import { Joyride, STATUS } from 'react-joyride';

const STEPS = [
{
    target: '[data-tour="tour-info-icon"]',
    title: 'Welcome to Footlight!',
    content: 'You can reopen this onboarding guide anytime by clicking this icon.',
    disableBeacon: true,
    placement: 'right',
},
{
    target: '[data-tour="tour-overview"]',
    title: 'Overview',
    content: 'Get a quick snapshot of your portfolio metrics, recent updates, color theme, and template configurations.',
    placement: 'right',
},
{
    target: '[data-tour="tour-public-link"]',
    title: 'Public Link & Live Preview',
    content: 'Copy your unique portfolio URL to share with recruiters or open Live Preview to check how your portfolio looks to visitors.',
    placement: 'bottom',
},
{
    target: '[data-tour="tour-projects"]',
    title: 'Projects',
    content: 'Upload and showcase your work—add images, video links, case study details, and live site URLs.',
    placement: 'right',
},
{
    target: '[data-tour="tour-experience"]',
    title: 'Work Experience',
    content: 'Add your career history, roles, client milestones, key achievements, and employment timelines.',
    placement: 'right',
},
{
    target: '[data-tour="tour-education"]',
    title: 'Education',
    content: 'Highlight your academic qualifications, degree programs, majors, and institutional backgrounds.',
    placement: 'right',
},
{
    target: '[data-tour="tour-services"]',
    title: 'Services',
    content: 'Set up the services you offer along with pricing ranges, deliverables, and estimated turnaround times.',
    placement: 'right',
},
{
    target: '[data-tour="tour-categories"]',
    title: 'Categories',
    content: 'Organize your projects with custom categories and tags so clients can filter your work effortlessly.',
    placement: 'right',
},
{
    target: '[data-tour="tour-certifications"]',
    title: 'Certifications',
    content: 'Display professional credentials, licenses, course completions, and verified skill badges.',
    placement: 'right',
},
{
    target: '[data-tour="tour-testimonials"]',
    title: 'Testimonials',
    content: 'Manage recommendations and client feedback before choosing which reviews display publicly.',
    placement: 'right',
},
{
    target: '[data-tour="tour-profile-nav"]',
    title: 'Profile & Settings',
    content: 'Customize your personal details, profile picture, short bio, social media handles, and contact links.',
    placement: 'right',
},
{
    target: '[data-tour="tour-theme-selector"]',
    title: 'Choose Your Theme',
    content: 'Switch the admin workspace color palette to one that feels right for your workflow. Your preference is saved automatically.',
    placement: 'right',
},
{
    target: '[data-tour="tour-send-request"]',
    title: 'Send a Request',
    content: 'Use this button anytime to open the request drawer and send a message or request from your workspace.',
    placement: 'left',
},
];

export default function OnboardingTour({ run, onEnd }) {
const [isMounted, setIsMounted] = useState(false);

// Prevents SSR hydration mismatch
useEffect(() => {
    const timeout = setTimeout(() => {
    setIsMounted(true);
    }, 0);

    return () => clearTimeout(timeout);
}, []);

const handleCallback = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
    if (onEnd) onEnd();
    }
};

if (!isMounted || !run) return null;

return (
    <Joyride
    steps={STEPS}
    run={run}
    continuous
    showSkipButton
    showProgress
    scrollToFirstStep
    callback={handleCallback}
    styles={{
        options: {
        backgroundColor: 'var(--bg-surface, #1c1917)',
        textColor: 'var(--text-primary, #f5f5f4)',
        arrowColor: 'var(--bg-surface, #1c1917)',
        primaryColor: 'var(--accent-warm, #d97706)',
        overlayColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 10000,
        },
        tooltip: {
        borderRadius: '16px',
        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
        padding: '16px 20px',
        },
        tooltipContainer: {
        textAlign: 'left',
        fontSize: '13px',
        lineHeight: '1.6',
        },
        buttonNext: {
        backgroundColor: 'var(--accent-warm, #d97706)',
        color: '#1c1917',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '8px 16px',
        outline: 'none',
        },
        buttonBack: {
        color: 'var(--text-secondary, #a8a29e)',
        fontSize: '12px',
        marginRight: '8px',
        },
        buttonSkip: {
        color: 'var(--text-secondary, #a8a29e)',
        fontSize: '12px',
        },
    }}
    />
);
}

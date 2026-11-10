'use client';

import React from 'react';
import MinimalHero from '@/components/templates/minimal/MinimalHero';
import MinimalProjects from '@/components/templates/minimal/MinimalProjects';
import MinimalExperience from '@/components/templates/minimal/MinimalExperience';
import MinimalEducation from '@/components/templates/minimal/MinimalEducation';
import MinimalServices from '@/components/templates/minimal/MinimalServices';
import MinimalTestimonials from '@/components/templates/minimal/MinimalTestimonials';
import AnimatedSection from '@/components/portfolio/AnimatedSection';

export default function MinimalTemplate({ 
user, 
projects = [], 
services = [], 
testimonials = [], 
experiences = [],
education = [],
certifications = []
}) {
const userHandle = user?.handle || user?.username || '';

return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
    <AnimatedSection><MinimalHero user={user} /></AnimatedSection>
    <AnimatedSection delay={0.04}><MinimalProjects projects={projects} userHandle={userHandle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><MinimalExperience experiences={experiences} userHandle={userHandle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><MinimalEducation education={education} userHandle={userHandle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><MinimalServices services={services} userHandle={userHandle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><MinimalTestimonials testimonials={testimonials} userHandle={userHandle} /></AnimatedSection>
    </div>
);
}

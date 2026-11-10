'use client';

import React from 'react';
import BentoHero from '@/components/templates/bento/BentoHero';
import BentoProjects from '@/components/templates/bento/BentoProjects';
import BentoExperience from '@/components/templates/bento/BentoExperience';
import BentoEducation from '@/components/templates/bento/BentoEducation';
import BentoServices from '@/components/templates/bento/BentoServices';
import BentoTestimonials from '@/components/templates/bento/BentoTestimonials';
import AnimatedSection from '@/components/portfolio/AnimatedSection';

export default function BentoTemplate({ 
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
    {/* 1. Bento Top Hero Row */}
    <AnimatedSection><BentoHero user={user} /></AnimatedSection>

    {/* 2. Bento Projects Section */}
    <AnimatedSection delay={0.04}><BentoProjects projects={projects} userHandle={userHandle} /></AnimatedSection>
    
    {/* 3. Bento Experience */}
    <AnimatedSection delay={0.04}><BentoExperience experiences={experiences} userHandle={userHandle} /></AnimatedSection>

    {/* 4. Bento Education */}
    <AnimatedSection delay={0.04}><BentoEducation education={education} userHandle={userHandle} /></AnimatedSection>

    {/* 6. Bento Services */}
    <AnimatedSection delay={0.04}><BentoServices services={services} userHandle={userHandle} /></AnimatedSection>

    {/* 7. Bento Testimonials */}
    <AnimatedSection delay={0.04}><BentoTestimonials testimonials={testimonials} userHandle={userHandle} /></AnimatedSection>
    </div>
);
}

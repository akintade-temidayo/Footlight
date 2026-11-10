'use client';

import React from 'react';
import EditorialHero from '@/components/templates/editorial/EditorialHero';
import EditorialProjects from '@/components/templates/editorial/EditorialProjects';
import EditorialExperience from '@/components/templates/editorial/EditorialExperience';
import EditorialEducation from '@/components/templates/editorial/EditorialEducation';
import EditorialServices from '@/components/templates/editorial/EditorialServices';
import EditorialTestimonials from '@/components/templates/editorial/EditorialTestimonials';
import AnimatedSection from '@/components/portfolio/AnimatedSection';

export default function EditorialTemplate({ 
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
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-20">
    <AnimatedSection><EditorialHero user={user} /></AnimatedSection>
    <AnimatedSection delay={0.04}><EditorialProjects projects={projects} userHandle={userHandle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><EditorialExperience experiences={experiences} userHandle={userHandle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><EditorialEducation education={education} userHandle={userHandle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><EditorialServices services={services} userHandle={userHandle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><EditorialTestimonials testimonials={testimonials} userHandle={userHandle} /></AnimatedSection>
    </div>
);
}

import ModernHero from '@/components/templates/modern/ModernHero';
import ModernProjects from '@/components/templates/modern/ModernProjects';
import ModernExperience from '@/components/templates/modern/ModernExperience';
import ModernEducation from '@/components/templates/modern/ModernEducation';
import ModernServices from '@/components/templates/modern/ModernServices';
import ModernTestimonials from '@/components/templates/modern/ModernReviews';
import ScrollToHashOnLoad from '@/components/portfolio/ScrollToHashOnLoad';
import AnimatedSection from '@/components/portfolio/AnimatedSection';

export default function ModernTemplate({
user,
projects = [],
experiences = [],
education = [],
certifications = [],
services = [],
testimonials = [],
}) {
const handle = user?.handle || user?.username || '';

return (
    <div className="w-full space-y-12">
    <ScrollToHashOnLoad />

    <AnimatedSection><ModernHero user={user} /></AnimatedSection>
    <AnimatedSection delay={0.04}><ModernProjects projects={projects} handle={handle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><ModernExperience experiences={experiences} handle={handle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><ModernEducation education={education} handle={handle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><ModernServices services={services} handle={handle} /></AnimatedSection>
    <AnimatedSection delay={0.04}><ModernTestimonials testimonials={testimonials} handle={handle} /></AnimatedSection>
    </div>
);
}

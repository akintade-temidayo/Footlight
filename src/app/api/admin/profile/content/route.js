import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Certification from '@/models/Certification';
import Education from '@/models/Education';
import Experience from '@/models/Experience';
import Project from '@/models/Project';
import Service from '@/models/Service';
import Testimonial from '@/models/Testimonial';
import { getSession } from '@/lib/session';

export async function DELETE(req) {
try {
    await dbConnect();

    const session = await getSession();
    const sessionId = session?.userId;

    if (!sessionId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    let collections = [];
    try {
    const body = await req.json();
    collections = Array.isArray(body.collections) ? body.collections : [];
    } catch {
    collections = [];
    }

    const deletions = collections.length > 0
    ? {
        projects: () => Project.deleteMany({ userId: sessionId }),
        categories: () => Category.deleteMany({ userId: sessionId }),
        services: () => Service.deleteMany({ userId: sessionId }),
        testimonials: () => Testimonial.deleteMany({ userId: sessionId }),
        experience: () => Experience.deleteMany({ userId: sessionId }),
        education: () => Education.deleteMany({ user: sessionId }),
        certifications: () => Certification.deleteMany({ user: sessionId }),
        }
    : {};

    if (collections.length > 0) {
    await Promise.all(collections.map((collection) => {
        const deleteCollection = deletions[collection];
        return deleteCollection ? deleteCollection() : Promise.resolve();
    }).filter(Boolean));
    } else {
    await Promise.all([
        Project.deleteMany({ userId: sessionId }),
        Category.deleteMany({ userId: sessionId }),
        Service.deleteMany({ userId: sessionId }),
        Testimonial.deleteMany({ userId: sessionId }),
        Experience.deleteMany({ userId: sessionId }),
        Education.deleteMany({ user: sessionId }),
        Certification.deleteMany({ user: sessionId }),
    ]);
    }

    return NextResponse.json({
    success: true,
    message: 'Portfolio content was cleared.',
    });
} catch (error) {
    console.error('DELETE /api/admin/profile/content error:', error);
    return NextResponse.json(
    { success: false, message: error.message || 'Failed to clear portfolio content' },
    { status: 500 }
    );
}
}

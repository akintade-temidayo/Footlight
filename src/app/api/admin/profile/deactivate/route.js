import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Project from '@/models/Project';
import Category from '@/models/Category';
import Service from '@/models/Service';
import Testimonial from '@/models/Testimonial';
import Experience from '@/models/Experience';
import Education from '@/models/Education';
import Certification from '@/models/Certification';
import { getSession, clearSession } from '@/lib/session';

export async function DELETE(req) {
try {
await dbConnect();

const session = await getSession();
const sessionId = session?.userId;

if (!sessionId) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

// 1. Delete all user content linked to this userId
await Promise.all([
    Project.deleteMany({ userId: sessionId }),
    Category.deleteMany({ userId: sessionId }),
    Service.deleteMany({ userId: sessionId }),
    Testimonial.deleteMany({ userId: sessionId }),
    Experience.deleteMany({ userId: sessionId }),
    Education.deleteMany({ user: sessionId }),
    Certification.deleteMany({ user: sessionId }),
    User.findByIdAndDelete(sessionId),
]);

await clearSession();

return NextResponse.json({
    success: true,
    message: 'Account successfully deactivated and data removed.',
});
} catch (error) {
console.error('DELETE /api/admin/profile/deactivate error:', error);
return NextResponse.json(
    { success: false, message: error.message || 'Failed to deactivate account' },
    { status: 500 }
);
}
}

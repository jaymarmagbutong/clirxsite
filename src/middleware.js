import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    console.log("Middleware running");

    // Get the token from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    // Get the roleID from the token
    const roleID = token?.role;

    // Initialize role as an empty string
    let role = '';

    // Assign role based on roleID
    switch (roleID) {
        case 1:
            role = 'admin';
            break;
        case 2:
            role = 'editor';
            break;
        case 3:
            role = 'viewer';
            break;
        default:
            role = 'viewer';
    }

 
    // Define role-based access rules
    const roleBasedAccess = {
        'admin': [
			'/api',
            '/admin', 
            '/manual', 
            '/user', 
            '/media', 
            '/posts', 
            '/profile', 
            '/settings',
			'/dashboard',
            '/accreditation',
        ],
        'editor': [
			'/api',
            '/manual', 
            '/media', 
            '/posts', 
            '/profile',
			'/dashboard',
            '/accreditation'
        ],
        'viewer': [
            '/profile',
			'/dashboard',
            '/accreditation',
            '/api',
        ]
    };

    // Allow access to auth routes (e.g., API authentication routes)
    if (url.pathname.startsWith('/api/auth')) {
        return NextResponse.next();
    }

    // Redirect to login if there is no token
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check access based on role-based access configuration
    const allowedPaths = roleBasedAccess[role] || [];

    if (!allowedPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Allow access if user is authenticated and has the right role
    return NextResponse.next();
}

// Export config to define matcher for protected routes
export const config = {
    matcher: [
        '/manual/:path*', 
        '/admin/:path*', 
        '/user/:path*', 
        '/media/:path*', 
        '/posts/:path*', 
        '/api/:path*',
        '/profile/:path*',
        '/settings/:path*',
		'/dashboard/:path*',
        '/accreditation/:path*',
    ],
};

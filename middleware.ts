import {NextRequest, NextResponse} from 'next/server';
import type {NextMiddleware} from 'next/server';

interface Cookie {
    [key: string]: string;
}

// Function for safer cookie parsing (prevents potential security vulnerabilities)
function parseCookie(cookieString: string): Cookie {
    const cookies: Cookie = {};
    if (cookieString) {
        cookieString.split(';').forEach(cookie => {
            const [key, value] = cookie.trim().split('=');
            if (key && value) {
                cookies[key] = decodeURIComponent(value);
            }
        });
    }
    return cookies;
}

export const middleware: NextMiddleware = (request: NextRequest) => {
    const cookies = parseCookie(request.headers.get('cookie') || '');
    const token = cookies.token;

    // Define protected routes and auth pages
    const protectedRoutes = ['/profile', '/all', '/add'];
    const authPages = ['/register', '/login'];

    // Handle protected routes
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Handle auth pages
    if (authPages.includes(request.nextUrl.pathname)) {
        if (token) {
            try {
                return NextResponse.redirect(new URL('/', request.url));
            } catch {
                // If token is invalid, allow access to auth pages
            }
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/profile', '/all', '/add', '/register', '/login'], // Protected routes and auth pages
};

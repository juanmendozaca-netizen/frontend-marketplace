import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const rol = request.cookies.get('rol')?.value;
    const path = request.nextUrl.pathname;

    // Rutas protegidas
    const isAdminRoute = path.startsWith('/admin');
    const isAuthRoute = path === '/login' || path === '/register';

    // Si no tiene token y quiere entrar a ruta protegida
    if (!token && isAdminRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Si tiene token y quiere entrar a login/register, redirigir a inicio
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Si tiene token pero no es ADMIN e intenta entrar a /admin
    if (token && isAdminRoute && rol !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login', '/register']
};
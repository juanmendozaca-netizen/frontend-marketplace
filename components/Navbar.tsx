'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [rol, setRol] = useState<string | null>(null);

    useEffect(() => {
        const cookies = document.cookie.split(';');
        const rolCookie = cookies.find(c => c.trim().startsWith('rol='));
        if (rolCookie) setRol(rolCookie.split('=')[1]);
    }, []);

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'rol=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setRol(null);
        router.push('/login');
        router.refresh();
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-xl font-semibold text-gray-900">
                        ProductStore
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Productos
                        </Link>
                        {rol === 'ADMIN' && (
                            <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Admin
                            </Link>
                        )}
                        {rol ? (
                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-800 transition-colors text-sm"
                            >
                                Cerrar sesión
                            </button>
                        ) : (
                            <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
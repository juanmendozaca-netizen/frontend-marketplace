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
        <nav className="bg-[#1c1f26] border-b border-[#2c3038] sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="font-display text-xl font-bold text-[#e8e6e1] tracking-tight">
                        Product<span className="text-[#d97757]">Store</span>
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link href="/" className="text-sm text-[#8b8f98] hover:text-[#e8e6e1] transition-colors">
                            Productos
                        </Link>
                        {rol === 'ADMIN' && (
                            <Link href="/admin" className="text-sm text-[#8b8f98] hover:text-[#e8e6e1] transition-colors">
                                Admin
                            </Link>
                        )}
                        {rol ? (
                            <button
                                onClick={handleLogout}
                                className="text-sm text-[#d97757] hover:text-[#e08e6f] transition-colors"
                            >
                                Cerrar sesión
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm bg-[#d97757] text-[#14161a] font-medium px-4 py-1.5 rounded-full hover:bg-[#e08e6f] transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
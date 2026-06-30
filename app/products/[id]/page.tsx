import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product, ApiResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data: ApiResponse<Product> = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 mb-6 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
      >
        ← Volver a productos
      </Link>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <img
          src={product.imageUrl || 'https://placehold.co/800x400?text=Sin+imagen'}
          alt={product.nombre}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          {product.category && (
            <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent)] bg-[var(--accent-soft)] px-2 py-1 rounded-md mb-3">
              {product.category.nombre}
            </span>
          )}

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            {product.nombre}
          </h1>

          <div className="font-display text-3xl font-bold text-[var(--accent)] mb-6">
            S/ {product.precio}
          </div>

          {product.descripcion && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-2">
                Descripción
              </h2>
              <p className="text-[var(--foreground)] leading-relaxed opacity-90">
                {product.descripcion}
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-[var(--border)] text-xs text-[var(--muted)]">
            ID del producto: {product.id}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, Category, ApiResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data: ApiResponse<Category[]> = await res.json();
      if (data.success) setCategories(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `${API_URL}/products?categoryId=${selectedCategory}`
        : `${API_URL}/products`;
      const res = await fetch(url);
      const data: ApiResponse<Product[]> = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <span className="text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
          Catálogo
        </span>
        <h1 className="font-display text-4xl font-bold text-[var(--foreground)] mt-1">
          Productos
        </h1>
      </div>

      {/* Filtro por categorías */}
      {categories.length > 0 && (
        <div className="flex gap-2 mb-10 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              selectedCategory === null
                ? 'bg-[var(--accent)] text-[#14161a] border-[var(--accent)]'
                : 'bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-[var(--accent)] text-[#14161a] border-[var(--accent)]'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]'
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-[var(--muted)]">Cargando productos...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
          <p className="text-[var(--muted)]">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl || 'https://placehold.co/400x300?text=Sin+imagen'}
                  alt={product.nombre}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                {product.category && (
                  <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-[var(--accent)] bg-[var(--accent-soft)] px-2 py-1 rounded-md mb-2">
                    {product.category.nombre}
                  </span>
                )}
                <h2 className="font-display text-lg font-semibold text-[var(--foreground)] mb-2 leading-snug">
                  {product.nombre}
                </h2>
                <p className="font-display text-2xl font-bold text-[var(--foreground)] mb-2">
                  S/ {product.precio}
                </p>
                {product.descripcion && (
                  <p className="text-[var(--muted)] text-sm line-clamp-2">
                    {product.descripcion}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
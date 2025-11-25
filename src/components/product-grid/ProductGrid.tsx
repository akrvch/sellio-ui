import React, { useState } from 'react'
import ProductCard, { type Product } from '@components/product-card'
import { Button } from '@ui'

interface ProductGridProps {
  title: string
  products: Product[]
  initialCount?: number
  loadMoreCount?: number
}

export default function ProductGrid({
  title,
  products,
  initialCount = 6,
  loadMoreCount = 6,
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)

  const visibleProducts = products.slice(0, visibleCount)
  const hasMore = visibleCount < products.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + loadMoreCount, products.length))
  }

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-2xl font-bold text-brand-black mb-6">{title}</h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mb-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <Button
          variant="outlined"
          size="medium"
          onClick={handleLoadMore}
          className="w-full"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Показати ще
        </Button>
      )}
    </div>
  )
}


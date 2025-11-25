import React, { useState } from 'react'
import ProductCard, { type Product } from '@components/product-card'
import { Text, Button } from '@ui'

interface ListingContentProps {
  products: Product[]
  totalCount: number
  activeFilters: { label: string; onRemove: () => void }[]
  onClearFilters: () => void
}

type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'newest'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'За популярністю' },
  { value: 'price-asc', label: 'Ціна: від низької' },
  { value: 'price-desc', label: 'Ціна: від високої' },
  { value: 'newest', label: 'Новинки' },
]

export default function ListingContent({
  products,
  totalCount,
  activeFilters,
  onClearFilters,
}: ListingContentProps) {
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex-1">
      {/* Toolbar with Active Filters */}
      <div className="flex items-center justify-between mb-6 gap-4">
        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-3 py-2 rounded"
            >
              <Text variant="body-2">{filter.label}</Text>
              <button onClick={filter.onRemove} className="hover:text-indigo-800">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Right Side: Sort and View Mode */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Sort */}
          <button className="flex items-center gap-2">
            <img src="/icons/sort.svg" alt="" className="w-5 h-5" />
            <Text variant="subtitle-1">{SORT_OPTIONS.find((o) => o.value === sortBy)?.label}</Text>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      {products.length < totalCount && (
        <div className="flex justify-center">
          <Button variant="outlined" size="medium" onClick={() => console.log('Load more')}>
            Показати ще
          </Button>
        </div>
      )}
    </div>
  )
}


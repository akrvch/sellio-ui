import React, { useState } from 'react'
import ListingFilters, { type FilterState } from '@components/listing-filters'
import ListingContent from '@components/listing-content'
import { type Product } from '@components/product-card'

interface ListingProps {
  products: Product[]
  totalCount: number
}

// Маппінг ID до назв
const BRAND_NAMES: Record<string, string> = {
  huawei: 'Huawei',
  sony: 'Sony',
  jbl: 'JBL',
  apple: 'Apple',
  brand1: 'Brand',
  brand2: 'Brand',
}

const CONNECTION_TYPE_NAMES: Record<string, string> = {
  wireless: 'Бездротові',
  wired: 'Дротові',
}

const HEADPHONE_TYPE_NAMES: Record<string, string> = {
  vacuum: 'Вакуумні',
  'in-ear': 'Вкладиші',
}

export default function Listing({ products, totalCount }: ListingProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceFrom: '',
    priceTo: '',
    brands: [],
    connectionTypes: [],
    headphoneTypes: [],
  })

  // Формуємо активні фільтри для відображення
  const activeFilters = [
    ...filters.brands.map((brandId) => ({
      label: `Бренд: ${BRAND_NAMES[brandId] || brandId}`,
      onRemove: () =>
        setFilters({ ...filters, brands: filters.brands.filter((b) => b !== brandId) }),
    })),
    ...filters.connectionTypes.map((typeId) => ({
      label: CONNECTION_TYPE_NAMES[typeId] || typeId,
      onRemove: () =>
        setFilters({
          ...filters,
          connectionTypes: filters.connectionTypes.filter((t) => t !== typeId),
        }),
    })),
    ...filters.headphoneTypes.map((typeId) => ({
      label: HEADPHONE_TYPE_NAMES[typeId] || typeId,
      onRemove: () =>
        setFilters({
          ...filters,
          headphoneTypes: filters.headphoneTypes.filter((t) => t !== typeId),
        }),
    })),
  ]

  const handleClearFilters = () => {
    setFilters({
      priceFrom: '',
      priceTo: '',
      brands: [],
      connectionTypes: [],
      headphoneTypes: [],
    })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Filters Sidebar */}
      <ListingFilters filters={filters} onFiltersChange={setFilters} />

      {/* Products Content */}
      <ListingContent
        products={products}
        totalCount={totalCount}
        activeFilters={activeFilters}
        onClearFilters={handleClearFilters}
      />
    </div>
  )
}


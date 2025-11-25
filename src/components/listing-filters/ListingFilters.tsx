import React, { useState } from 'react'
import { Text, Button, Input } from '@ui'

export interface FilterState {
  priceFrom: string
  priceTo: string
  brands: string[]
  connectionTypes: string[]
  headphoneTypes: string[]
}

interface ListingFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

// Mock data - буде замінено на GraphQL запит
const BRANDS = [
  { id: 'huawei', name: 'Huawei', count: 14 },
  { id: 'sony', name: 'Sony', count: 99 },
  { id: 'jbl', name: 'JBL', count: 46 },
  { id: 'apple', name: 'Apple', count: 6 },
  { id: 'brand1', name: 'Brand', count: 46 },
  { id: 'brand2', name: 'Brand', count: 46 },
]

const CONNECTION_TYPES = [
  { id: 'wireless', name: 'Бездротові', count: 78 },
  { id: 'wired', name: 'Дротові', count: 39 },
]

const HEADPHONE_TYPES = [
  { id: 'vacuum', name: 'Вакуумні', count: 38 },
  { id: 'in-ear', name: 'Вкладиші', count: 39 },
]

export default function ListingFilters({ filters, onFiltersChange }: ListingFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    connectionType: true,
    headphoneType: true,
  })
  const [showAllBrands, setShowAllBrands] = useState(false)

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handlePriceChange = (field: 'priceFrom' | 'priceTo', value: string) => {
    onFiltersChange({ ...filters, [field]: value })
  }

  const handleBrandToggle = (brandId: string) => {
    const newBrands = filters.brands.includes(brandId)
      ? filters.brands.filter((id) => id !== brandId)
      : [...filters.brands, brandId]
    onFiltersChange({ ...filters, brands: newBrands })
  }

  const handleConnectionTypeToggle = (typeId: string) => {
    const newTypes = filters.connectionTypes.includes(typeId)
      ? filters.connectionTypes.filter((id) => id !== typeId)
      : [...filters.connectionTypes, typeId]
    onFiltersChange({ ...filters, connectionTypes: newTypes })
  }

  const handleHeadphoneTypeToggle = (typeId: string) => {
    const newTypes = filters.headphoneTypes.includes(typeId)
      ? filters.headphoneTypes.filter((id) => id !== typeId)
      : [...filters.headphoneTypes, typeId]
    onFiltersChange({ ...filters, headphoneTypes: newTypes })
  }

  const handleApplyFilters = () => {
    // TODO: Застосувати фільтри (викликати API або оновити URL)
    console.log('Apply filters:', filters)
  }

  const visibleBrands = showAllBrands ? BRANDS : BRANDS.slice(0, 4)

  return (
    <div className="w-full lg:w-64 flex-shrink-0 bg-white p-6 rounded border border-indigo-50">
      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4"
        >
          <Text variant="subtitle-1">Ціна</Text>
          <svg
            className={`w-5 h-5 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Text variant="body-2" className="mb-1 text-gray-500">
                  Від:
                </Text>
                <Input
                  type="number"
                  value={filters.priceFrom}
                  onChange={(e) => handlePriceChange('priceFrom', e.target.value)}
                  placeholder="1"
                />
              </div>
              <div className="flex-1">
                <Text variant="body-2" className="mb-1 text-gray-500">
                  До:
                </Text>
                <Input
                  type="number"
                  value={filters.priceTo}
                  onChange={(e) => handlePriceChange('priceTo', e.target.value)}
                  placeholder="60 000"
                />
              </div>
              <div className="pt-6">
                <Text variant="body-2" className="text-gray-500">
                  ₴
                </Text>
              </div>
            </div>
            <Button variant="subtle" size="medium" onClick={handleApplyFilters} className="w-full">
              Застосувати
            </Button>
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full mb-4"
        >
          <Text variant="subtitle-1">Бренд</Text>
          <svg
            className={`w-5 h-5 transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.brand && (
          <div className="space-y-3">
            {/* Search */}
            <Input
              type="text"
              placeholder="Пошук"
              leftIcon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />

            {/* Brand List */}
            <div className="space-y-2">
              {visibleBrands.map((brand) => (
                <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand.id)}
                    onChange={() => handleBrandToggle(brand.id)}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <Text variant="body-1">
                    {brand.name} <span className="text-gray-400">{brand.count}</span>
                  </Text>
                </label>
              ))}
            </div>

            {/* Show More */}
            {BRANDS.length > 4 && (
              <button
                onClick={() => setShowAllBrands(!showAllBrands)}
                className="hover:text-indigo-700"
              >
                <Text variant="body-1" className="text-indigo-600">
                  {showAllBrands ? 'Показати менше' : `Показати ще ${BRANDS.length - 4}`}
                </Text>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Connection Type Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('connectionType')}
          className="flex items-center justify-between w-full mb-4"
        >
          <Text variant="subtitle-1">Тип підключення</Text>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.connectionType ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.connectionType && (
          <div className="space-y-2">
            {CONNECTION_TYPES.map((type) => (
              <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.connectionTypes.includes(type.id)}
                  onChange={() => handleConnectionTypeToggle(type.id)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Text variant="body-1">
                  {type.name} <span className="text-gray-400">{type.count}</span>
                </Text>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Headphone Type Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('headphoneType')}
          className="flex items-center justify-between w-full mb-4"
        >
          <Text variant="subtitle-1">Тип навушників</Text>
          <svg
            className={`w-5 h-5 transition-transform ${
              expandedSections.headphoneType ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.headphoneType && (
          <div className="space-y-2">
            {HEADPHONE_TYPES.map((type) => (
              <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.headphoneTypes.includes(type.id)}
                  onChange={() => handleHeadphoneTypeToggle(type.id)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Text variant="body-1">
                  {type.name} <span className="text-gray-400">{type.count}</span>
                </Text>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


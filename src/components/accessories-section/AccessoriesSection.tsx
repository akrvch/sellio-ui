import React from 'react'
import ProductGrid from '@components/product-grid'
import { type Product } from '@components/product-card'

interface AccessoriesSectionProps {
  products: Product[]
}

export default function AccessoriesSection({ products }: AccessoriesSectionProps) {
  return (
    <ProductGrid
      title="Оберіть аксесуар"
      products={products}
      showLoadMore={false}
    />
  )
}


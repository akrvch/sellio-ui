import React from 'react'
import ProductGrid from '@components/product-grid'
import { type Product } from '@components/product-card'

interface SimilarProductsSectionProps {
  products: Product[]
}

export default function SimilarProductsSection({ products }: SimilarProductsSectionProps) {
  return (
    <ProductGrid
      title="Подібні товари"
      products={products}
      initialCount={6}
      loadMoreCount={6}
    />
  )
}


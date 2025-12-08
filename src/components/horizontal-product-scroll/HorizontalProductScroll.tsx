import React from 'react'
import ProductCard, { type Product } from '@components/product-card'

interface HorizontalProductScrollProps {
  title: string
  products: Product[]
}

export default function HorizontalProductScroll({
  title,
  products,
}: HorizontalProductScrollProps) {
  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-2xl font-bold text-brand-black mb-6">{title}</h2>

      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto -mx-6 px-6">
        <div className="flex gap-2 pb-2">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[160px] sm:w-[180px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@ui'
import { cn } from '@lib/cn'

export interface Product {
  id: string
  name: string
  url: string
  image: string
  price: number
  oldPrice?: number
  discount?: number
  badge?: string
  inStock: boolean
  isFavorite?: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercent = product.discount || 
    (product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0)

  // Extract path from full URL (e.g., "http://localhost:5173/p/2-product" -> "/p/2-product")
  const productPath = product.url.replace(/^https?:\/\/[^/]+/, '')

  const handleAddToCart = () => {
    // TODO: Реалізувати логіку додавання в кошик (dispatch Redux action або API call)
    console.log('Add to cart:', product.id)
  }

  const handleToggleFavorite = () => {
    // TODO: Реалізувати логіку додавання в улюблені (dispatch Redux action або API call)
    console.log('Toggle favorite:', product.id)
  }

  return (
    <div className={cn(
      "flex flex-col bg-white rounded border border-gray-200 hover:shadow-md transition-shadow",
      !product.inStock && "opacity-50"
    )}>
      {/* Image Container */}
      <div className="relative p-2 md:p-4 md:pb-2">
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-brand-black text-sm font-semibold px-2 py-1 rounded z-10">
            -{discountPercent}%
          </div>
        )}
        
        {/* Custom Badge */}
        {product.badge && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-sm font-semibold px-2 py-1 rounded z-10">
            {product.badge}
          </div>
        )}

        {/* Product Image */}
        <Link to={productPath} className="block aspect-square bg-gray-100 rounded overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col px-2 md:px-4 pb-2 md:pb-4">
        <Link to={productPath}>
          <h3 className="text-base text-brand-black mb-3 line-clamp-2 hover:text-indigo-600 cursor-pointer min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Stock Status */}
        <div className="mb-3">
          <span className={cn(
            'text-sm',
            product.inStock ? 'text-green-400' : 'text-gray-400'
          )}>
            {product.inStock ? 'В наявності' : 'Немає в наявності'}
          </span>
        </div>

        {/* Price and Favorite */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            {product.oldPrice && (
              <span className="text-sm text-brand-black line-through">
                {product.oldPrice} ₴
              </span>
            )}
            <span className={cn(
              "text-xl font-semibold",
              product.oldPrice ? "text-indigo-600" : "text-brand-black"
            )}>
              {product.price} ₴
            </span>
          </div>
          
          {/* Favorite Button */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className="p-1 hover:bg-gray-50 rounded transition"
            aria-label="Додати до улюблених"
          >
            <img
              src={product.isFavorite ? '/icons/hear-indigo-pressed.svg' : '/icons/heart-indigo.svg'}
              alt=""
              className="h-6 w-6"
            />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          size="medium"
          className="w-full"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <img 
            src={product.inStock ? '/icons/cart-white.svg' : '/icons/cart-muted.svg'} 
            alt="" 
            className="h-5 w-5 mr-2" 
          />
          {product.inStock ? 'Купити' : 'Недоступно'}
        </Button>
      </div>
    </div>
  )
}


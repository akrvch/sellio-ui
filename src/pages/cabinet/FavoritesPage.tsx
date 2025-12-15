import React from 'react'
import { useQuery } from '@apollo/client/react'
import { Text } from '@ui'
import { useFavorites } from '@contexts'
import ProductCard, { type Product } from '@components/product-card'
import { ProductListQuery } from '@graphql/queries'

type ProductData = {
  id: number
  name: string
  url: string
  price: number
  discountedPrice: number | null
  discountPercent: number | null
}

type ProductListData = {
  productList: ProductData[]
}

export default function FavoritesPage() {
  const { favorites, favoritesCount } = useFavorites()

  // Convert string IDs to numbers for GraphQL query
  const productIds = favorites.map((id) => parseInt(id, 10)).filter((id) => !isNaN(id))

  // Fetch actual product data from GraphQL
  const { data, loading, error } = useQuery<ProductListData>(ProductListQuery, {
    variables: { productIds },
    skip: productIds.length === 0,
  })

  // Map GraphQL data to Product format
  const products: Product[] = React.useMemo(() => {
    if (!data?.productList) return []
    return data.productList.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      url: product.url,
      price: product.discountedPrice || product.price,
      oldPrice: product.discountedPrice ? product.price : undefined,
      discount: product.discountPercent || undefined,
      image: '/product-images/product1.jpeg',
      inStock: true,
      isFavorite: true,
    }))
  }, [data])

  const hasProducts = favoritesCount > 0

  // Loading state
  if (loading) {
    return (
      <div>
        <Text as="h1" variant="large-title-3" className="mb-8">
          Обране ({favoritesCount})
        </Text>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded h-80"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div>
        <Text as="h1" variant="large-title-3" className="mb-8">
          Обране ({favoritesCount})
        </Text>
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Text variant="title-2" color="muted">
            Помилка завантаження товарів
          </Text>
          <Text variant="body-2" color="muted" className="mt-2">
            {error.message}
          </Text>
        </div>
      </div>
    )
  }

  // Empty state
  if (!hasProducts) {
    return (
      <div>
        <Text as="h1" variant="large-title-3" className="mb-8">
          Обране
        </Text>
        
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <img src="/icons/heart.svg" alt="Favorites" className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <Text variant="title-2" color="muted">
            У вас поки немає обраних товарів
          </Text>
          <Text variant="body-2" color="muted" className="mt-2">
            Додайте товари в обране натиснувши на ♡
          </Text>
        </div>
      </div>
    )
  }

  // Products display
  return (
    <div>
      <Text as="h1" variant="large-title-3" className="mb-8">
        Обране ({favoritesCount})
      </Text>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

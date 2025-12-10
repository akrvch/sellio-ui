import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import BasePage from '@components/base-page'
import CategoryCard, { type Category } from '@components/category-card'
import Listing from '@components/listing'
import RecentlyViewedSection from '@components/recently-viewed-section'
import { Text, Breadcrumbs, type BreadcrumbItem } from '@ui'
import { type Product } from '@components/product-card'
import TrendingSection from '@components/trending-section'
import CategoryListingQuery from '@graphql/queries/CategoryListingQuery.graphql'

type ChildCategory = {
  id: number
  name: string
  alias: string
  url: string
}

type PathItem = {
  name: string
  url: string
}

type CategoryData = {
  id: number
  name: string
  alias: string
  url: string
  path: PathItem[]
  childCategories: ChildCategory[]
}

type ProductData = {
  id: number
  name: string
  url: string
  price: number
  discountedPrice?: number
  discountPercent?: number
  company: {
    name: string
  }
}

type CategoryListingData = {
  categoryListing: {
    category: CategoryData
    page?: {
      products: ProductData[]
    } | null
  }
}

export default function CategoryPage() {
  const { categoryAlias } = useParams<{ categoryAlias: string }>()
  
  const { data, loading, error } = useQuery<CategoryListingData>(CategoryListingQuery, {
    variables: {
      alias: categoryAlias || '',
      limit: 20,
      offset: 0,
      sort: 'PRICE_ASC',
    },
    skip: !categoryAlias,
  })
  const categoryData = data?.categoryListing.category
  const hasChildCategories = categoryData && categoryData.childCategories.length > 0
  const products = data?.categoryListing.page?.products || []

  // Map childCategories to Category format
  const subcategories: Category[] = React.useMemo(() => {
    if (!categoryData?.childCategories) return []
    return categoryData.childCategories.map((child: ChildCategory) => ({
      id: child.id.toString(),
      name: child.name,
      image: `/categories/${child.alias}.jpg`, // TODO: add image field from backend
      link: child.url,
    }))
  }, [categoryData])

  // Map products to Product format
  const mappedProducts: Product[] = React.useMemo(() => {
    return products.map((product: ProductData) => ({
      id: product.id.toString(),
      name: product.name,
      url: product.url,
      price: product.discountedPrice || product.price,
      oldPrice: product.discountedPrice ? product.price : undefined,
      discount: product.discountPercent,
      inStock: true, // TODO: add from backend when available
      image: '/products/placeholder.jpg', // TODO: add from backend when available
    }))
  }, [products])

  // Breadcrumbs
  const breadcrumbItems = React.useMemo(() => {
    if (!categoryData) return []
    
    // Check if current category is already in path (last item)
    const lastPathItem = categoryData.path[categoryData.path.length - 1]
    const isCurrentInPath = lastPathItem?.name === categoryData.name
    
    const items: BreadcrumbItem[] = [
      { label: 'Головна', href: '/' },
      ...categoryData.path.map((pathItem: PathItem) => ({
        label: pathItem.name,
        href: pathItem.url,
      })),
    ]
    
    // Add current category only if it's not already the last item in path
    if (!isCurrentInPath) {
      items.push({ label: categoryData.name })
    }
    
    return items
  }, [categoryData])

  // Early returns after all hooks
  if (error) {
    return (
      <BasePage>
        <div className="py-8">
          <Text variant="title-1">Помилка завантаження категорії</Text>
        </div>
      </BasePage>
    )
  }

  if (!loading && !categoryData) {
    return (
      <BasePage>
        <div className="py-8">
          <Text variant="title-1">Категорію не знайдено</Text>
        </div>
      </BasePage>
    )
  }

  if (loading) {
    return (
      <BasePage>
        <div className="py-6 sm:py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-96 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </BasePage>
    )
  }

  return (
    <BasePage>
      <div className="py-6 sm:py-8">
        {/* Breadcrumbs */}
        {categoryData && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        )}

        {/* Page Title */}
        {categoryData && (
          <div className="mb-8 sm:mb-10">
            <Text variant="title-1">{categoryData.name}</Text>
          </div>
        )}

        {/* Subcategories Grid or Product Listing */}
        {hasChildCategories ? (
          <>
            {/* Subcategories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-[50px]">
              {subcategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Listing with Filters */}
            <Listing products={mappedProducts} totalCount={mappedProducts.length} />
            <TrendingSection />
          </>
        )}
        
        {/* Recently Viewed Section */}
        <RecentlyViewedSection />
      </div>
    </BasePage>
  )
}


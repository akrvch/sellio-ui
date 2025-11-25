import React from 'react'
import BasePage from '@components/base-page'
import BannerCarousel, { type Banner } from '@components/banner-carousel'
import RecommendedSection from '@components/recommended-section'
import CategorySection from '@components/category-section'
import TrendingSection from '@components/trending-section'
import FeaturesSection from '@components/features-section'

const banners: Banner[] = [
  {
    id: '1',
    title: 'Запчастини та аксесуари для ваших гаджетів',
    buttonText: 'До покупок',
    buttonLink: '#',
    backgroundImage: '/banners/banner1.png',
    backgroundColor: '#6366F1',
    buttonVariant: 'contained',
  },
  {
    id: '2',
    title: 'Нова колекція аксесуарів',
    subtitle: 'Знижки до 50%',
    buttonText: 'Переглянути',
    buttonLink: '#',
    backgroundImage: '/banners/banner2.png',
    backgroundColor: '#8B5CF6',
    buttonVariant: 'subtle',
  },
  {
    id: '3',
    title: 'Безкоштовна доставка',
    subtitle: 'При замовленні від 1000 грн',
    buttonText: 'Дізнатись більше',
    buttonLink: '#',
    backgroundImage: '/banners/banner1.png',
    backgroundColor: '#EC4899',
    buttonVariant: 'outlined',
  },
]

export default function MainPage() {
  return (
    <BasePage>
      <div className="mt-6 space-y-12">
        <BannerCarousel banners={banners} />
        <RecommendedSection />
        <CategorySection />
        <TrendingSection />
        <FeaturesSection />
      </div>
    </BasePage>
  )
}


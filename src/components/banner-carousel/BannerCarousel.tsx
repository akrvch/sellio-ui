import React, { useState } from 'react'
import { Button } from '@ui'
import { cn } from '@lib/cn'

export interface Banner {
  id: string
  title: string
  subtitle?: string
  buttonText: string
  buttonLink: string
  backgroundImage: string
  backgroundColor?: string
  buttonVariant?: 'contained' | 'subtle' | 'outlined' | 'ghost'
}

interface BannerCarouselProps {
  banners: Banner[]
  autoPlayInterval?: number
}

export default function BannerCarousel({ banners, autoPlayInterval = 5000 }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  React.useEffect(() => {
    if (autoPlayInterval <= 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [banners.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!banners.length) return null

  const currentBanner = banners[currentIndex]

  return (
    <div className="relative w-full overflow-hidden rounded bg-gradient-to-br from-indigo-500 to-indigo-600">
      {/* Banner Content */}
      <div
        className="relative flex min-h-[400px] items-center justify-between px-12 py-16 sm:min-h-[500px] sm:px-16"
        style={{
          backgroundImage: currentBanner.backgroundImage
            ? `url(${currentBanner.backgroundImage})`
            : undefined,
          backgroundColor: currentBanner.backgroundColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Left Content */}
        <div className="z-10 max-w-xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl">
            {currentBanner.title}
          </h1>
          {currentBanner.subtitle && (
            <p className="mb-8 text-xl text-white/90">{currentBanner.subtitle}</p>
          )}
          <Button
            variant={currentBanner.buttonVariant || 'contained'}
            size="medium"
            onClick={() => {
              if (currentBanner.buttonLink) {
                window.location.href = currentBanner.buttonLink
              }
            }}
          >
            {currentBanner.buttonText}
          </Button>
        </div>

        {/* Right Side - Image placeholder (you can add product images here) */}
        <div className="hidden lg:block" />
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-2 rounded-full transition-all',
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


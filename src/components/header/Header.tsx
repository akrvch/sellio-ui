import React from 'react'
import { cn } from '@lib/cn'
import { Button, Input, Text } from '@ui'
import MenuButton from './MenuButton'

export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn('relative w-full bg-transparent', className)}>
      <div className="w-full py-0">
        {/* Desktop (≥ sm): single row */}
        <div className="hidden sm:flex items-center gap-4">
          <a href="#" className="flex items-center gap-1">
            <img src="/icons/logo-mark.svg" alt="logo" className="h-7 w-7" />
            <Text as="span" variant="title-2">Sell.io</Text>
          </a>
          <MenuButton />
          <div className="flex-1 flex items-stretch min-w-0 gap-0">
            <div className="flex-1 min-w-0">
              <Input
                inputClassName="rounded-r-none border-r-0"
                placeholder="Я шукаю..."
                left={<img src="/icons/search.svg" alt="search" className="h-5 w-5" />}
                right={<img src="/icons/mic.svg" alt="mic" className="h-5 w-5" />}
              />
            </div>
            <Button variant="contained" size="medium" className="rounded-l-none">
              Пошук
            </Button>
          </div>
          <nav className="ml-2 flex items-center gap-5">
            <a href="#"><img src="/icons/user.svg" alt="user" className="h-6 w-6" /></a>
            <a href="#"><img src="/icons/heart.svg" alt="heart" className="h-6 w-6" /></a>
            <a href="#"><img src="/icons/cart.svg" alt="cart" className="h-6 w-6" /></a>
          </nav>
        </div>

        {/* Mobile (< sm): two rows */}
        <div className="flex sm:hidden flex-col gap-3">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-1">
              <img src="/icons/logo-mark.svg" alt="logo" className="h-7 w-7" />
              <Text as="span" variant="title-2">Sell.io</Text>
            </a>
            <nav className="flex items-center gap-5">
              <a href="#"><img src="/icons/user.svg" alt="user" className="h-6 w-6" /></a>
              <a href="#"><img src="/icons/heart.svg" alt="heart" className="h-6 w-6" /></a>
              <a href="#"><img src="/icons/cart.svg" alt="cart" className="h-6 w-6" /></a>
            </nav>
          </div>
          <div className="flex items-stretch gap-3 w-full">
            <MenuButton />
            <div className="flex-1 flex items-stretch min-w-0 gap-0">
              <div className="flex-1 min-w-0">
                <Input
                  inputClassName="rounded-r-none border-r-0 h-12"
                  placeholder="Я шукаю..."
                  left={<img src="/icons/search.svg" alt="search" className="h-5 w-5" />}
                  right={<img src="/icons/mic.svg" alt="mic" className="h-5 w-5" />}
                />
              </div>
              <Button variant="contained" size="medium" className="rounded-l-none h-12 px-4">
                Пошук
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}



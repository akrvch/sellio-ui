import React from 'react'
import { cn } from '@lib/cn'
import { Button, Input, Text } from '@ui'

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('w-full bg-transparent', className)}>
      <div className="w-full pt-[50px]">
        {/* Logo row */}
        <div className="mb-8">
          <a href="#" className="flex items-center gap-2">
            <img src="/icons/logo-mark.svg" alt="logo" className="h-7 w-7" />
            <Text as="span" variant="title-2">Sell.io</Text>
          </a>
        </div>
        <div className="grid gap-10 md:grid-cols-12">
          {/* About + links */}
          <div className="md:col-span-4">
            <Text as="div" variant="title-3" className="mb-4">Про нас</Text>
            <div className="flex flex-col md:flex-row md:gap-x-6 gap-y-3">
              <div className="space-y-3">
                <a className="block text-[16px] leading-[24px] text-brand-black" href="#">Про Sell.io</a>
                <a className="block text-[16px] leading-[24px] text-brand-black" href="#">Покупцям</a>
                <a className="block text-[16px] leading-[24px] text-brand-black" href="#">Продавцям</a>
              </div>
              <div className="space-y-3">
                <a className="block text-[16px] leading-[24px] text-brand-black" href="#">Магазини</a>
                <a className="block text-[16px] leading-[24px] text-brand-black" href="#">Оплата та доставка</a>
                <a className="block text-[16px] leading-[24px] text-brand-black" href="#">Політика конфіденційності</a>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="md:col-span-4">
            <Text as="div" variant="title-3" className="mb-4">Контакти</Text>
            <div className="text-[28px] leading-[36px] font-bold text-brand-black">0 800 300 900</div>
            <div className="text-[16px] leading-[24px] text-brand-black">Без вихідних 8:00 - 20:00</div>
            <div className="text-[14px] leading-[22px] text-gray-600">
              Безкоштовні дзвінки зі стаціонарних та мобільних телефонів України
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <Text as="div" variant="title-3" className="mb-4">Підписка на новини</Text>
            <div className="text-[16px] leading-[24px] text-brand-black mb-2">
              Дізнавайтесь першими про акції та новини
            </div>
            <div className="flex items-stretch gap-2">
              <div className="flex-1">
                <Input placeholder="Електронна пошта" />
              </div>
              <Button variant="contained">
                Підписка
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <a href="#"><img src="/icons/instagram.svg" alt="instagram" className="h-6 w-6" /></a>
              <a href="#"><img src="/icons/telegram.svg" alt="telegram" className="h-6 w-6" /></a>
              <a href="#"><img src="/icons/facebook.svg" alt="facebook" className="h-6 w-6" /></a>
              <a href="#"><img src="/icons/youtube.svg" alt="youtube" className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}



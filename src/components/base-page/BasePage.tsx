import React from 'react'
import Header from '@components/header'
import Footer from '@components/footer'

interface BasePageProps {
  children: React.ReactNode
}

export default function BasePage({ children }: BasePageProps) {
  return (
    <div className="min-h-screen bg-site text-gray-900 px-4 sm:px-20 pt-4 pb-6 sm:py-[50px] overflow-x-hidden">
      <Header />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  )
}


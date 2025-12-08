import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@contexts'
import MainPage from '@pages/main'
import UiDemoPage from '@pages/ui-demo'
import CategoryPage from '@pages/category'
import ProductPage from '@pages/product'
import CheckoutPage from '@pages/checkout'
import ThankYouPage from '@pages/thank-you'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ui-demo" element={<UiDemoPage />} />
          <Route path="/c/:categoryAlias" element={<CategoryPage />} />
          <Route path="/p/:productId" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/typ/:orderId" element={<ThankYouPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '@pages/main'
import UiDemoPage from '@pages/ui-demo'
import CategoryPage from '@pages/category'
import ProductPage from '@pages/product'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ui-demo" element={<UiDemoPage />} />
        <Route path="/c/:categoryAlias" element={<CategoryPage />} />
        <Route path="/p/:productId" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

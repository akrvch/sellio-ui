import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import { CartProvider, AuthProvider, FavoritesProvider } from '@contexts'
import apolloClient from '@lib/apollo-client'
import MainPage from '@pages/main'
import UiDemoPage from '@pages/ui-demo'
import CategoryPage from '@pages/category'
import ProductPage from '@pages/product'
import CheckoutPage from '@pages/checkout'
import ThankYouPage from '@pages/thank-you'
import OrderDetailsPage from '@pages/order/OrderDetailsPage'
import { CabinetLayout, SettingsPage, OrdersPage, FavoritesPage } from '@pages/cabinet'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/ui-demo" element={<UiDemoPage />} />
                <Route path="/c/:categoryAlias" element={<CategoryPage />} />
                <Route path="/p/:productId" element={<ProductPage />} />
                <Route path="/checkout/:cartId" element={<CheckoutPage />} />
                <Route path="/typ/:orderId" element={<ThankYouPage />} />
                
                {/* Cabinet routes */}
                <Route path="/cabinet" element={<CabinetLayout />}>
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="orders/:orderId" element={<OrderDetailsPage />} />
                  <Route path="favorites" element={<FavoritesPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

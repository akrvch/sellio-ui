import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import graphql from '@rollup/plugin-graphql'

export default defineConfig({
  plugins: [react(), graphql()],
  resolve: {
    alias: {
      '@ui': fileURLToPath(new URL('./src/ui/index.ts', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@contexts': fileURLToPath(new URL('./src/contexts', import.meta.url)),
      '@graphql': fileURLToPath(new URL('./src/graphql', import.meta.url)),
    },
  },
  server: {
    allowedHosts: ['sellio.local'],
  },
})



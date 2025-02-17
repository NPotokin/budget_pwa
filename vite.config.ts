import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa' 

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico', 
        'apple-touch-icon.png', 
        'mask-icon.svg'],
      manifest: {
        name: 'NP Budget',
        short_name: 'NP Budget',
        description: 'Simple Budget App',
        orientation: 'portrait',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'NP-Budget-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'NP-Budget-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

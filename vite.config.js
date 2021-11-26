import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'


export default defineConfig({

  plugins: [
    
    react(),
    
    VitePWA({

      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      includeAssets: ['favicon.svg'],   

      manifest: {
        name: 'Snapbox',
        short_name: 'SNBX',
        description: 'Photo booth application',
        theme_color: '#010101',

        icons: [

          {
            src: 'snapbox-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'snapbox-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'snapbox-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }

        ]
      }
    }) 
  ],
  server: {
    host: true,
    proxy: {
      '/api': 'https://snapbox-api.herokuapp.com/'
    },

  }

  
})

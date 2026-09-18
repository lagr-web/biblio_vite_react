import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Sørg for at fjerne eventuel gammel kommentar-URL og brug denne præcise blok
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ]
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: {
        index: './index.html',
        background: './src/background/index.jsx',
        content: './src/content/index.jsx',
      },
      output: {
        entryFileNames: `[name].js`
      }
    }
  },

})
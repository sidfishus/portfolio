import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: "./prodindex.html"
      },
      output: {
        assetFileNames: "styles.css",
      }
    },
    outDir: "wwwroot",
  }
})

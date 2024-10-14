import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImp({
      libList: [
        {
          libraryName: 'your-library-name',
          libraryDirectory: 'es',
          style: (name) => `your-library-name/es/${name}/style.css`, // Đường dẫn đến file CSS
        },
      ],
    }),],
})

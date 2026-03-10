import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/epo-commercials-site/" : "/",
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
}))

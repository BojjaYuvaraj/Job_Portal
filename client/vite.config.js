import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",  // Ensures accessibility via localhost
    port: 5173,  // Make sure it matches your frontend port
    strictPort: true,  // Prevents port fallback
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 1414,
      clientPort: 1414,
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,  // Allows external access
    port: 5173,  // Set any default port
    strictPort: true,  // Ensures the port does not change
    preview: {
      allowedHosts: ["fake-bills-website-2.onrender.com"]
    }
  }
});


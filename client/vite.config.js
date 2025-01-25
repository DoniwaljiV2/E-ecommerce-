import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// Convert `import.meta.url` to a directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vite config
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

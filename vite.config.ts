import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset URLs, so the same build works from a user page
  // (user.github.io), a project page (user.github.io/repo/) and a local
  // `dist` preview without anyone hardcoding a repository name. Safe here
  // because routing is hash-based: index.html is the only document, so
  // "./assets/..." always resolves from the same directory.
  base: './',
})

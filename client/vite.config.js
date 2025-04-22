import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //server: {
  //  port: 3001, // random thing to try to keep my end using webstorm to force use 3001
                // when running npm run dev for me in client dir would default to 5173
                // for some reason not 100% sure why
  //},
})

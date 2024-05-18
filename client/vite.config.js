 // vite.config.js
 import { defineConfig } from 'vite';
 import react from '@vitejs/plugin-react';
 import { VitePWA } from "vite-plugin-pwa";
 
 export default defineConfig({
   base: "./",
   plugins: [
     react(),
     VitePWA({
       manifest: {
         name: "React-vite-app",
         short_name: "react-vite-app",
         description: "I am a simple vite app",
         icons: [
           {
             src: '/android-icon-192x192.png',
             sizes: '192x192',
             type: 'image/png',
             purpose: 'favicon'
           },
           {
             src: '/placeholder-512.png',
             sizes: '512x512',
             type: 'image/png',
             purpose: 'favicon'
           }
         ],
         theme_color: '#171717',
         background_color: '#f0e7db',
         display: "standalone",
         scope: '/',
         start_url: "/",
         orientation: 'portrait'
       },
       registerType: 'prompt'
     })
   ],
   server: {
     port: 3000,
     open: true,
     proxy: {
       '/graphql': {
         target: 'http://localhost:3001',
         changeOrigin: true,
         secure: false,
       },
     },
   },
   css: {
     postcss: './postcss.config.cjs',
   },
 });
 
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon-192.png", "icon-512.png"],
      manifest: {
        name: "¡Vamos! — španielčina po slovensky",
        short_name: "¡Vamos!",
        description: "Učenie španielčiny: lekcie, SRS kartičky, quiz, frázy a slovesá.",
        lang: "sk",
        start_url: "/",
        display: "standalone",
        background_color: "#F7F2E6",
        theme_color: "#1E3F8F",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"]
      }
    })
  ]
});

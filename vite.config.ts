import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx, ManifestV3Export } from '@crxjs/vite-plugin'
import manifest from './manifest.json' assert { type: 'json' } // Node >=17
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  plugins: [
    vue(),
    crx({
      manifest: manifest as ManifestV3Export
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    }
  }
})

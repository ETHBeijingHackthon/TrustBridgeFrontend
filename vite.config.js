import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import nodePolyfills from 'rollup-plugin-polyfill-node'
const production = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'color-primary-6': '#3673FF',
          'color-secondary': '#444',
          'color-text-2': '#fff',
        },
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
          importStyle: 'less',
        }),
      ],
    }),
    // ↓ Needed for development mode
    !production &&
      nodePolyfills({
        include: [
          'node_modules/**/*.js',
          new RegExp('node_modules/.vite/.*js'),
        ],
      }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        // ↓ Needed for build
        nodePolyfills(),
      ],
    },
    // ↓ Needed for build if using WalletConnect and other providers
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isAnalyze = mode === 'analyze'
  const isProd = mode === 'production'

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores'],
        vueTemplate: true,
      }),
      Components({
        dts: 'src/types/components.d.ts',
        resolvers: [
          IconsResolver({
            prefix: 'icon',
            enabledCollections: ['mdi', 'ri'],
          }),
        ],
      }),
      Icons({ autoInstall: true }),
      viteMockServe({
        mockPath: 'src/mock',
        enable: env.VITE_MOCK_ENABLED === 'true',
        watchFiles: true,
      }),
      isProd &&
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
        }),
      isProd &&
        viteCompression({
          algorithm: 'brotliCompress',
          ext: '.br',
        }),
      isProd &&
        ViteImageOptimizer({
          png: { quality: 80 },
          jpeg: { quality: 80 },
          webp: { quality: 80 },
          avif: { quality: 70 },
        }),
      isAnalyze &&
        visualizer({
          open: true,
          filename: 'stats.html',
          gzipSize: true,
        }),
      tailwindcss(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: './postcss.config.cjs',
    },
    server: {
      port: 5173,
      host: true,
    },
    build: {
      target: 'es2020',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'utils-vendor': ['axios', 'vue-i18n', '@vueuse/core'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  }
})

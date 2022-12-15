import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
    ]
  },
  server: {
    proxy: {
      "/goplus": {
        target: 'https://api.gopluslabs.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/goplus/, ''),
      },
      "/aveai": {
        target: 'https://api.aaave.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aveai/, ''),
      }
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(__dirname, 'src/theme/index.less')}"`
        },
        javascriptEnabled: true
      },
    },
  },
})

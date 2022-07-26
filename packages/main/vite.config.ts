import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-refresh';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dsemi-react-playground-repl/',
  plugins: [
    React(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      autoInstall: true,
    }),
    AutoImport({
      imports: ['react', 'react-router-dom', 'react-i18next', 'ahooks'],
      dts: './src/types/auto-imports.d.ts',
      resolvers: [
        IconsResolver({
          componentPrefix: 'Icon',
        }),
      ],
    }),
    Unocss({
      presets: [
        presetAttributify({
          /* preset options */
        }),
        presetUno(),
        // ...custom presets
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ['@swc/wasm-web'],
  },
  worker: {
    format: 'es',
  },
});

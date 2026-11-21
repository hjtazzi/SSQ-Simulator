import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import legacy from '@vitejs/plugin-legacy';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from "rollup-plugin-visualizer";


const manualChunks = {
  'vendor_echarts': ['echarts'],
  'vendor_highlighter': ['react-syntax-highlighter'],
  'vendor_style': ['tailwind-merge', 'class-variance-authority', 'clsx'],
  'vendor_react': ['react', 'react-dom', 'react-router-dom', 'react-error-boundary', 'react-helmet-async'],
}

export default defineConfig({
  base: '/SSQ-Simulator',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    legacy({
      targets: ["last 2 versions", "not dead", "> 0.2%"],
      polyfills: true,
      modernPolyfills: true,
      renderLegacyChunks: true,
      renderModernChunks: true,
    }),
    tailwindcss(),
    visualizer({ filename: 'bundle-stats.html' })
  ],
  build: {
    chunkSizeWarningLimit: 1024,
    assetsInlineLimit: 6144,
    rolldownOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (manualChunks.vendor_echarts.some(pkg => id.includes(pkg)))
              return 'vendor_echarts';

            if (manualChunks.vendor_highlighter.some(pkg => id.includes(pkg)))
              return 'vendor_highlighter';

            if (manualChunks.vendor_style.some(pkg => id.includes(pkg)))
              return 'vendor_style';

            if (manualChunks.vendor_react.some(pkg => id.includes(pkg)))
              return 'vendor_react';
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: []
  }
});

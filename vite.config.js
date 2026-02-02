// vite.config.js - UPDATED (remove external entries)

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  
  // ADDED: Global defines to handle process.env issues
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'global': {},
  },
  
  // Base public path for the app
  base: '/',
  
  // Development server configuration
  server: {
    port: 3000,
    host: true, // Listen on all addresses
    open: true, // Open browser automatically
    cors: true,
    
    // Proxy configuration for API (if needed)
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    
    // Configure hmr (hot module replacement)
    hmr: {
      overlay: true,
    },
    
    // Watch configuration
    watch: {
      usePolling: false,
    },
  },
  
  // Preview server configuration
  preview: {
    port: 3001,
    host: true,
    open: false,
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to true for debugging in production
    minify: 'esbuild', // Use esbuild for faster builds (alternative to terser)
    
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Manual chunking logic
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux') || id.includes('axios')) {
              return 'state-vendor';
            }
            if (id.includes('recharts') || id.includes('react-hook-form') || id.includes('yup')) {
              return 'ui-vendor';
            }
            if (id.includes('date-fns') || id.includes('i18next') || id.includes('react-i18next')) {
              return 'utils-vendor';
            }
            if (id.includes('lodash') || id.includes('moment')) {
              return 'lodash-moment';
            }
            // Default vendor chunk
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (/\.css$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
      // External dependencies that shouldn't be bundled - MAKE SURE THIS IS EMPTY
      external: [],
    },
    
    // Chunk size warning limit (in kB)
    chunkSizeWarningLimit: 800,
    
    // Assets handling
    assetsInlineLimit: 4096, // 4kb
    
    // Module and chunk loading
    target: 'esnext',
    
    // Build reporting
    reportCompressedSize: true,
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@config': path.resolve(__dirname, './src/config'),
      '@public': path.resolve(__dirname, './public'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  
  // CSS configuration - UPDATED for Sass @use error and deprecation warnings
  css: {
    // Global CSS imports
    preprocessorOptions: {
      scss: {
        // Modern Sass API to remove deprecation warnings
        api: 'modern-compiler',
        // Silence deprecation warnings
        silenceDeprecations: ['legacy-js-api', 'import', 'slash-div'],
        // ONLY inject variables and mixins, NOT sass modules
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/mixins.scss" as *;
        `,
      },
    },
    
    // CSS modules configuration (if using)
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    
    // PostCSS configuration (if using)
    postcss: {
      plugins: [],
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'axios',
      'date-fns',
      'i18next',
      'react-i18next',
      'react-hook-form',
      'yup',
      'react-toastify',
    ],
    exclude: [],
    esbuildOptions: {
      // FIX for JSX in .js files
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
      },
      target: 'es2020',
    },
  },
  
  // ESBuild configuration - FIX for JSX in .js files
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/, // This tells Vite to treat .js files as .jsx
    exclude: [],
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    target: 'es2020',
  },
  
  // Environment variables
  envPrefix: 'VITE_',
  
  // Logging level
  logLevel: 'info',
  
  // Clear screen on restart
  clearScreen: false,
  
  // Experimental features
  experimental: {
    // renderBuiltUrl(filename, { hostId, hostType, type }) {
    //   if (type === 'asset' && /\.(png|jpe?g|gif|svg|webp|avif)$/.test(filename)) {
    //     return { runtime: `window.assetsPath + "/${filename}"` };
    //   }
    // },
  },
});
import { fileURLToPath, URL } from 'node:url';
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';


export default defineConfig({
    test: {
        // ...
    },
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // server: {
    //     proxy: {
    //         '^/weatherforecast': {
    //             target,
    //             secure: false
    //         },
    //         '/auth/profile': {
    //             target,
    //             secure: false
    //         },
    //         '/auth/register': {
    //             target,
    //             secure: false
    //         },
    //         '/auth/confirmemail': {
    //             target,
    //             secure: false
    //         },
    //         '/auth/login': {
    //             target,
    //             secure: false
    //         },
    //         '/auth/logout': {
    //             target,
    //             secure: false
    //         },

    //     },
    //     port: 5173,
    //     https: {
    //         key: fs.readFileSync(keyFilePath),
    //         cert: fs.readFileSync(certFilePath),
    //     }
    // },
    server: {
      port: 5175  
    },
    optimizeDeps: {
        exclude: ['js-big-decimal']
    }
})

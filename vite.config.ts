/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";


export default defineConfig({
    plugins: [
        // Your Vite plugins here
    ],
    test: {
        // Your Vitest configuration here
        globals: true,
        environment: "jsdom",
    },
});

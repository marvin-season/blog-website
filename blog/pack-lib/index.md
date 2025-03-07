---
slug: pack-publish
title: 打包发布到 npmjs
authors: [marvin-season]
tags: [javascript, npm]
date: "2023-06-06"
---

## 打包
编写打包逻辑 -> 打包本地js -> 发布 -> cycle

{/* truncate */}

### 配置
### **vite.config.js**


```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["lib"], exclude: ["src"] }) as any,
  ],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 10006,
    host: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "lib"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: (id) => !id.startsWith(".") && !id.startsWith("/") && !id.startsWith("@/"),
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        assetFileNames: "assets/[name][extname]",
        entryFileNames: (chunkInfo) => `${chunkInfo.name}.js`,
      },
    },
  },
});

```

### **package.json**
```json
{
  "name": "aio-modal",
  "private": false,
  "version": "0.0.2001-testing",
  "type": "module",
  "types": "./dist/main.d.ts",
  "module": "./dist/main.js",
  "exports": {
    ".": {
      "import": "./dist/main.js"
    },
    "./styles": {
      "import": "./dist/assets/style.css"
    }
  },
  "files": [
    "./dist"
  ],
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "pretty:check": "npx prettier lib --check",
    "pretty:write": "npx prettier lib --write"
  },
  "peerDependencies": {
    "@tippyjs/react": "^4.2.6",
    "tippy.js": "^6.3.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "dependencies": {
    "@tippyjs/react": "^4.2.6",
    "tippy.js": "^6.3.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.20",
    "tailwindcss": "^3.4.7",
    "postcss": "^8",
    "glob": "^10.3.15",
    "vite-plugin-dts": "^2.2.0",
    "@types/node": "^22.8.1",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "globals": "^15.11.0",
    "prettier": "^3.3.3",
    "typescript": "~5.6.2",
    "vite": "^5.4.9"
  }
}

```
### **tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["lib/*"]
    },
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": false
  },
  "include": ["src", "lib"],
  "references": []
}

```

### main
**lib/main.ts**
```jsx
export { default as Button } from './button.tsx';
// ...
```
## 发布
**login**
```shell
npm login
```
**publish**

Attention: 
` "private": false,
  "version": "0.0.2001-testing",`
```shell
npm publish
```
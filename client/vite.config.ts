import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import relay from "vite-plugin-relay";

import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import { createRequire } from 'node:module'

// same usage inside defineConfig

const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`

function reactVirtualized(): PluginOption {
  return {
    name: 'flat:react-virtualized',
    // Note: we cannot use the `transform` hook here
    //       because libraries are pre-bundled in vite directly,
    //       plugins aren't able to hack that step currently.
    //       so instead we manually edit the file in node_modules.
    //       all we need is to find the timing before pre-bundling.
    configResolved: async () => {
      const require = createRequire(import.meta.url)
      const reactVirtualizedPath = require.resolve('react-virtualized')
      const { pathname: reactVirtualizedFilePath } = new url.URL(reactVirtualizedPath, import.meta.url)
      const file = reactVirtualizedFilePath
        .replace(
          path.join('dist', 'commonjs', 'index.js'),
          path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
        )
      const code = await fs.readFile(file, 'utf-8')
      const modified = code.replace(WRONG_CODE, '')
      await fs.writeFile(file, modified)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactVirtualized(), relay],
  optimizeDeps: {
    include: ['@elastic/eui'],
  },
  build: {
    rollupOptions: {

    }
  }

})

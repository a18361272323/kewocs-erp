import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 自定义插件：生成用于 srcdoc 嵌入的 HTML
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Cloudflare Pages 静态资源地址
const STATIC_BASE_URL = 'https://kewocs-erp.pages.dev'

function srcdocPlugin() {
  return {
    name: 'srcdoc-plugin',
    apply: 'build',
    closeBundle() {
      const entries = [
        { name: 'index', title: 'PC端' },
        { name: 'mobile', title: '移动端' }
      ]

      for (const entry of entries) {
        const htmlPath = path.resolve(__dirname, `dist/${entry.name}.html`)
        if (!fs.existsSync(htmlPath)) {
          console.warn(`⚠️ ${entry.title} HTML 文件不存在: ${htmlPath}`)
          continue
        }

        let html = fs.readFileSync(htmlPath, 'utf-8')

        // JS、CSS 和 modulepreload 统一使用 CDN 绝对路径
        // 这样 srcdoc.html 本身不需要频繁更新，只需替换 assets 目录下的文件即可
        html = html.replace(
          /(src|href)="\/assets\//g,
          `$1="${STATIC_BASE_URL}/assets/`
        )
        // logo.svg
        html = html.replace(
          /href="\/logo\.svg"/g,
          `href="${STATIC_BASE_URL}/logo.svg"`
        )

        const srcdocPath = path.resolve(__dirname, `dist/${entry.name}.srcdoc.html`)
        fs.writeFileSync(srcdocPath, html, 'utf-8')
        console.log(`✅ 已生成 ${entry.title} srcdoc: ${srcdocPath}`)
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), srcdocPlugin()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        mobile: resolve(__dirname, 'mobile.html')
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@mobile': resolve(__dirname, 'src-mobile'),
      '@api': resolve(__dirname, 'src/api')
    }
  }
})

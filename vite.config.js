import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const STATIC_BASE_URL = "https://kewocs-erp.pages.dev"

function srcdocPlugin() {
  return {
    name: "srcdoc-plugin",
    apply: "build",
    closeBundle() {
      const entries = [
        { name: "index", title: "PC端" },
        { name: "mobile", title: "移动端" }
      ]
      for (const entry of entries) {
        const htmlPath = path.resolve(__dirname, `dist/${entry.name}.html`)
        if (!fs.existsSync(htmlPath)) {
          console.warn(`⚠️ ${entry.title} HTML 文件不存在: ${htmlPath}`)
          continue
        }
        let html = fs.readFileSync(htmlPath, "utf-8")
        // JS/CSS/modulepreload 统一使用 CDN 绝对路径
        html = html.replace(/(src|href)="\/assets\//g, `$1="${STATIC_BASE_URL}/assets/`)
        html = html.replace(/href="\/logo\.svg"/g, `href="${STATIC_BASE_URL}/logo.svg"`)
        // 移除 CSS link 的 crossorigin 属性，避免 about:srcdoc 中 CORS 拦截
        html = html.replace(/<link rel="stylesheet" crossorigin href=/g, '<link rel="stylesheet" href=')
        html = html.replace(/<link rel="modulepreload" crossorigin href=/g, '<link rel="modulepreload" href=')
        const srcdocPath = path.resolve(__dirname, `dist/${entry.name}.srcdoc.html`)
        fs.writeFileSync(srcdocPath, html, "utf-8")
        console.log(`✅ 已生成 ${entry.title} srcdoc: ${srcdocPath}`)
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), srcdocPlugin()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        mobile: resolve(__dirname, "mobile.html")
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]"
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@mobile": resolve(__dirname, "src-mobile"),
      "@api": resolve(__dirname, "src/api")
    }
  }
})

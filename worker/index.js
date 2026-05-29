/**
 * Cloudflare Worker - 薪福通 API 同域代理
 * 
 * 部署后，ERP 通过 /api/xft/... 访问，Worker 转发到低开平台
 * 避免 CORS 问题
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // 只代理 /api/xft/ 路径
    if (!url.pathname.startsWith('/api/xft/')) {
      return new Response('Not Found', { status: 404 })
    }

    // 提取目标路径
    const targetPath = url.pathname.replace('/api/xft/', '')
    
    // 根据环境选择目标域名
    const tag = url.searchParams.get('tag') || 'uat'
    const targetHost = 'xft-demo.cmburl.cn'
    const targetUrl = `https://${targetHost}/xcodegw/app/reg4bc6558503724/tag/${tag}/api/run/${targetPath}`

    console.log(`[Worker] Proxying: ${request.method} ${targetUrl}`)

    // 构建新的请求
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('xcode-appsource', 'procode')
    headers.set('xcode-debug', 'true')
    
    // 复制原始请求的 body
    const body = await request.text()

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: body || undefined,
        credentials: 'include'  // 携带 Cookie
      })

      // 返回响应
      const responseBody = await response.text()
      const responseHeaders = new Headers()
      responseHeaders.set('Content-Type', 'application/json')
      
      // 允许跨域（可选，根据需要调整）
      responseHeaders.set('Access-Control-Allow-Origin', '*')

      return new Response(responseBody, {
        status: response.status,
        headers: responseHeaders
      })
    } catch (error) {
      console.error('[Worker] Error:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
}

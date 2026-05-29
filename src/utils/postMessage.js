/**
 * 跨域通信工具 - 与薪福通低开平台 iframe 通信
 * 使用 postMessage API 实现跨域数据传递
 */

// 消息类型常量
export const MESSAGE_TYPES = {
  // 从低开平台接收
  APP_KEY: 'APP_KEY',           // 接收 appKey
  USER_INFO: 'USER_INFO',       // 接收用户信息
  THEME: 'THEME',              // 接收主题配置
  LANGUAGE: 'LANGUAGE',         // 接收语言设置
  READY: 'READY',              // 低开平台就绪
  CLOSE: 'CLOSE',              // 关闭指令
  REFRESH: 'REFRESH',          // 刷新指令

  // 发送给低开平台
  GET_APP_KEY: 'GET_APP_KEY',   // 请求 appKey
  READY_RESPONSE: 'READY_RESPONSE', // 响应就绪
  LOG: 'LOG',                  // 日志输出
  ERROR: 'ERROR'               // 错误上报
}

// 事件总线 - 用于组件间通信
class MessageBus {
  constructor() {
    this.listeners = new Map()
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(callback)
    
    // 返回取消订阅函数
    return () => {
      const callbacks = this.listeners.get(event)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  emit(event, data) {
    const callbacks = this.listeners.get(event) || []
    callbacks.forEach(callback => {
      try {
        callback(data)
      } catch (error) {
        console.error(`Error in message listener for ${event}:`, error)
      }
    })
  }

  off(event, callback) {
    if (!callback) {
      this.listeners.delete(event)
    } else {
      const callbacks = this.listeners.get(event) || []
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }
}

export const messageBus = new MessageBus()

/**
 * PostMessage 通信管理器
 */
class CrossDomainMessenger {
  constructor() {
    this.source = null
    this.appKey = null
    this.userInfo = null
    this.isInitialized = false
    this.messageQueue = []
  }

  /**
   * 初始化 - 从 URL 或 localStorage 获取配置
   */
  init() {
    // 尝试从 URL 参数获取 appKey
    const urlParams = new URLSearchParams(window.location.search)
    this.appKey = urlParams.get('appKey') || localStorage.getItem('APP_KEY')
    
    // 监听来自父窗口的消息
    window.addEventListener('message', this.handleMessage.bind(this))
    
    // 如果是 iframe 环境，通知父窗口已就绪
    if (window !== window.parent) {
      this.sendToParent(MESSAGE_TYPES.READY_RESPONSE, {
        status: 'ready',
        app: 'kewocs-erp',
        version: '1.0.0'
      })
    }
    
    // 尝试请求 appKey
    this.requestAppKey()
  }

  /**
   * 处理接收到的消息
   */
  handleMessage(event) {
    const { type, data } = event.data || {}
    
    if (!type) return

    console.log('[CrossDomainMessenger] Received:', type, data)

    switch (type) {
      case MESSAGE_TYPES.APP_KEY:
        this.appKey = data.appKey
        localStorage.setItem('APP_KEY', data.appKey)
        messageBus.emit(MESSAGE_TYPES.APP_KEY, data)
        break

      case MESSAGE_TYPES.USER_INFO:
        this.userInfo = data
        localStorage.setItem('USER_INFO', JSON.stringify(data))
        messageBus.emit(MESSAGE_TYPES.USER_INFO, data)
        break

      case MESSAGE_TYPES.THEME:
        messageBus.emit(MESSAGE_TYPES.THEME, data)
        break

      case MESSAGE_TYPES.LANGUAGE:
        messageBus.emit(MESSAGE_TYPES.LANGUAGE, data)
        break

      case MESSAGE_TYPES.READY:
        this.isInitialized = true
        this.flushMessageQueue()
        messageBus.emit(MESSAGE_TYPES.READY, data)
        break

      case MESSAGE_TYPES.CLOSE:
        messageBus.emit(MESSAGE_TYPES.CLOSE, data)
        break

      case MESSAGE_TYPES.REFRESH:
        window.location.reload()
        break

      default:
        console.warn('[CrossDomainMessenger] Unknown message type:', type)
    }
  }

  /**
   * 发送消息给父窗口
   */
  sendToParent(type, data = {}) {
    if (window !== window.parent) {
      window.parent.postMessage({ type, data }, '*')
    }
  }

  /**
   * 请求 appKey
   */
  requestAppKey() {
    this.sendToParent(MESSAGE_TYPES.GET_APP_KEY, {})
  }

  /**
   * 获取 appKey
   */
  getAppKey() {
    return this.appKey || localStorage.getItem('APP_KEY')
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return this.userInfo || JSON.parse(localStorage.getItem('USER_INFO') || '{}')
  }

  /**
   * 发送日志到父窗口
   */
  log(message, level = 'info') {
    this.sendToParent(MESSAGE_TYPES.LOG, { message, level, timestamp: Date.now() })
  }

  /**
   * 发送错误到父窗口
   */
  error(message, error = null) {
    this.sendToParent(MESSAGE_TYPES.ERROR, { 
      message, 
      error: error?.message || error,
      stack: error?.stack,
      timestamp: Date.now() 
    })
  }

  /**
   * 刷新数据（通知低开平台刷新）
   */
  requestRefresh() {
    this.sendToParent(MESSAGE_TYPES.REFRESH, {})
  }

  /**
   * 销毁监听器
   */
  destroy() {
    window.removeEventListener('message', this.handleMessage.bind(this))
    this.listeners.clear()
  }
}

// 创建单例
export const messenger = new CrossDomainMessenger()

// 自动初始化
if (typeof window !== 'undefined') {
  messenger.init()
}

export default messenger

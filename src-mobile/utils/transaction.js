/**
 * 事务执行器 — 支持回滚操作
 * 当主操作成功但后续步骤部分失败时，按注册的反操作逆序回滚
 */

/**
 * 创建一个事务上下文
 * @returns {{ rollbackStack: Array, registerRollback: Function, execute: Function }}
 */
export function createTransaction() {
  const rollbackStack = []

  /**
   * 注册回滚操作（在主操作成功前调用）
   * @param {Function} fn - 回滚函数
   * @param {string} desc - 描述（用于日志）
   */
  function registerRollback(fn, desc = '') {
    rollbackStack.push({ fn, desc })
  }

  /**
   * 执行回滚（逆序执行所有已注册的回滚操作）
   * @returns {Array} 回滚结果
   */
  async function rollback() {
    const results = []
    // 逆序执行
    for (let i = rollbackStack.length - 1; i >= 0; i--) {
      const { fn, desc } = rollbackStack[i]
      try {
        await fn()
        results.push({ desc, success: true })
      } catch (e) {
        console.warn(`回滚失败 [${desc}]:`, e)
        results.push({ desc, success: false, error: e })
      }
    }
    return results
  }

  /**
   * 批量执行操作，全部成功返回结果，部分失败则回滚并抛出错误
   * @param {Array<{action: Function, rollback: Function, desc: string}>} steps
   * @returns {Array} 每步的执行结果
   */
  async function executeAll(steps) {
    const results = []
    const executedIndices = []

    for (let i = 0; i < steps.length; i++) {
      const { action, rollback: rollbackFn, desc } = steps[i]
      try {
        const result = await action()
        results.push(result)
        executedIndices.push(i)
        if (rollbackFn) {
          rollbackStack.push({ fn: rollbackFn, desc: desc || `step-${i}` })
        }
      } catch (e) {
        console.error(`步骤 [${desc || `step-${i}`}] 执行失败:`, e)
        // 回滚已执行成功的步骤
        if (executedIndices.length > 0) {
          console.warn(`正在回滚 ${executedIndices.length} 个已执行步骤...`)
          const rollbackResults = await rollback()
          const failedRollbacks = rollbackResults.filter(r => !r.success)
          if (failedRollbacks.length > 0) {
            console.error('部分回滚失败:', failedRollbacks)
          }
        }
        throw new Error(`操作失败: ${desc || `步骤${i + 1}`}, 已回滚。原因: ${e.message || e}`)
      }
    }

    return results
  }

  return { rollbackStack, registerRollback, rollback, executeAll }
}

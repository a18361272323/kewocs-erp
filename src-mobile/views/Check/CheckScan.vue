<template>
  <div class="mobile-page">
    <!-- 选择盘点单 -->
    <div class="form-section">
      <van-cell-group inset>
        <van-field
          v-model="selectedOrderName"
          label="盘点单"
          placeholder="请选择盘点单"
          readonly
          is-link
          @click="showOrderPicker = true"
        />
        <van-field
          v-model="selectedWarehouseName"
          label="盘点仓库"
          placeholder="自动填充"
          readonly
        />
      </van-cell-group>
    </div>

    <!-- 扫码录入 -->
    <div v-if="selectedOrder" class="scan-section">
      <div class="section-header">
        <span class="section-title">盘点扫描</span>
        <div class="scan-stats">
          <van-tag type="primary" size="medium">系统 {{ systemQty }}</van-tag>
          <van-tag type="success" size="medium">已盘 {{ scannedList.length }}</van-tag>
          <van-tag v-if="diffQty !== 0" :type="diffQty > 0 ? 'warning' : 'danger'" size="medium">
            {{ diffQty > 0 ? '盘盈' : '盘亏' }} {{ Math.abs(diffQty) }}
          </van-tag>
        </div>
      </div>

      <div class="sn-input-area">
        <van-field
          id="snInput"
          v-model="currentSn"
          placeholder="扫描或输入SN码，按回车添加"
          :border="false"
          right-icon="scan"
          @keyup.enter="addScanSn"
          @click-right-icon="startScan"
        >
          <template #button>
            <van-button size="small" type="primary" @click="addScanSn">添加</van-button>
          </template>
        </van-field>
      </div>

      <!-- 已扫描SN列表 -->
      <van-cell-group inset>
        <van-swipe-cell v-for="(item, index) in scannedList" :key="index">
          <van-cell>
            <template #title>
              <div class="sn-title">{{ item.snCode }}</div>
              <div class="sn-label">{{ item.productName || '未知型号' }}</div>
            </template>
            <template #value>
              <van-tag v-if="item.matched" type="success" size="medium">匹配</van-tag>
              <van-tag v-else type="warning" size="medium">盘盈</van-tag>
            </template>
          </van-cell>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="removeSn(index)" />
          </template>
        </van-swipe-cell>
        <van-cell v-if="scannedList.length === 0" title="暂无扫描记录" />
      </van-cell-group>
    </div>

    <!-- 未选中盘点单时的提示 -->
    <div v-else class="empty-hint">
      <van-icon name="todo-list-o" size="48" color="#ccc" />
      <span class="empty-text">请先选择盘点单</span>
    </div>

    <!-- 底部操作 -->
    <div v-if="selectedOrder && scannedList.length > 0" class="bottom-bar">
      <van-button type="primary" size="large" round block :loading="submitting" @click="submitCheck">
        提交盘点（已盘 {{ scannedList.length }} 台）
      </van-button>
    </div>

    <!-- 盘点单选择器 -->
    <van-popup v-model:show="showOrderPicker" position="bottom" round :style="{ maxHeight: '70%' }">
      <div class="picker-popup">
        <div class="picker-header">
          <span>选择盘点单</span>
          <van-icon name="cross" @click="showOrderPicker = false" />
        </div>
        <div class="picker-list">
          <div
            v-for="item in orderList"
            :key="item.id"
            class="picker-item"
            :class="{ active: selectedOrder && selectedOrder.id === item.id }"
            @click="selectOrder(item)"
          >
            <div class="picker-item-main">
              <span class="picker-item-no">{{ item.checkNo }}</span>
              <van-tag :type="getStatusType(item.status)" size="small">{{ getStatusText(item.status) }}</van-tag>
            </div>
            <div class="picker-item-sub">
              {{ item.warehouseName }} · 系统数量 {{ item.totalSystemQty || 0 }}
            </div>
          </div>
          <div v-if="orderList.length === 0" class="picker-empty">暂无可盘点单</div>
        </div>
      </div>
    </van-popup>

    <input ref="fileInput" type="file" accept="image/*" capture="environment" style="display:none" @change="onFileChange" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showDialog } from 'vant'
import { decodeFromImage } from '../../utils/barcodeScanner.js'
import { checkApi, snApi } from '../../api'

const selectedOrder = ref(null)
const selectedOrderName = ref('')
const selectedWarehouseName = ref('')
const currentSn = ref('')
const scannedList = ref([])
const submitting = ref(false)
const showOrderPicker = ref(false)
const orderList = ref([])
const fileInput = ref(null)

const systemQty = computed(() => selectedOrder.value?.totalSystemQty || 0)
const diffQty = computed(() => scannedList.value.length - systemQty.value)

const getStatusType = (status) => {
  const map = { DRAFT: 'warning', CHECKING: 'primary', COMPLETED: 'success' }
  return map[status] || 'default'
}

const getStatusText = (status) => {
  const map = { DRAFT: '待盘点', CHECKING: '盘点中', COMPLETED: '已完成' }
  return map[status] || status || '未知'
}

// 加载盘点单列表（只加载 DRAFT 和 CHECKING 状态）
const loadOrders = async () => {
  try {
    const res = await checkApi.getList({ current: 1, pageSize: 100 })
    const list = res.data?.list || res.body?.list || []
    orderList.value = list.filter(item => item.status === 'DRAFT' || item.status === 'CHECKING')
  } catch (e) {
    console.error('加载盘点单失败:', e)
  }
}

const selectOrder = (item) => {
  selectedOrder.value = item
  selectedOrderName.value = `${item.checkNo} (${getStatusText(item.status)})`
  selectedWarehouseName.value = item.warehouseName || '-'
  showOrderPicker.value = false
  scannedList.value = []
  // 如果盘点单是草稿状态，自动改为盘点中
  if (item.status === 'DRAFT') {
    checkApi.edit({ id: item.id, status: 'CHECKING' }).then(() => {
      item.status = 'CHECKING'
      selectedOrderName.value = `${item.checkNo} (盘点中)`
    }).catch(() => {})
  }
}

// 添加扫描的SN
const addScanSn = async () => {
  const sn = currentSn.value.trim().toUpperCase()
  if (!sn) {
    showToast('请输入SN码')
    return
  }
  if (!selectedOrder.value) {
    showToast('请先选择盘点单')
    return
  }

  // 检查重复
  if (scannedList.value.some(item => item.snCode === sn)) {
    showToast('该SN码已扫描')
    currentSn.value = ''
    return
  }

  // 查询SN信息，判断是否在系统库存中
  let productName = ''
  let matched = false
  try {
    const snRes = await snApi.getList({ sn_code: sn, current: 1, pageSize: 1 })
    const snRecord = snRes.data?.list?.[0] || snRes.body?.list?.[0]
    if (snRecord) {
      productName = snRecord.productName || ''
      // 检查是否在盘点仓库中（用仓库ID匹配，状态为INSTOCK）
      if (snRecord.status === 'INSTOCK' &&
          (String(snRecord.warehouseId) === String(selectedOrder.value.warehouseId) ||
           snRecord.warehouseName === selectedOrder.value.warehouseName)) {
        matched = true
      }
    }
  } catch (e) {
    console.warn('SN查询失败:', e)
  }

  scannedList.value.push({
    snCode: sn,
    productName: productName || '未知',
    matched
  })
  currentSn.value = ''
  showToast(`已添加: ${sn}${matched ? '' : ' (盘盈)'}`)
  focusSnInput()
}

const removeSn = (index) => {
  scannedList.value.splice(index, 1)
}

// 扫码
const startScan = () => {
  fileInput.value?.click()
}

const onFileChange = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  try {
    const code = await decodeFromImage(file)
    currentSn.value = code.trim().toUpperCase()
    addScanSn()
  } catch (err) {
    console.error('图片解码失败:', err)
    showToast('无法识别条码，请手动输入SN')
  }
  event.target.value = ''
}

// 聚焦SN输入框
const focusSnInput = () => {
  setTimeout(() => {
    const el = document.getElementById('snInput')
    if (el) {
      el.focus()
      el.click()
    }
  }, 300)
}

// 提交盘点
const submitCheck = async () => {
  if (submitting.value) return
  if (scannedList.value.length === 0) {
    showToast('请先扫描SN码')
    return
  }

  try {
    await showDialog({
      title: '提交盘点',
      message: `盘点仓库：${selectedOrder.value.warehouseName}\n系统数量：${systemQty.value}台\n实盘数量：${scannedList.value.length}台\n${diffQty.value > 0 ? '盘盈' + diffQty.value + '台' : diffQty.value < 0 ? '盘亏' + Math.abs(diffQty.value) + '台' : '账实相符'}`,
      showCancelButton: true
    })
  } catch {
    return
  }

  submitting.value = true
  try {
    // 计算实际盘盈盘亏数量
    const profitItems = scannedList.value.filter(item => !item.matched)
    const profitQty = profitItems.length

    // 更新盘点单：设置实盘数量和SN明细，并完成盘点
    await checkApi.edit({
      id: selectedOrder.value.id,
      status: 'COMPLETED',
      totalActualQty: scannedList.value.length,
      profitQty,
      lossQty: 0, // 盘亏数量在处理完未扫描SN后更新
      items: scannedList.value.map(item => ({
        snCode: item.snCode,
        productName: item.productName,
        matched: item.matched
      }))
    })

    // 处理盘亏SN：将未扫描到的在库SN标记为遗失
    let actualLossQty = 0
    try {
      // 获取该仓库所有在库SN
      const allSnRes = await snApi.getList({ 
        warehouseId: selectedOrder.value.warehouseId, 
        status: 'INSTOCK',
        pageSize: 200
      })
      const allSnList = allSnRes.data?.list || allSnRes.body?.list || []
      const scannedSnCodes = new Set(scannedList.value.map(s => s.snCode))
      
      // 未被扫描到的在库SN即为盘亏
      for (const snRecord of allSnList) {
        if (!scannedSnCodes.has(snRecord.snCode)) {
          actualLossQty++
          try {
            await snApi.edit({
              id: snRecord.id,
              snCode: snRecord.snCode,
              status: 'LOST',
              remark: `盘点盘亏 - ${selectedOrder.value.orderNo || selectedOrder.value.id}`
            })
          } catch (e) {
            console.warn(`盘亏SN ${snRecord.snCode} 状态更新失败:`, e)
          }
        }
      }
      // 更新盘点单的盘亏数量
      if (actualLossQty > 0) {
        await checkApi.edit({
          id: selectedOrder.value.id,
          lossQty: actualLossQty
        })
      }
    } catch (e) {
      console.warn('盘亏处理失败:', e)
    }

    // 处理盘盈SN：将不在系统中的SN新增入库
    if (profitQty > 0) {
      const unmatchedItems = scannedList.value.filter(item => !item.matched)
      for (const item of unmatchedItems) {
        try {
          const snData = {
            snCode: item.snCode,
            productId: selectedOrder.value.productId || '',
            productName: item.productName || '',
            productCode: selectedOrder.value.productCode || '',
            warehouseId: selectedOrder.value.warehouseId,
            warehouseName: selectedOrder.value.warehouseName,
            status: 'INSTOCK',
            stockInTime: new Date().toISOString().split('T')[0],
            sourceOrderType: 'CHECK',
            remark: `盘点盘盈 - ${selectedOrder.value.orderNo || selectedOrder.value.id}`
          }
          try {
            await snApi.add(snData)
          } catch (addErr) {
            await snApi.edit(snData)
          }
        } catch (e) {
          console.warn(`盘盈SN ${item.snCode} 入库失败:`, e)
        }
      }
    }

    showToast('盘点提交成功')
    // 重置
    selectedOrder.value = null
    selectedOrderName.value = ''
    selectedWarehouseName.value = ''
    scannedList.value = []
    loadOrders()
  } catch (e) {
    showToast('提交失败: ' + (e.message || '未知错误'))
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  background: var(--color-canvas, #faf7f2);
  padding-bottom: 80px;
}

.form-section {
  padding: 12px 0;
}

.scan-section {
  padding: 0 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 4px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.scan-stats {
  display: flex;
  gap: 6px;
}

.sn-input-area {
  background: var(--color-surface, #f3efe8);
  border-radius: 12px;
  margin-bottom: 8px;
  padding: 4px;
}

.sn-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.sn-label {
  font-size: 13px;
  color: var(--color-ink-muted, #55514d);
  margin-top: 2px;
}

.delete-button {
  height: 100%;
}

.empty-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  gap: 12px;
}

.empty-text {
  font-size: 14px;
  color: var(--color-ink-subtle, #8a8580);
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: var(--color-surface, #f3efe8);
  box-shadow: 0 -1px 6px rgba(0,0,0,0.05);
  z-index: 100;
}

/* 选择器弹窗 */
.picker-popup {
  padding: 16px;
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.picker-list {
  max-height: 50vh;
  overflow-y: auto;
}

.picker-item {
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
  background: var(--color-surface, #f3efe8);
  cursor: pointer;
  border: 2px solid transparent;
}

.picker-item.active {
  border-color: var(--color-primary, #5e6ad2);
  background: var(--color-primary-soft, rgba(94, 106, 210, 0.08));
}

.picker-item-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.picker-item-no {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.picker-item-sub {
  font-size: 12px;
  color: var(--color-ink-subtle, #8a8580);
}

.picker-empty {
  text-align: center;
  padding: 32px 0;
  color: var(--color-ink-subtle, #8a8580);
  font-size: 14px;
}
</style>

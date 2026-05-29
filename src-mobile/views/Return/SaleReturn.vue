<template>
  <div class="mobile-page">
    <!-- 顶部导航 -->

    <!-- SN 扫描 -->
    <div class="scan-section">
      <van-cell-group inset>
        <van-field
          id="snInput"
          v-model="currentSn"
          placeholder="扫描或输入SN码查询机器信息"
          :border="false"
          right-icon="scan"
          @keyup.enter="querySnInfo"
          @click-right-icon="startScan"
        >
          <template #button>
            <van-button size="small" type="primary" @click="querySnInfo">查询</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <!-- 机器信息卡片 -->
    <div v-if="snInfo" class="info-card">
      <van-cell-group inset>
        <van-cell title="SN码" :value="snInfo.snCode" />
        <van-cell title="产品名称" :value="snInfo.productName || '未知'" />
        <van-cell title="当前状态" :value="formatStatus(snInfo.status)" />
        <van-cell title="所在仓库" :value="snInfo.warehouseName || '未知'" />
        <van-cell title="原客户" :value="snInfo.customerName || '未知'" />
        <van-cell title="出库时间" :value="formatDate(snInfo.stockOutTime)" />
      </van-cell-group>
    </div>

    <!-- 退货表单 -->
    <div v-if="snInfo" class="return-form">
      <van-cell-group inset>
        <van-field
          v-model="form.returnReason"
          label="退货原因"
          placeholder="请选择退货原因"
          readonly
          is-link
          @click="showReasonPicker = true"
        />
        <van-field
          v-model="form.returnWarehouseName"
          label="退回仓库"
          placeholder="请选择退回仓库"
          readonly
          is-link
          @click="showWarehousePicker = true"
        />
        <van-field
          v-model="form.remark"
          label="备注说明"
          placeholder="可选填"
          type="textarea"
          rows="3"
        />
      </van-cell-group>
    </div>

    <!-- 已添加列表 -->
    <div v-if="returnList.length > 0" class="list-section">
      <div class="section-header">
        <span class="section-title">本次退货清单</span>
        <van-tag type="warning" size="medium">{{ returnList.length }} 台</van-tag>
      </div>
      <van-cell-group inset>
        <van-cell
          v-for="(item, index) in returnList"
          :key="index"
          :title="item.snCode"
          :label="`${item.productName}${item.originalCustomerName ? ' | 原客户: ' + item.originalCustomerName : ''}`"
          :value="item.returnReason"
        >
          <template #right-icon>
            <van-icon name="cross" color="#ee0a24" @click="removeItem(index)" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-bar">
      <div class="bottom-actions">
        <van-button
          v-if="snInfo && !isInList"
          type="primary"
          size="large"
          round
          block
          @click="addToList"
        >
          添加到退货清单
        </van-button>
        <van-button
          v-if="returnList.length > 0"
          type="warning"
          size="large"
          round
          block
          :loading="submitting"
          :disabled="returnList.length === 0"
          @click="submitReturn"
        >
          提交退货（{{ returnList.length }}台）
        </van-button>
      </div>
    </div>

    <!-- 原因选择器 -->
    <van-popup v-model:show="showReasonPicker" position="bottom">
      <van-picker
        :columns="reasonColumns"
        @confirm="onReasonConfirm"
        @cancel="showReasonPicker = false"
        title="选择退货原因"
      />
    </van-popup>

    <!-- 仓库选择器 -->
    <van-popup v-model:show="showWarehousePicker" position="bottom">
      <van-picker
        :columns="warehouseColumns"
        @confirm="onWarehouseConfirm"
        @cancel="showWarehousePicker = false"
        title="选择退回仓库"
      />
    </van-popup>
    <input ref="fileInput" type="file" accept="image/*" capture="environment" style="display:none" @change="onFileChange" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showDialog } from 'vant'
import { decodeFromImage } from '../../utils/barcodeScanner.js'
import { saleReturnApi, snApi, warehouseApi, deleteReceivable } from '../../api'
import { getCacheOrFetch } from '../../utils/cache.js'
import { playSuccessSound, playErrorSound } from '../../utils/audioFeedback.js'
import { createTransaction } from '../../utils/transaction.js'

const currentSn = ref('')
const snInfo = ref(null)
const returnList = ref([])
const submitting = ref(false)

const goBack = () => {
  window.goBack()
}

const form = ref({
  returnReason: '',
  returnWarehouseId: '',
  returnWarehouseName: '',
  remark: ''
})

// 选择器
const showReasonPicker = ref(false)
const showWarehousePicker = ref(false)
const warehouseColumns = ref([])

// 扫码相关
const fileInput = ref(null)

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

const reasonColumns = [
  { text: '质量问题', value: 'quality' },
  { text: '型号错误', value: 'wrong_model' },
  { text: '客户退订', value: 'cancelled' },
  { text: '物流损坏', value: 'damaged' },
  { text: '其他原因', value: 'other' }
]

const isInList = computed(() => {
  if (!snInfo.value) return false
  return returnList.value.some(item => item.snCode === snInfo.value.snCode)
})

// 加载基础数据
const loadBaseData = async () => {
  try {
    const warehouses = await getCacheOrFetch('warehouses', () => warehouseApi.getList({ current: 1, pageSize: 1000 }))
    const whList = warehouses?.list || warehouses || []
    warehouseColumns.value = whList.map(w => ({
      text: w.name || w.warehouseName,
      value: w.id
    }))
  } catch (error) {
    console.error('加载基础数据失败:', error)
  }
}

// 查询 SN 信息
const querySnInfo = async () => {
  const sn = currentSn.value.trim().toUpperCase()
  if (!sn) {
    showToast('请输入SN码')
    return
  }

  try {
    const snRes = await snApi.getList({ sn_code: sn, current: 1, pageSize: 1 })
    const record = snRes.data?.list?.[0] || snRes.body?.list?.[0]

    if (!record) {
      playErrorSound()
      showToast('未找到该SN码')
      snInfo.value = null
      return
    }

    if (record.status !== 'SOLD') {
      showToast(`该SN码状态为${formatStatus(record.status)}，不可退货`)
      snInfo.value = null
      return
    }

    snInfo.value = record
    currentSn.value = ''
  } catch (error) {
    showToast('查询失败')
    snInfo.value = null
  }
}

// 添加到退货清单
const addToList = () => {
  if (!form.value.returnReason) {
    showToast('请选择退货原因')
    return
  }
  if (!form.value.returnWarehouseId) {
    showToast('请选择退回仓库')
    return
  }

  returnList.value.push({
    snCode: snInfo.value.snCode,
    productId: snInfo.value.productId,
    productName: snInfo.value.productName,
    originalCustomerId: snInfo.value.customerId,
    originalCustomerName: snInfo.value.customerName,
    sourceOrderNo: snInfo.value.sourceOrderNo || '',
    returnReason: form.value.returnReason,
    returnWarehouseId: form.value.returnWarehouseId,
    returnWarehouseName: form.value.returnWarehouseName,
    remark: form.value.remark
  })

  playSuccessSound()
  showToast('已添加到退货清单')
  snInfo.value = null
  focusSnInput()
}

// 移除
const removeItem = (index) => {
  returnList.value.splice(index, 1)
}

// 选择器确认
const onReasonConfirm = ({ selectedOptions }) => {
  form.value.returnReason = selectedOptions[0].text
  showReasonPicker.value = false
}

const onWarehouseConfirm = ({ selectedOptions }) => {
  form.value.returnWarehouseId = selectedOptions[0].value
  form.value.returnWarehouseName = selectedOptions[0].text
  showWarehousePicker.value = false
}

// 提交退货
const submitReturn = async () => {
  if (submitting.value) return

  // 表单完整性校验
  if (returnList.value.length === 0) {
    showToast('退货清单为空，请先添加退货商品')
    return
  }

  try {
    await showDialog({
      title: '确认退货',
      message: `退货数量：${returnList.value.length}台\n确认提交退货单？`,
      showCancelButton: true
    })
  } catch {
    return
  }

  submitting.value = true
  try {
    const tx = createTransaction()

    // 1. 创建一张退货单（含SN明细）
    const firstItem = returnList.value[0]
    const returnRes = await saleReturnApi.add({
      customerId: firstItem.originalCustomerId,
      customerName: firstItem.originalCustomerName,
      warehouseId: form.value.returnWarehouseId,
      warehouseName: form.value.returnWarehouseName,
      remark: form.value.remark || form.value.returnReason,
      reason: form.value.returnReason,
      status: 'completed',
      items: returnList.value.map(item => ({
        snCode: item.snCode,
        productId: item.productId,
        productName: item.productName,
        productCode: item.productCode,
        unit: '台',
        quantity: 1,
        price: item.price || 0
      }))
    })

    const returnId = returnRes?.data?.id || returnRes?.data
    // 注册回滚：删除退货单
    tx.registerRollback(async () => {
      if (returnId) { try { await saleReturnApi.delete(returnId) } catch (e) { console.warn('回滚删除退货单失败:', e) } }
    }, '删除退货单')

    // 2. 批量更新 SN 状态为退货入库（使用事务，部分失败则回滚）
    const snSteps = returnList.value.map(item => ({
      desc: `SN ${item.snCode} 退货`,
      action: async () => {
        return await snApi.edit({
          snCode: item.snCode,
          status: 'INSTOCK',
          warehouseId: form.value.returnWarehouseId,
          sourceOrderNo: returnId,
          sourceOrderType: 'RETURN',
          customerId: null
        })
      },
      rollback: async () => {
        try {
          await snApi.edit({ snCode: item.snCode, status: 'SOLD', warehouseId: item.originalWarehouseId, sourceOrderNo: item.sourceOrderNo, customerId: item.originalCustomerId })
        } catch (e) { console.warn(`回滚SN ${item.snCode} 失败:`, e) }
      }
    }))

    try {
      await tx.executeAll(snSteps)
    } catch (txErr) {
      try { await saleReturnApi.delete(returnId) } catch (e) { console.warn('删除退货单失败:', e) }
      throw txErr
    }

    // 3. 删除对应应收单（按sourceOrderNo去重，非关键步骤，失败不影响退货）
    const orderNos = [...new Set(returnList.value.map(i => i.sourceOrderNo).filter(Boolean))]
    for (const orderNo of orderNos) {
      try {
        await deleteReceivable(orderNo)
      } catch (e) {
        console.warn(`应收单删除失败 orderNo=${orderNo}:`, e)
      }
    }

    showToast({ message: '退货成功', type: 'success', duration: 3000 })
    returnList.value = []
    form.value = { returnReason: '', returnWarehouseId: '', returnWarehouseName: '', remark: '' }
  } catch (error) {
    showToast('退货失败: ' + (error.message || '未知错误'))
  } finally {
    submitting.value = false
  }
}

const formatStatus = (status) => {
  const map = {
    'INSTOCK': '在库',
    'SOLD': '已售',
    'RETURNED': '已退货',
    'SCRAPPED': '报废'
  }
  return map[status] || status
}

const formatDate = (date) => {
  if (!date) return '-'
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
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
    querySnInfo()
  } catch (err) {
    console.error('图片解码失败:', err)
    playErrorSound()
    showToast('无法识别条码，请手动输入SN')
  }
  event.target.value = ''
}

onMounted(() => {
  loadBaseData()
})
</script>

<style scoped>
.mobile-page {
  height: 100vh;
  overflow-y: auto;
  background: #f5f5f5;
  padding-bottom: 120px;
}

.scan-section {
  padding: 12px;
}

.info-card {
  padding: 0 12px;
  margin-bottom: 12px;
}

.return-form {
  padding: 0 12px;
  margin-bottom: 12px;
}

.list-section {
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
  font-weight: bold;
  color: #333;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.bottom-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

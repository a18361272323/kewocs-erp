<template>
  <div class="mobile-page">
    <!-- 顶部导航 -->

    <!-- 基础信息 -->
    <div class="form-section">
      <van-cell-group inset>
        <van-field
          v-model="form.supplierName"
          label="供应�?
          placeholder="请选择供应�?
          readonly
          is-link
          @click="showSupplierPicker = true"
        />
        <van-field
          v-model="form.warehouseName"
          label="入库仓库"
          placeholder="请选择仓库"
          readonly
          is-link
          @click="showWarehousePicker = true"
        />
        <van-field
          v-model="form.productName"
          label="商品类型"
          placeholder="请选择商品类型"
          readonly
          is-link
          @click="showProductPicker = true"
        />
        <van-field
          v-model="form.remark"
          label="备注"
          placeholder="可选填"
          type="textarea"
          rows="2"
        />
      </van-cell-group>
    </div>

    <!-- SN 码录入区 -->
    <div class="sn-section">
      <div class="section-header">
        <span class="section-title">SN码列�?/span>
        <van-tag type="primary" size="medium">已录 {{ snList.length }} �?/van-tag>
      </div>

      <!-- 扫码/输入�?-->
      <div class="sn-input-area">
        <van-field
          id="snInput"
          ref="snInputRef"
          v-model="currentSn"
          placeholder="扫描或输入SN码，按回车添�?
          :border="false"
          right-icon="scan"
          @keyup.enter="addSn"
          @click-right-icon="startScan"
        >
          <template #button>
            <van-button size="small" type="primary" @click="addSn">添加</van-button>
          </template>
        </van-field>
      </div>

      <!-- 批量导入按钮 -->
      <div class="batch-import-area">
        <van-button size="small" plain type="primary" icon="description" @click="showBatchImport = true">批量导入</van-button>
      </div>

      <!-- 批量导入弹窗 -->
      <van-dialog
        v-model:show="showBatchImport"
        title="批量导入SN�?
        show-cancel-button
        :before-close="onBatchImportConfirm"
      >
        <div style="padding: 16px;">
          <van-field
            v-model="batchSnText"
            type="textarea"
            placeholder="每行一个SN码，支持从Excel复制粘贴&#10;例如�?#10;SN202501001&#10;SN202501002&#10;SN202501003"
            rows="8"
            autosize
            :border="true"
          />
          <div style="margin-top: 8px; color: #999; font-size: 12px;">
            检测到 {{ batchSnPreviewCount }} 个有效SN�?          </div>
        </div>
      </van-dialog>

      <!-- SN 列表 -->
      <van-cell-group inset>
        <van-swipe-cell v-for="(item, index) in snList" :key="index">
          <van-cell>
            <template #title>
              <div class="sn-title">{{ item.snCode }}</div>
              <div class="sn-label">{{ item.productName }}</div>
              <div v-if="item.specification || item.model" class="sn-spec">
                {{ item.specification }} {{ item.model }}
              </div>
              <div v-if="item.productCode" class="sn-code">编码: {{ item.productCode }}</div>
            </template>
            <template #value>
              <div class="sn-price" v-if="item.price">¥{{ item.price.toFixed(2) }}</div>
            </template>
          </van-cell>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="removeSn(index)"
            />
          </template>
        </van-swipe-cell>
        <van-cell v-if="snList.length === 0" title="暂无SN码，请扫描或手动输入" />
      </van-cell-group>
    </div>

    <!-- 底部确认按钮 -->
    <div class="bottom-bar">
      <van-button
        type="primary"
        size="large"
        round
        block
        :disabled="!canSubmit"
        :loading="submitting"
        @click="submitStockIn"
      >
        确认入库（{{ snList.length }}台）
      </van-button>
    </div>

    <!-- 供应商选择�?-->
    <van-popup v-model:show="showSupplierPicker" position="bottom">
      <van-picker
        :columns="supplierColumns"
        @confirm="onSupplierConfirm"
        @cancel="showSupplierPicker = false"
        title="选择供应�?
      />
    </van-popup>

    <!-- 仓库选择�?-->
    <van-popup v-model:show="showWarehousePicker" position="bottom">
      <van-picker
        :columns="warehouseColumns"
        @confirm="onWarehouseConfirm"
        @cancel="showWarehousePicker = false"
        title="选择仓库"
      />
    </van-popup>

    <!-- 商品类型选择器（新SN时弹出） -->
    <van-popup v-model:show="showProductPicker" position="bottom">
      <van-picker
        :columns="productColumns"
        @confirm="onProductConfirm"
        @cancel="showProductPicker = false"
        title="选择商品类型"
      />
    </van-popup>

    <!-- 隐藏元素：拍�?选图后识别条�?-->
    <input ref="fileInput" type="file" accept="image/*" capture="environment" style="display:none" @change="onFileChange" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showDialog } from 'vant'
import { decodeFromImage } from '../../utils/barcodeScanner.js'
import { stockInApi, supplierApi, warehouseApi, snApi, productApi } from '../../api'
import { getCacheOrFetch } from '../../utils/cache.js'
import { playSuccessSound, playErrorSound } from '../../utils/audioFeedback.js'
import { createTransaction } from '../../utils/transaction.js'

const goBack = () => window.goBack()

// 表单数据
const form = ref({
  supplierId: '',
  supplierName: '',
  warehouseId: '',
  warehouseName: '',
  productId: '',
  productName: '',
  productCode: '',
  specification: '',
  model: '',
  price: 0,
  remark: ''
})

const currentSn = ref('')
const showBatchImport = ref(false)
const batchSnText = ref('')
const batchSnPreviewCount = computed(() => {
  return batchSnText.value.split(/[\n\r]+/).map(s => s.trim()).filter(s => s.length > 0).length
})
const snList = ref([])
const submitting = ref(false)

// 选择�?const showSupplierPicker = ref(false)
const showWarehousePicker = ref(false)
const showProductPicker = ref(false)
const supplierColumns = ref([])
const warehouseColumns = ref([])
const productColumns = ref([])

// 扫码相关
const fileInput = ref(null)
const snInputRef = ref(null)

// 聚焦SN输入�?const focusSnInput = () => {
  setTimeout(() => {
    const el = document.getElementById('snInput')
    if (el) {
      el.focus()
      el.click()
    }
  }, 300)
}

// 当前选中的商品详�?const currentProduct = ref(null)

const canSubmit = computed(() => {
  return form.value.supplierId && form.value.warehouseId && form.value.productId && snList.value.length > 0
})

// 加载基础数据
const loadBaseData = async () => {
  try {
    // 供应商列表（带缓存）
    const suppliers = await getCacheOrFetch('suppliers', () => supplierApi.getList({ current: 1, pageSize: 1000 }))
    const supList = suppliers?.list || suppliers || []
    supplierColumns.value = supList.map(s => ({
      text: s.name || s.supplierName,
      value: s.id
    }))

    // 仓库列表（带缓存�?    const warehouses = await getCacheOrFetch('warehouses', () => warehouseApi.getList({ current: 1, pageSize: 1000 }))
    const whList = warehouses?.list || warehouses || []
    warehouseColumns.value = whList.map(w => ({
      text: w.name || w.warehouseName,
      value: w.id
    }))

    // 商品列表（带缓存，用于新SN选择品类�?    const products = await getCacheOrFetch('productTypes', () => productApi.getList({ current: 1, pageSize: 1000 }))
    const prodList = products?.list || products || []
    productColumns.value = prodList.map(p => ({
      text: `${p.productName || p.name} (${p.productCode || p.code || ''})`,
      value: p.id,
      productCode: p.productCode || p.code || '',
      productName: p.productName || p.name || '',
      specification: p.specification || '',
      model: p.model || '',
      salePrice: p.salePrice || p.price || 0
    }))
  } catch (error) {
    console.error('加载基础数据失败:', error)
    showToast('基础数据加载失败: ' + (error.message || '未知错误'))
  }
}

// 添加 SN
const addSn = async () => {
  const sn = currentSn.value.trim().toUpperCase()
  if (!sn) {
    showToast('请输入SN�?)
    return
  }

  // 必须先选择商品类型
  if (!form.value.productId) {
    showToast('请先选择商品类型')
    showProductPicker.value = true
    return
  }

  // 检查重�?  if (snList.value.some(item => item.snCode === sn)) {
    showToast('该SN码已添加')
    currentSn.value = ''
    return
  }

  // 检�?SN 是否已存在于库存�?  try {
    const snRes = await snApi.getList({ sn_code: sn, current: 1, pageSize: 1 })
    const snRecord = snRes.data?.list?.[0] || snRes.body?.list?.[0]

    if (snRecord) {
      showToast(`SN ${sn} 已存在于库存中，请勿重复入库`)
      currentSn.value = ''
      return
    }
  } catch (e) {
    console.warn('SN 存在性检查失�?', e)
  }

  // �?SN，使用当前选中的商品类�?  snList.value.push({
    snCode: sn,
    productName: form.value.productName,
    productId: form.value.productId,
    productCode: form.value.productCode,
    specification: form.value.specification,
    model: form.value.model,
    price: form.value.price,
    status: 'valid'
  })
  currentSn.value = ''
  playSuccessSound()
  showToast(`已添�? ${sn} (${form.value.productName})`)
  focusSnInput()
}

// 批量导入SN确认（异步，逐个检查数据库重复�?const onBatchImportConfirm = async () => {
  const lines = batchSnText.value.split(/[\n\r]+/).map(s => s.trim().toUpperCase()).filter(s => s.length > 0)
  if (lines.length === 0) {
    showToast('请输入SN�?)
    return
  }

  if (!form.value.productId) {
    showToast('请先选择商品类型')
    showProductPicker.value = true
    return
  }

  let addedCount = 0
  let dupInList = 0
  let dupInStock = 0
  const existingCodes = new Set(snList.value.map(item => item.snCode))

  for (const sn of lines) {
    if (existingCodes.has(sn)) {
      dupInList++
      continue
    }
    // 检查数据库是否已存在该SN
    try {
      const snRes = await snApi.getList({ sn_code: sn, current: 1, pageSize: 1 })
      const snRecord = snRes.data?.list?.[0] || snRes.body?.list?.[0]
      if (snRecord) {
        dupInStock++
        continue
      }
    } catch (e) {
      console.warn(`批量导入SN ${sn} 存在性检查失�?`, e)
    }
    existingCodes.add(sn)
    snList.value.push({
      snCode: sn,
      productName: form.value.productName,
      productId: form.value.productId,
      productCode: form.value.productCode,
      specification: form.value.specification,
      model: form.value.model,
      price: form.value.price,
      status: 'valid'
    })
    addedCount++
  }

  playSuccessSound()
  const parts = [`成功添加 ${addedCount} 条`]
  if (dupInList > 0) parts.push(`列表重复 ${dupInList} 条`)
  if (dupInStock > 0) parts.push(`库存已存�?${dupInStock} 条`)
  showToast(parts.join('�?))

  batchSnText.value = ''
  showBatchImport.value = false
  focusSnInput()
}

// 选择商品类型确认
const onProductConfirm = ({ selectedOptions }) => {
  const opt = selectedOptions[0]
  form.value.productId = opt.value
  form.value.productName = opt.productName
  form.value.productCode = opt.productCode
  form.value.specification = opt.specification || ''
  form.value.model = opt.model || ''
  form.value.price = parseFloat(opt.salePrice) || 0
  showProductPicker.value = false
  showToast(`已选择商品: ${opt.productName}`)
}

// 删除 SN
const removeSn = (index) => {
  snList.value.splice(index, 1)
}

// 选择器确�?const onSupplierConfirm = ({ selectedOptions }) => {
  form.value.supplierId = selectedOptions[0].value
  form.value.supplierName = selectedOptions[0].text
  showSupplierPicker.value = false
}

const onWarehouseConfirm = ({ selectedOptions }) => {
  form.value.warehouseId = selectedOptions[0].value
  form.value.warehouseName = selectedOptions[0].text
  showWarehousePicker.value = false
}

// 提交入库
const submitStockIn = async () => {
  if (submitting.value) return

  // 表单完整性校�?  if (!form.value.supplierId) {
    showToast('请选择供应�?)
    return
  }
  if (!form.value.warehouseId) {
    showToast('请选择入库仓库')
    return
  }
  if (!form.value.productId) {
    showToast('请选择商品类型')
    return
  }
  if (snList.value.length === 0) {
    showToast('请至少录入一个SN�?)
    return
  }

  try {
    await showDialog({
      title: '确认入库',
      message: `供应商：${form.value.supplierName}\n仓库�?{form.value.warehouseName}\n机器数量�?{snList.value.length}台`,
      showCancelButton: true
    })
  } catch {
    return
  }

  submitting.value = true
  try {
    const tx = createTransaction()
    const today = new Date().toISOString().split('T')[0]
    const totalAmount = snList.value.reduce((sum, s) => sum + (Number(s.price) || 0), 0)

    // 1. 创建入库单主表（含SN明细�?    const stockInRes = await stockInApi.add({
      supplierId: form.value.supplierId,
      supplierName: form.value.supplierName,
      warehouseId: form.value.warehouseId,
      warehouseName: form.value.warehouseName,
      orderDate: today,
      remark: form.value.remark,
      totalAmount,
      items: snList.value.map(s => ({
        snCode: s.snCode,
        productId: s.productId || form.value.productId,
        productName: s.productName || form.value.productName,
        productCode: s.productCode || form.value.productCode,
        unitPrice: s.price || 0
      }))
    })

    const stockInId = stockInRes.data?.id || stockInRes.body?.id || stockInRes.data || stockInRes.body
    // 注册回滚：删除入库单
    tx.registerRollback(async () => {
      if (stockInId) { try { await stockInApi.delete(stockInId) } catch (e) { console.warn('回滚删除入库单失�?', e) } }
    }, '删除入库�?)

    // 2. 创建/更新 SN 记录（使用事务，部分失败则回滚）
    const snSteps = snList.value.map(item => ({
      desc: `SN ${item.snCode} 入库`,
      action: async () => {
        const snData = {
          snCode: item.snCode,
          productId: item.productId,
          productName: item.productName,
          productCode: item.productCode,
          purchasePrice: item.price,
          warehouseId: form.value.warehouseId,
          warehouseName: form.value.warehouseName,
          status: 'INSTOCK',
          stockInTime: today,
          sourceOrderNo: stockInId,
          sourceOrderType: 'PURCHASE'
        }
        try {
          return await snApi.add(snData)
        } catch (addErr) {
          const snRes = await snApi.getList({ sn_code: item.snCode, pageSize: 1 })
          const snRecord = snRes?.data?.list?.[0] || snRes?.list?.[0]
          if (snRecord) {
            return await snApi.edit({ id: snRecord.id, ...snData })
          }
          throw addErr
        }
      },
      rollback: async () => {
        try {
          // 回滚：将SN状态恢复为非INSTOCK
          await snApi.edit({ snCode: item.snCode, status: 'PENDING', warehouseId: null, sourceOrderNo: null })
        } catch (e) { console.warn(`回滚SN ${item.snCode} 失败:`, e) }
      }
    }))

    try {
      await tx.executeAll(snSteps)
    } catch (txErr) {
      // 事务回滚已自动执行，删除入库�?      try { await stockInApi.delete(stockInId) } catch (e) { console.warn('删除入库单失�?', e) }
      throw txErr
    }

    playSuccessSound()

    // 重置表单
    form.value = {
      supplierId: '', supplierName: '',
      warehouseId: '', warehouseName: '',
      productId: '', productName: '', productCode: '',
      specification: '', model: '', price: 0,
      remark: ''
    }
    snList.value = []

    // 成功提示，不自动跳走
    showToast({ message: '入库成功', type: 'success', duration: 3000 })
  } catch (error) {
    showToast('入库失败: ' + (error.message || '未知错误'))
  } finally {
    submitting.value = false
  }
}

// 扫码 - 直接唤起系统文件选择（支持拍照或从相册获取）
const startScan = () => {
  fileInput.value?.click()
}

const onFileChange = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  try {
    const code = await decodeFromImage(file)
    currentSn.value = code.trim().toUpperCase()
    addSn()
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
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.form-section {
  padding: 12px 0;
}

.sn-section {
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

.sn-input-area {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 4px;
}

.sn-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.sn-label {
  font-size: 13px;
  color: #666;
  margin-top: 2px;
}

.sn-spec {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

.sn-code {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.sn-price {
  font-size: 14px;
  font-weight: 600;
  color: #ee0a24;
}

.delete-button {
  height: 100%;
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
.batch-textarea {
  width: 100%;
  min-height: 120px;
  padding: 10px;
  border: 1px solid #dcdee0;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  font-family: monospace;
}
</style>

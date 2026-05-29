<template>
  <div class="mobile-page">
    <!-- 顶部导航 -->

    <!-- 基础信息 -->
    <div class="form-section">
      <van-cell-group inset>
        <van-field
          v-model="form.supplierName"
          label="供应商"
          placeholder="请选择供应商"
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
        <span class="section-title">SN码列表</span>
        <van-tag type="primary" size="medium">已录 {{ snList.length }} 台</van-tag>
      </div>

      <!-- 扫码/输入框 -->
      <div class="sn-input-area">
        <van-field
          id="snInput"
          ref="snInputRef"
          v-model="currentSn"
          placeholder="扫描或输入SN码，按回车添加"
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

    <!-- 供应商选择器 -->
    <van-popup v-model:show="showSupplierPicker" position="bottom">
      <van-picker
        :columns="supplierColumns"
        @confirm="onSupplierConfirm"
        @cancel="showSupplierPicker = false"
        title="选择供应商"
      />
    </van-popup>

    <!-- 仓库选择器 -->
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

    <!-- 隐藏元素：拍照/选图后识别条码 -->
    <input ref="fileInput" type="file" accept="image/*" capture="environment" style="display:none" @change="onFileChange" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showDialog } from 'vant'
import { decodeFromImage } from '../../utils/barcodeScanner.js'
import { stockInApi, supplierApi, warehouseApi, snApi, productApi } from '../../api'

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
const snList = ref([])
const submitting = ref(false)

// 选择器
const showSupplierPicker = ref(false)
const showWarehousePicker = ref(false)
const showProductPicker = ref(false)
const supplierColumns = ref([])
const warehouseColumns = ref([])
const productColumns = ref([])

// 扫码相关
const fileInput = ref(null)
const snInputRef = ref(null)

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

// 当前选中的商品详情
const currentProduct = ref(null)

const canSubmit = computed(() => {
  return form.value.supplierId && form.value.warehouseId && form.value.productId && snList.value.length > 0
})

// 加载基础数据
const loadBaseData = async () => {
  try {
    // 供应商列表
    const supRes = await supplierApi.getList({ current: 1, pageSize: 1000 })
    console.log('[StockIn] 供应商响应:', JSON.parse(JSON.stringify(supRes)))
    const suppliers = supRes.data?.list || supRes.body?.list || supRes.list || []
    console.log('[StockIn] 供应商数量:', suppliers.length)
    supplierColumns.value = suppliers.map(s => ({
      text: s.name || s.supplierName,
      value: s.id
    }))

    // 仓库列表
    const whRes = await warehouseApi.getList({ current: 1, pageSize: 1000 })
    console.log('[StockIn] 仓库响应:', JSON.parse(JSON.stringify(whRes)))
    const warehouses = whRes.data?.list || whRes.body?.list || whRes.list || []
    console.log('[StockIn] 仓库数量:', warehouses.length)
    warehouseColumns.value = warehouses.map(w => ({
      text: w.name || w.warehouseName,
      value: w.id
    }))

    // 商品列表（用于新SN选择品类）
    const prodRes = await productApi.getList({ current: 1, pageSize: 1000 })
    console.log('[StockIn] 商品响应:', JSON.parse(JSON.stringify(prodRes)))
    const products = prodRes.data?.list || prodRes.body?.list || prodRes.list || []
    console.log('[StockIn] 商品数量:', products.length)
    productColumns.value = products.map(p => ({
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
    showToast('请输入SN码')
    return
  }

  // 必须先选择商品类型
  if (!form.value.productId) {
    showToast('请先选择商品类型')
    showProductPicker.value = true
    return
  }

  // 检查重复
  if (snList.value.some(item => item.snCode === sn)) {
    showToast('该SN码已添加')
    currentSn.value = ''
    return
  }

  // 检查 SN 是否已存在于库存中
  try {
    const snRes = await snApi.getList({ sn_code: sn, current: 1, pageSize: 1 })
    const snRecord = snRes.data?.list?.[0] || snRes.body?.list?.[0]

    if (snRecord) {
      showToast(`SN ${sn} 已存在于库存中，请勿重复入库`)
      currentSn.value = ''
      return
    }
  } catch (e) {
    console.warn('SN 存在性检查失败:', e)
  }

  // 新 SN，使用当前选中的商品类型
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
  currentSn.value = ''
  showToast(`已添加: ${sn} (${form.value.productName})`)
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

// 选择器确认
const onSupplierConfirm = ({ selectedOptions }) => {
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

  // 表单完整性校验
  if (!form.value.supplierId) {
    showToast('请选择供应商')
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
    showToast('请至少录入一个SN码')
    return
  }

  try {
    await showDialog({
      title: '确认入库',
      message: `供应商：${form.value.supplierName}\n仓库：${form.value.warehouseName}\n机器数量：${snList.value.length}台`,
      showCancelButton: true
    })
  } catch {
    return
  }

  submitting.value = true
  try {
    // 1. 创建入库单主表
    const stockInRes = await stockInApi.add({
      supplierId: form.value.supplierId,
      supplierName: form.value.supplierName,
      warehouseId: form.value.warehouseId,
      warehouseName: form.value.warehouseName,
      remark: form.value.remark,
      status: 'completed'
    })

    const stockInId = stockInRes.data?.id || stockInRes.body?.id || stockInRes.data || stockInRes.body

    // 2. 创建 SN 记录
    for (const item of snList.value) {
      try {
        await snApi.add({
          snCode: item.snCode,
          productId: item.productId,
          productName: item.productName,
          productCode: item.productCode,
          purchasePrice: item.price,
          warehouseId: form.value.warehouseId,
          warehouseName: form.value.warehouseName,
          status: 'INSTOCK',
          sourceOrderNo: stockInId,
          sourceOrderType: 'PURCHASE'
        })
      } catch (e) {
        console.warn(`SN ${item.snCode} 登记失败:`, e)
      }
    }

    showToast('入库成功')

    // 重置表单
    form.value = {
      supplierId: '', supplierName: '',
      warehouseId: '', warehouseName: '',
      productId: '', productName: '', productCode: '',
      specification: '', model: '', price: 0,
      remark: ''
    }
    snList.value = []

    // 返回首页
    setTimeout(() => {
      window.goBack()
    }, 1000)
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
</style>

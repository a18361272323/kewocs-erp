<template>
  <div class="mobile-page">
    <!-- 顶部导航 -->

    <!-- 基础信息 -->
    <div class="form-section">
      <van-cell-group inset>
        <van-field
          v-model="form.customerName"
          label="客户"
          placeholder="请选择客户"
          readonly
          is-link
          @click="showCustomerPicker = true"
        />
        <van-field
          v-model="form.warehouseName"
          label="出库仓库"
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

      <div class="sn-input-area">
        <van-field
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

      <van-cell-group inset>
        <van-swipe-cell v-for="(item, index) in snList" :key="index">
          <van-cell>
            <template #title>
              <div>{{ item.snCode }}</div>
              <div class="sn-spec" v-if="item.spec || item.model">
                {{ item.spec }}{{ item.model ? ' / ' + item.model : '' }}
              </div>
              <div class="sn-name">{{ item.productName }}</div>
            </template>
            <template #value>
              <div class="sn-price-edit">
                <span class="price-prefix">¥</span>
                <input
                  type="number"
                  class="price-input"
                  :value="item.salePrice"
                  @input="updatePrice(index, $event)"
                  placeholder="售价"
                  step="0.01"
                  min="0"
                />
              </div>
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
        <van-cell v-if="snList.length > 0" title-class="total-cell" value-class="total-value">
          <template #title>
            <span>合计 ({{ snList.length }}台)</span>
          </template>
          <template #value>
            <span class="total-amount">¥{{ totalAmount }}</span>
          </template>
        </van-cell>
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
        @click="submitStockOut"
      >
        确认出库（{{ snList.length }}台）
      </van-button>
    </div>

    <!-- 客户选择器 -->
    <van-popup v-model:show="showCustomerPicker" position="bottom">
      <van-picker
        :columns="customerColumns"
        @confirm="onCustomerConfirm"
        @cancel="showCustomerPicker = false"
        title="选择客户"
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

    <!-- 商品类型选择器 -->
    <van-popup v-model:show="showProductPicker" position="bottom">
      <van-picker
        :columns="productColumns"
        @confirm="onProductConfirm"
        @cancel="showProductPicker = false"
        title="选择商品类型"
      />
    </van-popup>
    <input ref="fileInput" type="file" accept="image/*" capture="environment" style="display:none" @change="onFileChange" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showDialog } from 'vant'
import { decodeFromImage } from '../../utils/barcodeScanner.js'
import { stockOutApi, customerApi, warehouseApi, productApi, snApi, pushReceivable, buildReceivablePayload } from '../../api'

// 表单数据
const form = ref({
  customerId: '',
  customerName: '',
  customerCode: '',
  warehouseId: '',
  warehouseName: '',
  productId: '',
  productName: '',
  remark: ''
})

const currentSn = ref('')
const snList = ref([])
const submitting = ref(false)

// 出库合计金额
const totalAmount = computed(() => {
  return snList.value.reduce((sum, item) => sum + (parseFloat(item.salePrice) || 0), 0).toFixed(2)
})

const goBack = () => {
  window.goBack()
}

// 选择器
const showCustomerPicker = ref(false)
const showWarehousePicker = ref(false)
const showProductPicker = ref(false)
const customerColumns = ref([])
const warehouseColumns = ref([])
const productColumns = ref([])

// 扫码相关
const fileInput = ref(null)

const canSubmit = computed(() => {
  return form.value.customerId && form.value.warehouseId && form.value.productId && snList.value.length > 0
})

// 加载基础数据
const loadBaseData = async () => {
  try {
    // 客户列表
    const cusRes = await customerApi.getList({ current: 1, pageSize: 1000 })
    const customers = cusRes.data?.list || cusRes.body?.list || []
    customerColumns.value = customers.map(c => ({
      text: c.name || c.customerName,
      value: c.id,
      customerCode: c.customerCode || c.customer_code || ''
    }))

    // 仓库列表
    const whRes = await warehouseApi.getList({ current: 1, pageSize: 1000 })
    const warehouses = whRes.data?.list || whRes.body?.list || []
    warehouseColumns.value = warehouses.map(w => ({
      text: w.name || w.warehouseName,
      value: w.id
    }))

    // 商品类型列表
    const prodRes = await productApi.getList({ current: 1, pageSize: 1000 })
    const products = prodRes.data?.list || prodRes.body?.list || []
    productColumns.value = products.map(p => ({
      text: `${p.name || p.productName} ${p.spec ? '(' + p.spec + ')' : ''}`,
      value: p.id,
      code: p.code || p.productCode || '',
      spec: p.spec || p.specification || '',
      model: p.model || ''
    }))
  } catch (error) {
    console.error('加载基础数据失败:', error)
  }
}

// 添加 SN
const addSn = async () => {
  const sn = currentSn.value.trim().toUpperCase()
  if (!sn) {
    showToast('请输入SN码')
    return
  }

  // 检查重复
  if (snList.value.some(item => item.snCode === sn)) {
    showToast('该SN码已添加')
    currentSn.value = ''
    return
  }

  if (!form.value.productId) {
    showToast('请先选择商品类型')
    return
  }

  // 校验 SN 是否存在且库存正常
  let productName = ''
  let productId = ''
  let productCode = ''
  let spec = ''
  let model = ''
  let price = 0
  let snStatus = ''
  let snRecordId = ''
  try {
    const snRes = await snApi.getList({ sn_code: sn, current: 1, pageSize: 1 })
    const snRecord = snRes.data?.list?.[0] || snRes.body?.list?.[0]
    if (snRecord) {
      productName = snRecord.productName || snRecord.product_name
      productId = snRecord.productId || snRecord.product_id
      productCode = snRecord.productCode || snRecord.product_code || ''
      spec = snRecord.spec || snRecord.specification || ''
      model = snRecord.model || ''
      price = parseFloat(snRecord.price) || 0
      snStatus = snRecord.status
      snRecordId = snRecord.id
      if (snStatus !== 'in_stock') {
        showToast(`该SN码状态为${snStatus || '异常'}，不可出库`)
        currentSn.value = ''
        return
      }
      // 校验SN是否属于选中的商品类型
      if (String(productId) !== String(form.value.productId)) {
        showToast(`该SN码所属商品与选中的商品类型不一致`)
        currentSn.value = ''
        return
      }
    } else {
      showToast('SN码未登记，无法出库')
      currentSn.value = ''
      return
    }
  } catch (e) {
    showToast('SN校验失败')
    return
  }

  snList.value.push({
    snId: snRecordId,
    snCode: sn,
    productName: productName || '未知型号',
    productId: productId,
    productCode: productCode,
    spec,
    model,
    price: price,
    salePrice: price, // 默认售价=采购价，可手动修改
    status: 'valid'
  })

  currentSn.value = ''
  showToast(`已添加: ${sn}`)
}

// 删除 SN
const removeSn = (index) => {
  snList.value.splice(index, 1)
}

// 修改 SN 售价
const updatePrice = (index, event) => {
  const val = parseFloat(event.target.value) || 0
  snList.value[index].salePrice = val
}

// 选择器确认
const onCustomerConfirm = ({ selectedOptions }) => {
  form.value.customerId = selectedOptions[0].value
  form.value.customerName = selectedOptions[0].text
  form.value.customerCode = selectedOptions[0].customerCode || ''
  showCustomerPicker.value = false
}

const onWarehouseConfirm = ({ selectedOptions }) => {
  form.value.warehouseId = selectedOptions[0].value
  form.value.warehouseName = selectedOptions[0].text
  showWarehousePicker.value = false
}

const onProductConfirm = ({ selectedOptions }) => {
  form.value.productId = selectedOptions[0].value
  form.value.productName = selectedOptions[0].text
  showProductPicker.value = false
  // 切换商品类型时清空已扫描的SN
  if (snList.value.length > 0) {
    snList.value = []
    showToast('商品类型已变更，已清空SN列表')
  }
}

// 提交出库
const submitStockOut = async () => {
  if (submitting.value) return

  // 表单完整性校验
  if (!form.value.customerId) {
    showToast('请选择客户')
    return
  }
  if (!form.value.warehouseId) {
    showToast('请选择出库仓库')
    return
  }
  if (!form.value.productId) {
    showToast('请选择商品类型')
    return
  }
  if (snList.value.length === 0) {
    showToast('请至少扫描一个SN码')
    return
  }

  try {
    await showDialog({
      title: '确认出库',
      message: `客户：${form.value.customerName}\n仓库：${form.value.warehouseName}\n机器数量：${snList.value.length}台`,
      showCancelButton: true
    })
  } catch {
    return
  }

  submitting.value = true
  try {
    // 1. 创建出库单主表
    const orderNo = 'CK' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0')
    const orderDate = new Date().toISOString().split('T')[0]
    const totalAmount = snList.value.reduce((sum, item) => sum + (parseFloat(item.salePrice) || 0), 0)
    const stockOutRes = await stockOutApi.add({
      customerId: form.value.customerId,
      customerName: form.value.customerName,
      warehouseId: form.value.warehouseId,
      warehouseName: form.value.warehouseName,
      remark: form.value.remark,
      status: 'CONFIRMED',
      orderNo,
      orderDate,
      totalAmount
    })

    const stockOutId = stockOutRes.data?.id || stockOutRes.body?.id || stockOutRes.data?.primaryKeys?.[0] || stockOutRes.body?.primaryKeys?.[0] || ''

    // 2. 更新 SN 状态为已出库
    for (const item of snList.value) {
    const stockOutOrderNo = stockOutRes.data?.orderNo || stockOutRes.body?.orderNo || orderNo
      try {
        await snApi.edit({
          id: item.snId,
          snCode: item.snCode,
          status: 'SOLD',
          salePrice: item.salePrice,
          stockOutTime: orderDate,
          customerId: form.value.customerId,
          customerName: form.value.customerName,
          sourceOrderNo: stockOutOrderNo,
          sourceOrderType: 'SALE'
        })
      } catch (e) {
        console.warn(`SN ${item.snCode} 状态更新失败:`, e)
      }
    }

    // 3. 推送应收单
    try {
      if (!form.value.customerCode) {
        showToast('客户未配置编码，跳过应收单推送')
      } else {
        // 按 SN 中的商品信息构建明细
        const items = snList.value.map(item => ({
          productCode: item.productCode || 'UNKNOWN',
          productName: item.productName || '未知型号',
          quantity: 1,
          price: item.salePrice || item.price || 0
        }))

        const payload = buildReceivablePayload({
          customerCode: form.value.customerCode,
          billCode: stockOutRes.data?.billNo || String(stockOutId),
          billDate: new Date().toISOString().split('T')[0],
          items,
          upSysId: String(stockOutId),
          remark: form.value.remark || '销售出库自动生成'
        })

        await pushReceivable(payload)
      }
    } catch (e) {
      console.warn('应收单推送失败:', e)
      showToast('出库成功，但应收单推送失败')
    }

    showToast('出库成功')

    // 重置表单
    form.value = { customerId: '', customerName: '', customerCode: '', warehouseId: '', warehouseName: '', productId: '', productName: '', remark: '' }
    snList.value = []

    setTimeout(() => {
      window.goBack()
    }, 1000)
  } catch (error) {
    showToast('出库失败: ' + (error.message || '未知错误'))
  } finally {
    submitting.value = false
  }
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
  height: 100vh;
  overflow-y: auto;
  background: var(--color-canvas, #faf7f2);
  padding-bottom: 80px;
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
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.sn-input-area {
  background: var(--color-surface, #f3efe8);
  border-radius: 12px;
  margin-bottom: 8px;
  padding: 4px;
}

.sn-name {
  font-size: 12px;
  color: var(--color-ink-muted, #55514d);
  margin-top: 2px;
}

.sn-spec {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

.delete-button {
  height: 100%;
}

.sn-price-edit {
  display: flex;
  align-items: center;
  gap: 2px;
}

.price-prefix {
  font-size: 14px;
  color: #ee0a24;
  font-weight: 600;
}

.price-input {
  width: 70px;
  border: 1px solid #dcdee0;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 14px;
  color: var(--color-ink, #1c1915);
  text-align: right;
  outline: none;
  -moz-appearance: textfield;
}

.price-input::-webkit-inner-spin-button,
.price-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-input:focus {
  border-color: var(--color-primary, #5e6ad2);
}

.total-cell {
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.total-value {
  font-weight: 600;
}

.total-amount {
  font-size: 16px;
  color: #ee0a24;
  font-weight: 600;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: var(--color-surface, #f3efe8);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
}
</style>

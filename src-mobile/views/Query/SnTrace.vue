<template>
  <div class="mobile-page">
    <!-- 搜索区 -->
    <div class="search-section">
      <van-cell-group inset>
        <van-field
          v-model="searchSn"
          label="SN码"
          placeholder="扫描或输入SN码"
          clearable
          right-icon="scan"
          @keyup.enter="handleSearch"
          @click-right-icon="startScan"
        >
          <template #button>
            <van-button size="small" type="primary" @click="handleSearch">查询</van-button>
          </template>
        </van-field>
      </van-cell-group>

      <!-- 高级筛选 -->
      <van-cell-group inset style="margin-top: 8px;">
        <van-field
          v-model="filterProductName"
          label="商品"
          placeholder="请选择商品"
          readonly
          is-link
          @click="showProductPicker = true"
        />
        <van-field
          v-model="filterStatusName"
          label="状态"
          placeholder="请选择状态"
          readonly
          is-link
          @click="showStatusPicker = true"
        />
      </van-cell-group>
      <div class="filter-actions">
        <van-button size="small" @click="handleReset">重置筛选</van-button>
      </div>
    </div>

    <!-- SN 列表 -->
    <div class="list-section">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadMore"
      >
        <van-cell-group inset>
          <van-cell
            v-for="item in snList"
            :key="item.id || item.snCode"
            clickable
            @click="showTrace(item)"
          >
            <template #title>
              <div class="sn-code">{{ item.snCode }}</div>
              <div class="sn-product">{{ item.productName || '未知' }}</div>
            </template>
            <template #value>
              <van-tag :type="getStatusType(item.status)" size="medium">
                {{ getStatusText(item.status) }}
              </van-tag>
            </template>
            <template #label>
              <div class="sn-meta">
                {{ item.warehouseName || '未知仓库' }}
                <span v-if="item.specification || item.model"> · {{ item.specification }} {{ item.model }}</span>
              </div>
            </template>
            <template #right-icon>
              <van-icon name="arrow" style="line-height: inherit;" />
            </template>
          </van-cell>
        </van-cell-group>
        <div v-if="snList.length === 0 && !loading" class="empty-state">
          <van-icon name="search" size="40" color="var(--color-ink-tertiary, #a8a39e)" />
          <span class="empty-text">请输入SN码查询</span>
        </div>
      </van-list>
    </div>

    <!-- 溯源详情弹窗 -->
    <van-popup v-model:show="traceVisible" position="bottom" round :style="{ maxHeight: '80%' }">
      <div class="trace-popup">
        <div class="trace-header">
          <div>
            <div class="trace-sn">{{ currentSn?.snCode }}</div>
            <div class="trace-product">{{ currentSn?.productName }}</div>
          </div>
          <van-icon name="cross" size="20" @click="traceVisible = false" />
        </div>

        <!-- 当前状态 -->
        <van-cell-group inset style="margin-top: 8px;">
          <van-cell title="当前状态">
            <template #value>
              <van-tag :type="getStatusType(currentSn?.status)" size="medium">
                {{ getStatusText(currentSn?.status) }}
              </van-tag>
            </template>
          </van-cell>
          <van-cell title="所在仓库" :value="currentSn?.warehouseName || '-'" />
          <van-cell title="当前客户" :value="currentSn?.customerName || '-'" />
        </van-cell-group>

        <!-- 流转时间线 -->
        <div class="timeline-title">流转记录</div>
        <div v-if="traceList.length > 0" class="timeline">
          <div v-for="(item, index) in traceList" :key="index" class="timeline-item">
            <div class="timeline-dot" :class="getTimelineDotClass(item.actionType)"></div>
            <div v-if="index < traceList.length - 1" class="timeline-line"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <van-tag :type="getTimelineType(item.actionType)" size="medium">
                  {{ item.actionName || getActionText(item.actionType) }}
                </van-tag>
                <span class="timeline-time">{{ item.createTime }}</span>
              </div>
              <div class="timeline-body">
                <div v-if="item.orderNo" class="timeline-row">
                  <span class="timeline-label">单号</span>
                  <span>{{ item.orderNo }}</span>
                </div>
                <div v-if="item.warehouseName" class="timeline-row">
                  <span class="timeline-label">仓库</span>
                  <span>{{ item.warehouseName }}</span>
                </div>
                <div v-if="item.customerName" class="timeline-row">
                  <span class="timeline-label">客户</span>
                  <span>{{ item.customerName }}</span>
                </div>
                <div v-if="item.supplierName" class="timeline-row">
                  <span class="timeline-label">供应商</span>
                  <span>{{ item.supplierName }}</span>
                </div>
                <div v-if="item.remark" class="timeline-row">
                  <span class="timeline-label">备注</span>
                  <span>{{ item.remark }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="timeline-empty">暂无流转记录</div>
      </div>
    </van-popup>

    <!-- 商品选择器 -->
    <van-popup v-model:show="showProductPicker" position="bottom">
      <van-picker
        :columns="productColumns"
        @confirm="onProductConfirm"
        @cancel="showProductPicker = false"
        title="选择商品"
      />
    </van-popup>

    <!-- 状态选择器 -->
    <van-popup v-model:show="showStatusPicker" position="bottom">
      <van-picker
        :columns="statusColumns"
        @confirm="onStatusConfirm"
        @cancel="showStatusPicker = false"
        title="选择状态"
      />
    </van-popup>

    <input ref="fileInput" type="file" accept="image/*" capture="environment" style="display:none" @change="onFileChange" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { showToast } from 'vant'
import { decodeFromImage } from '../../utils/barcodeScanner.js'
import { snApi, productApi } from '../../api'

// 搜索
const searchSn = ref('')
const filterProductId = ref('')
const filterProductName = ref('')
const filterStatus = ref('')
const filterStatusName = ref('')

// 选择器
const showProductPicker = ref(false)
const showStatusPicker = ref(false)
const productColumns = ref([])
const statusColumns = [
  { text: '已采购', value: 'PURCHASED' },
  { text: '在库', value: 'INSTOCK' },
  { text: '已销售', value: 'SOLD' },
  { text: '已退货', value: 'RETURN' },
  { text: '已报废', value: 'SCRAP' }
]

// SN列表
const loading = ref(false)
const finished = ref(false)
const snList = ref([])
const pagination = reactive({ current: 1, pageSize: 20, total: 0 })

// 溯源
const traceVisible = ref(false)
const currentSn = ref(null)
const traceList = ref([])

// 扫码
const fileInput = ref(null)

const getStatusType = (status) => {
  const map = { PURCHASED: 'default', INSTOCK: 'success', 'in_stock': 'success', SOLD: 'warning', 'sold': 'warning', RETURN: 'danger', 'returned': 'danger', SCRAP: 'default', 'scrapped': 'default' }
  return map[status] || 'default'
}

const getStatusText = (status) => {
  const map = { PURCHASED: '已采购', INSTOCK: '在库', 'in_stock': '在库', SOLD: '已销售', 'sold': '已售', RETURN: '已退货', 'returned': '已退货', SCRAP: '已报废', 'scrapped': '已报废' }
  return map[status] || status || '未知'
}

const getTimelineType = (action) => {
  const map = { STOCK_IN: 'success', STOCK_OUT: 'warning', RETURN: 'danger', CHECK: 'primary', TRANSFER: 'default', SCRAP: 'default' }
  return map[action] || 'default'
}

const getTimelineDotClass = (action) => {
  const map = { STOCK_IN: 'dot-green', STOCK_OUT: 'dot-orange', RETURN: 'dot-red', CHECK: 'dot-blue', TRANSFER: 'dot-gray', SCRAP: 'dot-gray' }
  return map[action] || 'dot-gray'
}

const getActionText = (action) => {
  const map = { STOCK_IN: '入库', STOCK_OUT: '出库', RETURN: '退货', CHECK: '盘点', TRANSFER: '调拨', SCRAP: '报废' }
  return map[action] || action || '操作'
}

// 加载商品列表
const loadBaseData = async () => {
  try {
    const prodRes = await productApi.getList({ current: 1, pageSize: 1000 })
    const products = prodRes.data?.list || prodRes.body?.list || prodRes.list || []
    productColumns.value = products.map(p => ({
      text: p.productName || p.name,
      value: p.id
    }))
  } catch (e) {
    console.warn('加载商品列表失败:', e)
  }
}

// 加载SN列表
const loadSnList = async (reset = false) => {
  if (reset) {
    pagination.current = 1
    snList.value = []
    finished.value = false
  }

  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchSn.value) params.sn_code = searchSn.value.trim().toUpperCase()
    if (filterProductId.value) params.product_id = filterProductId.value
    if (filterStatus.value) params.status = filterStatus.value

    const res = await snApi.getList(params)
    const list = res.data?.list || res.body?.list || []
    const total = res.data?.total || res.body?.total || 0

    if (reset) {
      snList.value = list
    } else {
      snList.value.push(...list)
    }
    pagination.total = total
    finished.value = snList.value.length >= total
  } catch (error) {
    console.error('加载SN列表失败:', error)
    showToast('查询失败')
    finished.value = true
  } finally {
    loading.value = false
  }
}

const loadMore = () => {
  if (!finished.value) {
    pagination.current++
    loadSnList(false)
  }
}

// 搜索
const handleSearch = () => {
  loadSnList(true)
}

// 重置
const handleReset = () => {
  searchSn.value = ''
  filterProductId.value = ''
  filterProductName.value = ''
  filterStatus.value = ''
  filterStatusName.value = ''
  loadSnList(true)
}

// 选择器确认
const onProductConfirm = ({ selectedOptions }) => {
  filterProductId.value = selectedOptions[0].value
  filterProductName.value = selectedOptions[0].text
  showProductPicker.value = false
  handleSearch()
}

const onStatusConfirm = ({ selectedOptions }) => {
  filterStatus.value = selectedOptions[0].value
  filterStatusName.value = selectedOptions[0].text
  showStatusPicker.value = false
  handleSearch()
}

// 查看溯源
const showTrace = async (item) => {
  currentSn.value = item
  traceList.value = []
  traceVisible.value = true

  try {
    const res = await snApi.getLogList({
      sn_code: item.snCode,
      current: 1,
      pageSize: 100
    })
    traceList.value = res.data?.list || res.body?.list || []
  } catch (e) {
    console.warn('加载溯源记录失败:', e)
    showToast('加载溯源记录失败')
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
    searchSn.value = code.trim().toUpperCase()
    handleSearch()
  } catch (err) {
    console.error('图片解码失败:', err)
    showToast('无法识别条码，请手动输入')
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
  background: var(--color-canvas, #faf7f2);
  padding-bottom: 20px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.search-section {
  padding: 12px 0 0;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
}

.list-section {
  padding: 0 12px;
}

.sn-code {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  font-family: monospace;
}

.sn-product {
  font-size: 13px;
  color: var(--color-ink-muted, #55514d);
  margin-top: 2px;
}

.sn-meta {
  font-size: 12px;
  color: var(--color-ink-subtle, #8a8580);
  margin-top: 2px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  gap: 8px;
}

.empty-text {
  color: var(--color-ink-subtle, #8a8580);
  font-size: 14px;
}

/* 溯源弹窗 */
.trace-popup {
  padding: 16px;
}

.trace-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.trace-sn {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  font-family: monospace;
}

.trace-product {
  font-size: 13px;
  color: var(--color-ink-muted, #55514d);
  margin-top: 2px;
}

.timeline-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  padding: 16px 0 8px 4px;
}

/* 时间线 */
.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline-item {
  position: relative;
  padding-bottom: 16px;
  padding-left: 16px;
}

.timeline-dot {
  position: absolute;
  left: -20px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #c8c9cc;
  z-index: 1;
}

.timeline-dot.dot-green { background: #07c160; }
.timeline-dot.dot-orange { background: #ff976a; }
.timeline-dot.dot-red { background: #ee0a24; }
.timeline-dot.dot-blue { background: var(--color-primary, #5e6ad2); }
.timeline-dot.dot-gray { background: #c8c9cc; }

.timeline-line {
  position: absolute;
  left: -16px;
  top: 18px;
  bottom: 0;
  width: 2px;
  background: #ebedf0;
}

.timeline-content {
  background: #f7f8fa;
  border-radius: 12px;
  padding: 10px 12px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.timeline-time {
  font-size: 12px;
  color: var(--color-ink-subtle, #8a8580);
}

.timeline-body {
  font-size: 13px;
  color: var(--color-ink-muted, #55514d);
}

.timeline-row {
  margin-top: 4px;
  display: flex;
  gap: 8px;
}

.timeline-label {
  color: var(--color-ink-subtle, #8a8580);
  white-space: nowrap;
}

.timeline-empty {
  text-align: center;
  color: var(--color-ink-subtle, #8a8580);
  padding: 20px 0;
  font-size: 14px;
}
</style>

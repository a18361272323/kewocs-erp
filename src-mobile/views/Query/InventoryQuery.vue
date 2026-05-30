<template>
  <div class="mobile-page">
    <!-- 筛选区 -->
    <div class="filter-section">
      <van-cell-group inset>
        <van-field
          v-model="filterProductName"
          label="商品"
          placeholder="商品名称搜索"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        />
        <van-field
          v-model="filterWarehouseName"
          label="仓库"
          placeholder="请选择仓库"
          readonly
          is-link
          @click="showWarehousePicker = true"
        />
      </van-cell-group>
      <div class="filter-actions">
        <van-button size="small" type="primary" @click="handleSearch">查询</van-button>
        <van-button size="small" @click="handleReset">重置</van-button>
      </div>
    </div>

    <!-- 汇总信息 -->
    <div class="summary-section">
      <div class="summary-card">
        <div class="summary-item">
          <span class="summary-value">{{ summary.totalProducts }}</span>
          <span class="summary-label">货品种类</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-item">
          <span class="summary-value">{{ summary.totalQuantity }}</span>
          <span class="summary-label">总库存</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-item">
          <span class="summary-value amount">¥{{ formatMoney(summary.totalAmount) }}</span>
          <span class="summary-label">库存金额</span>
        </div>
      </div>
    </div>

    <!-- 低库存预警 -->
    <div v-if="lowStockItems.length > 0" class="low-stock-section">
      <div class="section-title">
        <van-icon name="warning-o" color="#ee0a24" />
        <span>低库存预警 ({{ lowStockItems.length }})</span>
      </div>
      <van-cell-group inset>
        <van-cell
          v-for="item in lowStockItems.slice(0, 5)"
          :key="item.id || item.productCode"
          :title="item.productName"
          :label="item.productCode"
        >
          <template #value>
            <span class="low-stock-val">{{ item.quantity }}</span>
          </template>
          <template #right-icon>
            <van-tag type="danger" size="medium">{{ item.warehouseName || '库存不足' }}</van-tag>
          </template>
        </van-cell>
        <van-cell v-if="lowStockItems.length > 5" title="" value="" is-link @click="showAllLowStock = true">
          <template #title>
            <span class="more-link">查看全部 {{ lowStockItems.length }} 项</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 库存列表 -->
    <div class="list-section">
      <div class="section-title">库存明细</div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadMore"
      >
        <van-cell-group inset>
          <van-swipe-cell v-for="item in inventoryList" :key="item.id">
            <van-cell>
              <template #title>
                <div class="inv-product">{{ item.productName }}</div>
                <div class="inv-code">{{ item.productCode }}</div>
              </template>
              <template #value>
                <div class="inv-qty" :class="{ 'low': item.quantity < 10 }">{{ item.quantity }}</div>
                <div class="inv-amount">¥{{ formatMoney(item.stockAmount || item.costPrice * item.quantity) }}</div>
              </template>
              <template #label>
                <div class="inv-warehouse">{{ item.warehouseName }} · {{ item.unit || '台' }}</div>
              </template>
            </van-cell>
            <template #right>
              <van-button
                square
                text="详情"
                type="primary"
                class="detail-button"
                @click="showDetail(item)"
              />
            </template>
          </van-swipe-cell>
        </van-cell-group>
        <div v-if="inventoryList.length === 0 && !loading" class="empty-state">
          <van-icon name="search" size="40" color="var(--color-ink-tertiary, #a8a39e)" />
          <span class="empty-text">暂无库存数据</span>
        </div>
      </van-list>
    </div>

    <!-- 仓库选择器 -->
    <van-popup v-model:show="showWarehousePicker" position="bottom">
      <van-picker
        :columns="warehouseColumns"
        @confirm="onWarehouseConfirm"
        @cancel="showWarehousePicker = false"
        title="选择仓库"
      />
    </van-popup>

    <!-- 库存详情弹窗 -->
    <van-popup v-model:show="detailVisible" position="bottom" round :style="{ maxHeight: '70%' }">
      <div class="detail-popup">
        <div class="detail-header">
          <span class="detail-title">库存详情</span>
          <van-icon name="cross" @click="detailVisible = false" />
        </div>
        <van-cell-group>
          <van-cell title="商品名称" :value="currentItem.productName" />
          <van-cell title="商品编码" :value="currentItem.productCode" />
          <van-cell title="仓库" :value="currentItem.warehouseName" />
          <van-cell title="库存数量" :value="String(currentItem.quantity)" />
          <van-cell title="成本价" :value="'¥' + formatMoney(currentItem.costPrice)" />
          <van-cell title="库存金额" :value="'¥' + formatMoney(currentItem.stockAmount || currentItem.costPrice * currentItem.quantity)" />
        </van-cell-group>

        <!-- SN码列表 -->
        <template v-if="currentItemSnList.length > 0">
          <div class="detail-sn-title">SN码明细 ({{ currentItemSnList.length }})</div>
          <van-cell-group>
            <van-cell
              v-for="sn in currentItemSnList"
              :key="sn.id || sn.snCode"
              :title="sn.snCode || sn.sn_code"
              :label="sn.warehouseName || ''"
            >
              <template #value>
                <van-tag :type="getSnStatusType(sn.status || sn.snStatus)" size="small">
                  {{ getSnStatusText(sn.status || sn.snStatus) }}
                </van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </template>
        <div v-else-if="currentItem.hasSn === 1" class="detail-sn-loading">加载SN码中...</div>
      </div>
    </van-popup>

    <!-- 全部低库存弹窗 -->
    <van-popup v-model:show="showAllLowStock" position="bottom" round :style="{ maxHeight: '70%' }">
      <div class="detail-popup">
        <div class="detail-header">
          <span class="detail-title">低库存预警 ({{ lowStockItems.length }})</span>
          <van-icon name="cross" @click="showAllLowStock = false" />
        </div>
        <van-cell-group>
          <van-cell
            v-for="item in lowStockItems"
            :key="item.id || item.productCode"
            :title="item.productName"
            :label="item.productCode"
          >
            <template #value>
              <span class="low-stock-val">{{ item.quantity }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { showToast } from 'vant'
import { inventoryApi, warehouseApi, snApi } from '../../api'

// 筛选
const filterProductName = ref('')
const filterWarehouseId = ref('')
const filterWarehouseName = ref('')
const showWarehousePicker = ref(false)
const warehouseColumns = ref([])

// 汇总
const summary = reactive({
  totalProducts: 0,
  totalQuantity: 0,
  totalAmount: 0
})

// 低库存
const lowStockItems = ref([])
const showAllLowStock = ref(false)

// 列表
const loading = ref(false)
const finished = ref(false)
const inventoryList = ref([])
const pagination = reactive({ current: 1, pageSize: 20, total: 0 })

// 详情
const detailVisible = ref(false)
const currentItem = ref({})
const currentItemSnList = ref([])

// 格式化金额
const formatMoney = (val) => {
  if (!val && val !== 0) return '0.00'
  return Number(val).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const getSnStatusType = (status) => {
  const map = { PURCHASED: 'default', INSTOCK: 'success', 'in_stock': 'success', SOLD: 'warning', 'sold': 'warning', RETURN: 'danger', 'returned': 'danger', SCRAP: 'default', 'scrapped': 'default' }
  return map[status] || 'default'
}

const getSnStatusText = (status) => {
  const map = { PURCHASED: '已采购', INSTOCK: '在库', 'in_stock': '在库', SOLD: '已售', 'sold': '已售', RETURN: '已退货', 'returned': '已退货', SCRAP: '报废', 'scrapped': '报废' }
  return map[status] || status
}

// 加载基础数据
const loadBaseData = async () => {
  try {
    // 仓库列表
    const whRes = await warehouseApi.getList({ current: 1, pageSize: 1000 })
    const warehouses = whRes.data?.list || whRes.body?.list || []
    warehouseColumns.value = warehouses.map(w => ({
      text: w.name || w.warehouseName,
      value: w.id
    }))

    // 汇总
    try {
      const sumRes = await inventoryApi.getSummary()
      const sum = sumRes.data || sumRes.body || {}
      summary.totalProducts = sum.totalProducts || 0
      summary.totalQuantity = sum.totalQuantity || 0
      summary.totalAmount = sum.totalAmount || 0
    } catch (e) {
      console.warn('库存汇总加载失败:', e)
    }

    // 低库存
    try {
      const lowRes = await inventoryApi.getLowStock()
      lowStockItems.value = lowRes.data?.list || lowRes.body?.list || lowRes.data || lowRes.body || []
    } catch (e) {
      console.warn('低库存加载失败:', e)
    }
  } catch (error) {
    console.error('加载基础数据失败:', error)
  }
}

// 加载库存列表
const loadInventory = async (reset = false) => {
  if (reset) {
    pagination.current = 1
    inventoryList.value = []
    finished.value = false
  }

  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (filterWarehouseId.value) params.warehouseId = filterWarehouseId.value
    if (filterProductName.value) params.productName = filterProductName.value

    const res = await inventoryApi.getList(params)
    const list = res.data?.list || res.body?.list || []
    const total = res.data?.total || res.body?.total || 0

    if (reset) {
      inventoryList.value = list
    } else {
      inventoryList.value.push(...list)
    }
    pagination.total = total
    finished.value = inventoryList.value.length >= total
  } catch (error) {
    console.error('加载库存列表失败:', error)
    showToast('加载库存失败')
    finished.value = true
  } finally {
    loading.value = false
  }
}

// 加载更多
const loadMore = () => {
  if (!finished.value) {
    pagination.current++
    loadInventory(false)
  }
}

// 搜索
const handleSearch = () => {
  loadInventory(true)
}

// 重置
const handleReset = () => {
  filterProductName.value = ''
  filterWarehouseId.value = ''
  filterWarehouseName.value = ''
  loadInventory(true)
}

// 仓库选择
const onWarehouseConfirm = ({ selectedOptions }) => {
  filterWarehouseId.value = selectedOptions[0].value
  filterWarehouseName.value = selectedOptions[0].text
  showWarehousePicker.value = false
  handleSearch()
}

// 查看详情
const showDetail = async (item) => {
  currentItem.value = item
  currentItemSnList.value = []
  detailVisible.value = true

  // 如果有SN码，加载SN列表
  if (item.hasSn === 1 || item.quantity > 0) {
    try {
      const snRes = await snApi.getList({
        product_id: item.productId || item.product_id,
        warehouse_id: item.warehouseId || item.warehouse_id,
        current: 1,
        pageSize: 200
      })
      currentItemSnList.value = snRes.data?.list || snRes.body?.list || []
    } catch (e) {
      console.warn('SN列表加载失败:', e)
    }
  }
}

onMounted(() => {
  loadBaseData()
  loadInventory(true)
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

.filter-section {
  padding: 12px 0 0;
}

.filter-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 8px 16px;
}

.summary-section {
  padding: 0 12px;
  margin-bottom: 12px;
}

.summary-card {
  background: linear-gradient(135deg, #07c160 0%, #10b981 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.summary-value {
  font-size: 22px;
  font-weight: 600;
}

.summary-value.amount {
  font-size: 16px;
}

.summary-label {
  font-size: 12px;
  opacity: 0.9;
}

.summary-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
}

.low-stock-section {
  padding: 0 12px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  margin-bottom: 8px;
  padding-left: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.low-stock-val {
  color: #ee0a24;
  font-weight: 600;
  font-size: 16px;
}

.more-link {
  color: var(--color-primary, #5e6ad2);
  font-size: 14px;
}

.list-section {
  padding: 0 12px;
}

.inv-product {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.inv-code {
  font-size: 12px;
  color: var(--color-ink-subtle, #8a8580);
  margin-top: 2px;
}

.inv-qty {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  text-align: right;
}

.inv-qty.low {
  color: #ee0a24;
}

.inv-amount {
  font-size: 12px;
  color: var(--color-ink-muted, #55514d);
  text-align: right;
  margin-top: 2px;
}

.inv-warehouse {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.detail-button {
  height: 100%;
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

.detail-popup {
  padding: 16px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.detail-sn-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  padding: 12px 0 8px;
}

.detail-sn-loading {
  text-align: center;
  color: var(--color-ink-subtle, #8a8580);
  padding: 12px 0;
  font-size: 14px;
}
</style>

<template>
  <div class="records-page">
    <!-- 返回栏 -->
    <div class="page-header">
      <van-icon name="arrow-left" size="20" @click="goBack" />
      <span class="page-title">操作记录</span>
      <span></span>
    </div>

    <!-- 类型切换 -->
    <van-tabs v-model:active="activeTab" sticky @change="onTabChange">
      <van-tab title="入库" name="stockIn"></van-tab>
      <van-tab title="出库" name="stockOut"></van-tab>
      <van-tab title="退货" name="return"></van-tab>
    </van-tabs>

    <!-- 搜索 -->
    <div class="search-bar">
      <van-search
        v-model="keyword"
        placeholder="搜索单号/SN码"
        shape="round"
        @search="onSearch"
        @clear="onSearch"
      />
    </div>

    <!-- 记录列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
    >
      <div v-if="recordList.length > 0" class="record-list">
        <div
          v-for="item in recordList"
          :key="item.id"
          class="record-card"
          @click="showDetail(item)"
        >
          <div class="record-header">
            <span class="record-order">{{ item.orderNo || item.id }}</span>
            <van-tag :type="getStatusType(item.status)" size="medium">
              {{ getStatusText(item.status) }}
            </van-tag>
          </div>
          <div class="record-info">
            <div class="record-row">
              <span class="record-label">{{ activeTab === 'stockIn' ? '供应商' : activeTab === 'stockOut' ? '客户' : '客户' }}</span>
              <span class="record-value">{{ item.supplierName || item.customerName || '-' }}</span>
            </div>
            <div class="record-row">
              <span class="record-label">仓库</span>
              <span class="record-value">{{ item.warehouseName || '-' }}</span>
            </div>
            <div class="record-row">
              <span class="record-label">数量</span>
              <span class="record-value">{{ item.snList?.length || item.quantity || 0 }} 台</span>
            </div>
          </div>
          <div class="record-footer">
            <span class="record-date">{{ formatDate(item.createTime || item.orderDate) }}</span>
          </div>
        </div>
      </div>
      <div v-else-if="!loading" class="empty-state">
        <van-icon name="records-o" size="48" color="#ccc" />
        <span>暂无操作记录</span>
      </div>
    </van-list>

    <!-- 详情弹窗 -->
    <van-popup v-model:show="detailVisible" position="bottom" round :style="{ maxHeight: '70%' }">
      <div v-if="currentRecord" class="detail-popup">
        <div class="detail-header">
          <span class="detail-title">单据详情</span>
          <van-icon name="cross" size="20" @click="detailVisible = false" />
        </div>
        <div class="detail-content">
          <div class="detail-row">
            <span class="detail-label">单号</span>
            <span class="detail-value">{{ currentRecord.orderNo || currentRecord.id }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">状态</span>
            <van-tag :type="getStatusType(currentRecord.status)">{{ getStatusText(currentRecord.status) }}</van-tag>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ activeTab === 'stockIn' ? '供应商' : '客户' }}</span>
            <span class="detail-value">{{ currentRecord.supplierName || currentRecord.customerName || '-' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">仓库</span>
            <span class="detail-value">{{ currentRecord.warehouseName || '-' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">商品类型</span>
            <span class="detail-value">{{ currentRecord.productTypeName || '-' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">日期</span>
            <span class="detail-value">{{ formatDate(currentRecord.createTime || currentRecord.orderDate) }}</span>
          </div>

          <!-- SN列表 -->
          <div v-if="currentRecord.snList && currentRecord.snList.length > 0" class="detail-sn-section">
            <div class="detail-sn-title">SN明细 ({{ currentRecord.snList.length }}台)</div>
            <div class="detail-sn-list">
              <div v-for="(sn, idx) in currentRecord.snList" :key="idx" class="detail-sn-item">
                <span class="sn-index">{{ idx + 1 }}</span>
                <span class="sn-code">{{ typeof sn === 'string' ? sn : sn.snCode || sn.sn }}</span>
              </div>
            </div>
          </div>
          <div v-else-if="currentRecord.snCodes && currentRecord.snCodes.length > 0" class="detail-sn-section">
            <div class="detail-sn-title">SN明细 ({{ currentRecord.snCodes.length }}台)</div>
            <div class="detail-sn-list">
              <div v-for="(sn, idx) in currentRecord.snCodes" :key="idx" class="detail-sn-item">
                <span class="sn-index">{{ idx + 1 }}</span>
                <span class="sn-code">{{ sn }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { stockInApi, stockOutApi, saleReturnApi } from '../../api'

const activeTab = ref('stockIn')
const keyword = ref('')
const recordList = ref([])
const loading = ref(false)
const finished = ref(false)
const currentPage = ref(0)
const pageSize = 20

const detailVisible = ref(false)
const currentRecord = ref(null)

const goBack = () => {
  window.history.back()
}

const formatDate = (date) => {
  if (!date) return '-'
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const getStatusType = (status) => {
  const map = { DRAFT: 'default', CONFIRMED: 'success', COMPLETED: 'success', CANCELLED: 'danger', PROCESSING: 'primary' }
  return map[status] || 'default'
}

const getStatusText = (status) => {
  const map = { DRAFT: '草稿', CONFIRMED: '已确认', COMPLETED: '已完成', CANCELLED: '已取消', PROCESSING: '处理中' }
  return map[status] || status || '未知'
}

const getApi = () => {
  switch (activeTab.value) {
    case 'stockIn': return stockInApi
    case 'stockOut': return stockOutApi
    case 'return': return saleReturnApi
    default: return stockInApi
  }
}

const fetchRecords = async (page) => {
  const api = getApi()
  const params = { current: page, pageSize }
  if (keyword.value) {
    params.keyword = keyword.value
  }
  const res = await api.getList(params)
  return res.data || {}
}

const loadMore = async () => {
  try {
    currentPage.value++
    const data = await fetchRecords(currentPage.value)
    const list = data.list || []
    recordList.value = [...recordList.value, ...list]
    const total = data.total || 0
    if (recordList.value.length >= total || list.length < pageSize) {
      finished.value = true
    }
  } catch (e) {
    console.error('加载记录失败:', e)
    finished.value = true
  } finally {
    loading.value = false
  }
}

const onTabChange = () => {
  recordList.value = []
  currentPage.value = 0
  finished.value = false
  loading.value = true
  loadMore()
}

const onSearch = () => {
  recordList.value = []
  currentPage.value = 0
  finished.value = false
  loading.value = true
  loadMore()
}

const showDetail = (item) => {
  currentRecord.value = item
  detailVisible.value = true
}
</script>

<style scoped>
.records-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.page-title {
  font-size: 17px;
  font-weight: bold;
  color: #333;
}

.search-bar {
  padding: 0;
}

.record-list {
  padding: 12px;
}

.record-card {
  background: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.record-order {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.record-info {
  margin-bottom: 8px;
}

.record-row {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
}

.record-label {
  font-size: 13px;
  color: #999;
}

.record-value {
  font-size: 13px;
  color: #333;
}

.record-footer {
  display: flex;
  justify-content: flex-end;
}

.record-date {
  font-size: 12px;
  color: #bbb;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  gap: 12px;
  color: #999;
  font-size: 14px;
}

.detail-popup {
  padding: 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.detail-title {
  font-size: 17px;
  font-weight: bold;
  color: #333;
}

.detail-content {
  padding: 0 4px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.detail-label {
  font-size: 14px;
  color: #999;
}

.detail-value {
  font-size: 14px;
  color: #333;
}

.detail-sn-section {
  margin-top: 12px;
}

.detail-sn-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.detail-sn-list {
  max-height: 200px;
  overflow-y: auto;
}

.detail-sn-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid #f8f8f8;
}

.sn-index {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #e8f4ff;
  color: #1989fa;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sn-code {
  font-size: 13px;
  color: #333;
  font-family: monospace;
}
</style>

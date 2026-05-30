<template>
  <div class="mobile-page">
    <!-- 筛选条件 -->
    <div class="filter-section">
      <van-cell-group inset>
        <van-field
          v-model="searchOrderNo"
          label="调拨单号"
          placeholder="输入单号搜索"
          @keyup.enter="loadData"
        >
          <template #button>
            <van-button size="small" type="primary" @click="loadData">搜索</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <!-- 调拨单列表 -->
    <div class="list-section">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadMore"
        >
          <div
            v-for="item in orderList"
            :key="item.id"
            class="transfer-card"
            @click="showDetail(item)"
          >
            <div class="card-header">
              <span class="order-no">{{ item.orderNo }}</span>
              <van-tag :type="getStatusType(item.status)">{{ getStatusText(item.status) }}</van-tag>
            </div>
            <div class="card-body">
              <div class="card-row">
                <span class="card-label">调出仓库</span>
                <span class="card-value">{{ item.fromWarehouseName || '-' }}</span>
              </div>
              <div class="card-row">
                <span class="card-label">调入仓库</span>
                <span class="card-value">{{ item.toWarehouseName || '-' }}</span>
              </div>
              <div class="card-row">
                <span class="card-label">调拨数量</span>
                <span class="card-value">{{ item.totalQuantity || 0 }}台</span>
              </div>
              <div class="card-row">
                <span class="card-label">调拨日期</span>
                <span class="card-value">{{ item.transferDate || '-' }}</span>
              </div>
            </div>
            <div v-if="item.status === 'DRAFT'" class="card-footer">
              <van-button size="small" type="primary" @click.stop="confirmTransfer(item)">确认调拨</van-button>
            </div>
          </div>

          <div v-if="!loading && orderList.length === 0" class="empty-state">
            <van-icon name="todo-list-o" size="48" color="#ccc" />
            <span class="empty-text">暂无调拨单</span>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 调拨单详情弹窗 -->
    <van-popup v-model:show="detailVisible" position="bottom" round :style="{ maxHeight: '80%' }">
      <div class="detail-popup">
        <div class="detail-header">
          <span class="detail-title">调拨单详情</span>
          <van-icon name="cross" size="20" @click="detailVisible = false" />
        </div>
        <div v-if="currentDetail" class="detail-body">
          <van-cell-group :border="false">
            <van-cell title="调拨单号" :value="currentDetail.orderNo" />
            <van-cell title="状态">
              <template #value>
                <van-tag :type="getStatusType(currentDetail.status)">{{ getStatusText(currentDetail.status) }}</van-tag>
              </template>
            </van-cell>
            <van-cell title="调出仓库" :value="currentDetail.fromWarehouseName" />
            <van-cell title="调入仓库" :value="currentDetail.toWarehouseName" />
            <van-cell title="调拨数量" :value="`${currentDetail.totalQuantity || 0}台`" />
            <van-cell title="调拨日期" :value="currentDetail.transferDate" />
            <van-cell title="备注" :value="currentDetail.remark || '无'" />
            <van-cell title="创建人" :value="currentDetail.creator || '-'" />
            <van-cell title="创建时间" :value="formatDate(currentDetail.createdAt)" />
          </van-cell-group>

          <!-- 调拨SN明细 -->
          <div v-if="currentDetail.items && currentDetail.items.length > 0" class="detail-items">
            <div class="detail-subtitle">SN明细 ({{ currentDetail.items.length }})</div>
            <van-cell-group :border="false">
              <van-cell
                v-for="(sn, idx) in currentDetail.items"
                :key="idx"
                :title="sn.snCode || sn.sn_code"
                :label="sn.productName || sn.product_name || ''"
              />
            </van-cell-group>
          </div>

          <div v-if="currentDetail.status === 'DRAFT'" class="detail-footer">
            <van-button type="primary" block round @click="confirmTransfer(currentDetail)">确认调拨</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast, showDialog } from 'vant'
import { transferApi } from '../../api'

const searchOrderNo = ref('')
const orderList = ref([])
const loading = ref(false)
const refreshing = ref(false)
const finished = ref(false)
const currentPage = ref(1)

const detailVisible = ref(false)
const currentDetail = ref(null)

const getStatusType = (status) => {
  const map = { DRAFT: 'warning', CONFIRMED: 'success', COMPLETED: 'success', CANCELLED: 'default' }
  return map[status] || 'default'
}

const getStatusText = (status) => {
  const map = { DRAFT: '待确认', CONFIRMED: '已确认', COMPLETED: '已完成', CANCELLED: '已取消' }
  return map[status] || status || '未知'
}

const formatDate = (date) => {
  if (!date) return '-'
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const loadData = async (reset = true) => {
  if (reset) {
    currentPage.value = 1
    orderList.value = []
    finished.value = false
  }
  loading.value = true
  try {
    const params = {
      current: currentPage.value,
      pageSize: 20
    }
    if (searchOrderNo.value) {
      params.orderNo = searchOrderNo.value
    }
    const res = await transferApi.getList(params)
    const list = res.data?.list || []
    const total = res.data?.total || 0
    if (reset) {
      orderList.value = list
    } else {
      orderList.value.push(...list)
    }
    finished.value = orderList.value.length >= total
  } catch (e) {
    console.error('加载调拨单失败:', e)
    showToast('加载失败')
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

const loadMore = () => {
  currentPage.value++
  loadData(false)
}

const onRefresh = () => {
  loadData(true)
}

const showDetail = async (item) => {
  try {
    const res = await transferApi.getDetail(item.id)
    currentDetail.value = res.data || item
    detailVisible.value = true
  } catch (e) {
    currentDetail.value = item
    detailVisible.value = true
  }
}

const confirmTransfer = async (item) => {
  try {
    await showDialog({
      title: '确认调拨',
      message: `确认调拨单 ${item.orderNo} ？\n将从 ${item.fromWarehouseName} 调拨至 ${item.toWarehouseName}`,
      showCancelButton: true
    })
  } catch {
    return
  }

  try {
    await transferApi.edit({ id: item.id, status: 'CONFIRMED' })
    showToast('调拨确认成功')
    detailVisible.value = false
    loadData(true)
  } catch (e) {
    showToast('确认失败: ' + (e.message || '未知错误'))
  }
}

// 初始加载
loadData(true)
</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  background: var(--color-canvas, #faf7f2);
  padding-bottom: 20px;
}

.filter-section {
  padding: 12px 0 0;
}

.list-section {
  padding: 0 12px;
}

.transfer-card {
  background: var(--color-surface, #f3efe8);
  border-radius: 16px;
  padding: 14px 16px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-no {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.card-label {
  color: var(--color-ink-subtle, #8a8580);
}

.card-value {
  color: var(--color-ink, #1c1915);
}

.card-footer {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border-light, #e8e2d8);
  display: flex;
  justify-content: flex-end;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  gap: 12px;
}

.empty-text {
  font-size: 14px;
  color: var(--color-ink-subtle, #8a8580);
}

/* 详情弹窗 */
.detail-popup {
  padding: 16px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.detail-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
}

.detail-body {
  max-height: 60vh;
  overflow-y: auto;
}

.detail-items {
  margin-top: 12px;
}

.detail-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink, #1c1915);
  margin-bottom: 8px;
  padding-left: 4px;
}

.detail-footer {
  margin-top: 16px;
  padding-top: 12px;
}
</style>

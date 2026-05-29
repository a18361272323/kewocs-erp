<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background: #409eff">
            <el-icon><Download /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.todayPurchase || 0 }}</div>
            <div class="stat-label">今日采购入库</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background: #67c23a">
            <el-icon><Upload /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.todaySale || 0 }}</div>
            <div class="stat-label">今日销售出库</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background: #e6a23c">
            <el-icon><Box /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalSn || 0 }}</div>
            <div class="stat-label">SN码库存</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background: #f56c6c">
            <el-icon><Coin /></el-icon>
          </div>
          <div class="stat-content">
            <div class="stat-value">¥{{ formatMoney(stats.pendingCollection || 0) }}</div>
            <div class="stat-label">待收款</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 今日入库/出库明细 -->
    <el-row :gutter="20" class="content-row">
      <!-- 今日入库明细 -->
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>今日入库明细</span>
              <el-button type="primary" link @click="navigateTo('/purchase/stockIn')">查看全部</el-button>
            </div>
          </template>
          <el-table :data="todayInList" style="width: 100%" max-height="300">
            <el-table-column prop="snCode" label="SN码" width="140" show-overflow-tooltip />
            <el-table-column prop="productName" label="货品" width="120" show-overflow-tooltip />
            <el-table-column prop="supplierName" label="供应商" width="100" show-overflow-tooltip />
            <el-table-column prop="inDate" label="入库时间" width="100">
              <template #default="{ row }">
                {{ formatDate(row.inDate) }}
              </template>
            </el-table-column>
          </el-table>
          <el-empty v-if="todayInList.length === 0" description="今日暂无入库记录" :image-size="60" />
        </el-card>
      </el-col>
      
      <!-- 今日出库明细 -->
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>今日出库明细</span>
              <el-button type="primary" link @click="navigateTo('/sale/stockOut')">查看全部</el-button>
            </div>
          </template>
          <el-table :data="todayOutList" style="width: 100%" max-height="300">
            <el-table-column prop="snCode" label="SN码" width="140" show-overflow-tooltip />
            <el-table-column prop="productName" label="货品" width="120" show-overflow-tooltip />
            <el-table-column prop="customerName" label="客户" width="100" show-overflow-tooltip />
            <el-table-column prop="outDate" label="出库时间" width="100">
              <template #default="{ row }">
                {{ formatDate(row.outDate) }}
              </template>
            </el-table-column>
          </el-table>
          <el-empty v-if="todayOutList.length === 0" description="今日暂无出库记录" :image-size="60" />
        </el-card>
      </el-col>
    </el-row>

    <!-- SN码流转动态 -->
    <el-row :gutter="20" class="content-row">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>SN码流转记录</span>
              <el-button type="primary" link @click="navigateTo('/sn/list')">查看全部</el-button>
            </div>
          </template>
          <el-table :data="snLogList" style="width: 100%">
            <el-table-column prop="snCode" label="SN码" width="150" />
            <el-table-column prop="productName" label="货品" width="150" />
            <el-table-column prop="operationType" label="操作" width="100">
              <template #default="{ row }">
                <el-tag>{{ getOperationText(row.operationType) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="orderNo" label="关联单据" width="180" />
            <el-table-column prop="operator" label="操作人" width="100" />
            <el-table-column prop="operateTime" label="操作时间" width="160">
              <template #default="{ row }">
                {{ formatDate(row.operateTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
          </el-table>
          <el-empty v-if="snLogList.length === 0" description="暂无流转记录" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Download, Upload, Box, Coin } from '@element-plus/icons-vue'
import { formatDate, formatMoney } from '@/utils/format'
import { runModelMethod } from '@/api/request'
import { MODEL_KEYS, METHOD_KEYS } from '@/api'

// 导航
function navigateTo(path) {
  window.location.hash = path
}

// 统计数据
const stats = reactive({
  todayPurchase: 0,
  todaySale: 0,
  totalSn: 0,
  pendingCollection: 0
})

// 今日入库列表
const todayInList = ref([])

// 今日出库列表
const todayOutList = ref([])

// SN码流转记录
const snLogList = ref([])

// 加载数据
async function loadData() {
  try {
    const today = new Date().toISOString().split('T')[0]
    
    // 加载今日入库（采购入库单）
    const inRes = await runModelMethod(MODEL_KEYS.STOCK_IN, METHOD_KEYS.STOCK_IN_LIST, { 
      current: 1, 
      pageSize: 10,
      orderDateStart: today,
      orderDateEnd: today
    })
    if (inRes.returnCode === 'SUC0000') {
      todayInList.value = inRes.body?.list || []
      stats.todayPurchase = inRes.body?.total || 0
    }
    
    // 加载今日出库（销售出库单）
    const outRes = await runModelMethod(MODEL_KEYS.STOCK_OUT, METHOD_KEYS.STOCK_OUT_LIST, { 
      current: 1, 
      pageSize: 10,
      orderDateStart: today,
      orderDateEnd: today
    })
    if (outRes.returnCode === 'SUC0000') {
      todayOutList.value = outRes.body?.list || []
      stats.todaySale = outRes.body?.total || 0
    }
    
    // 加载SN码总数（状态统计）
    const statusRes = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_STATUS_COUNT, {})
    if (statusRes.returnCode === 'SUC0000' && statusRes.body) {
      stats.totalSn = statusRes.body.total || 0
    }
    
    // 加载SN码流转记录
    const snRes = await runModelMethod(MODEL_KEYS.SN_CODE, METHOD_KEYS.SN_LIST, { current: 1, pageSize: 10 })
    if (snRes.returnCode === 'SUC0000') {
      snLogList.value = snRes.body?.list || []
    }
  } catch (error) {
    console.error('加载仪表盘数据失败:', error)
  }
}

// 操作类型文本
function getOperationText(type) {
  const map = {
    PURCHASE: '采购入库',
    STOCK_IN: '入库',
    STOCK_OUT: '出库',
    SALE: '销售',
    RETURN: '退货',
    TRANSFER: '调拨'
  }
  return map[type] || type
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.dashboard {
  padding: 0;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.stat-icon .el-icon {
  font-size: 28px;
  color: #fff;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  line-height: 1.2;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-top: 5px;
}

.content-row {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

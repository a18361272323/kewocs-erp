<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="单号">
          <el-input v-model="searchForm.orderNo" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="searchForm.warehouseId" placeholder="选择仓库" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="选择状态" clearable style="width: 120px">
            <el-option label="草稿" value="DRAFT" />
            <el-option label="进行中" value="IN_PROGRESS" />
            <el-option label="已完成" value="COMPLETED" />
            <el-option label="已取消" value="CANCELLED" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮 -->
    <div class="table-toolbar">
      <div class="toolbar-left">
        <el-button type="primary" :icon="Plus" @click="handleCreate">新增盘点</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="orderNo" label="盘点单号" width="180" />
      <el-table-column prop="warehouseName" label="仓库" width="120" />
      <el-table-column prop="orderDate" label="盘点日期" width="120" />
      <el-table-column prop="totalBookQuantity" label="账面数量" width="100" align="center" />
      <el-table-column prop="totalActualQuantity" label="实盘数量" width="100" align="center" />
      <el-table-column prop="totalProfitQuantity" label="盈亏数量" width="100" align="center">
        <template #default="{ row }">
          <span :class="row.totalProfitQuantity > 0 ? 'text-success' : row.totalProfitQuantity < 0 ? 'text-danger' : ''">
            {{ row.totalProfitQuantity > 0 ? '+' : '' }}{{ row.totalProfitQuantity }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="totalProfitAmount" label="盈亏金额" width="100" align="center">
        <template #default="{ row }">
          <span :class="row.totalProfitAmount > 0 ? 'text-success' : row.totalProfitAmount < 0 ? 'text-danger' : ''">
            {{ row.totalProfitAmount > 0 ? '+' : '' }}{{ row.totalProfitAmount }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operatorName" label="操作人" width="100" />
      <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">查看</el-button>
          <el-button v-if="row.status === 'DRAFT'" type="warning" link @click="handleStart(row)">开始盘点</el-button>
          <el-button v-if="row.status === 'IN_PROGRESS'" type="success" link @click="handleComplete(row)">完成盘点</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      class="pagination"
      @size-change="loadData"
      @current-change="loadData"
    />

    <!-- 新增盘点弹窗 -->
    <el-dialog v-model="formVisible" :title="isEdit ? '编辑盘点单' : '新增盘点单'" width="600px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="仓库" prop="warehouseId">
          <el-select v-model="formData.warehouseId" placeholder="选择仓库" style="width: 100%">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="盘点日期" prop="orderDate">
          <el-date-picker v-model="formData.orderDate" type="date" placeholder="选择日期" style="width: 100%" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remark" type="textarea" :rows="3" placeholder="输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <!-- 盘点明细弹窗 -->
    <el-dialog v-model="detailVisible" title="盘点明细" width="900px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="单号">{{ currentOrder?.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder?.status)">{{ getStatusText(currentOrder?.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="仓库">{{ currentOrder?.warehouseName }}</el-descriptions-item>
        <el-descriptions-item label="盘点日期">{{ currentOrder?.orderDate }}</el-descriptions-item>
        <el-descriptions-item label="账面数量">{{ currentOrder?.totalBookQuantity }}</el-descriptions-item>
        <el-descriptions-item label="实盘数量">{{ currentOrder?.totalActualQuantity }}</el-descriptions-item>
        <el-descriptions-item label="盈亏数量">{{ currentOrder?.totalProfitQuantity }}</el-descriptions-item>
        <el-descriptions-item label="盈亏金额">{{ currentOrder?.totalProfitAmount }}</el-descriptions-item>
        <el-descriptions-item label="操作人">{{ currentOrder?.operatorName }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentOrder?.remark || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { checkApi } from '@/api'
import { getWarehouseSimpleList } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const loading = ref(false)
const submitLoading = ref(false)
const formVisible = ref(false)
const detailVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const currentOrder = ref(null)

const warehouseList = ref([])

const searchForm = reactive({
  orderNo: '',
  warehouseId: null,
  status: null
})

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

const orderList = ref([])

const formData = reactive({
  warehouseId: null,
  orderDate: '',
  remark: ''
})

const formRules = {
  warehouseId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  orderDate: [{ required: true, message: '请选择盘点日期', trigger: 'change' }]
}

onMounted(() => {
  loadWarehouseList()
  loadData()
})

async function loadWarehouseList() {
  try {
    const res = await getWarehouseSimpleList()
    if (res.code === 0 || res.code === 200) {
      warehouseList.value = res.data?.list || res.data || []
    }
  } catch (error) {
    console.error('加载仓库列表失败:', error)
  }
}

async function loadData() {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.orderNo) params.order_no = searchForm.orderNo
    if (searchForm.warehouseId) params.warehouse_id = searchForm.warehouseId
    if (searchForm.status) params.status = searchForm.status
    const res = await checkApi.list(params)
    if (res.code === 0 || res.code === 200) {
      orderList.value = res.data?.list || res.data || []
      pagination.total = res.data?.total || orderList.value.length
    } else {
      ElMessage.error(res.message || '加载盘点单列表失败')
    }
  } catch (error) {
    console.error('加载盘点单列表失败:', error)
    ElMessage.error('加载盘点单列表失败')
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.current = 1
  loadData()
}

function handleReset() {
  searchForm.orderNo = ''
  searchForm.warehouseId = null
  searchForm.status = null
  handleSearch()
}

function handleCreate() {
  isEdit.value = false
  formData.warehouseId = null
  formData.orderDate = new Date().toISOString().split('T')[0]
  formData.remark = ''
  formVisible.value = true
}

async function handleSubmit() {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    const warehouse = warehouseList.value.find(w => w.id === formData.warehouseId)
    const data = {
      warehouseId: formData.warehouseId,
      warehouseName: warehouse?.warehouseName || '',
      orderDate: formData.orderDate,
      remark: formData.remark,
      status: 'DRAFT'
    }

    let res
    if (isEdit.value) {
      res = await checkApi.edit({ id: currentOrder.value.id, ...data })
    } else {
      res = await checkApi.add(data)
    }

    if (res.code === 0 || res.code === 200) {
      ElMessage.success(isEdit.value ? '编辑成功' : '创建成功')
      formVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (error) {
    console.error('操作失败:', error)
    ElMessage.error('操作失败')
  } finally {
    submitLoading.value = false
  }
}

function handleDetail(row) {
  currentOrder.value = row
  detailVisible.value = true
}

async function handleStart(row) {
  try {
    await ElMessageBox.confirm('确认开始盘点？', '提示', { type: 'warning' })
    const res = await checkApi.edit({ id: row.id, status: 'IN_PROGRESS' })
    if (res.code === 0 || res.code === 200) {
      ElMessage.success('盘点已开始')
      loadData()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('开始盘点失败:', error)
    }
  }
}

async function handleComplete(row) {
  try {
    await ElMessageBox.confirm('确认完成盘点？', '提示', { type: 'warning' })
    const res = await checkApi.edit({ id: row.id, status: 'COMPLETED' })
    if (res.code === 0 || res.code === 200) {
      ElMessage.success('盘点已完成')
      loadData()
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('完成盘点失败:', error)
    }
  }
}

function getStatusType(status) {
  const map = {
    'DRAFT': 'info',
    'IN_PROGRESS': 'warning',
    'COMPLETED': 'success',
    'CANCELLED': 'danger'
  }
  return map[status] || 'info'
}

function getStatusText(status) {
  const map = {
    'DRAFT': '草稿',
    'IN_PROGRESS': '进行中',
    'COMPLETED': '已完成',
    'CANCELLED': '已取消'
  }
  return map[status] || status
}

// 权限检查函数（通过 appStore）
function hasPermission(permission) {
  return appStore.hasPermission(permission)
}
</script>

<style scoped>
.text-success {
  color: #67c23a;
}
.text-danger {
  color: #f56c6c;
}
</style>

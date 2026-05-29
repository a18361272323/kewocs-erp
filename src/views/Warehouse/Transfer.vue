<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="调拨单号">
          <el-input v-model="searchForm.orderNo" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="调出仓库">
          <el-select v-model="searchForm.fromWarehouseId" placeholder="选择仓库" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="调入仓库">
          <el-select v-model="searchForm.toWarehouseId" placeholder="选择仓库" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
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
        <el-button v-if="hasPermission('transfer:create')" type="primary" :icon="Plus" @click="handleCreate">新增调拨</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="orderNo" label="调拨单号" width="200" />
      <el-table-column prop="fromWarehouseName" label="调出仓库" width="120" />
      <el-table-column prop="toWarehouseName" label="调入仓库" width="120" />
      <el-table-column prop="transferDate" label="调拨日期" width="120" />
      <el-table-column prop="totalQuantity" label="调拨数量" width="100" align="center" />
      <el-table-column prop="orderStatus" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.orderStatus)">{{ getStatusText(row.orderStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
      <el-table-column prop="creator" label="创建人" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">查看</el-button>
          <el-button v-if="row.orderStatus === 'DRAFT'" type="success" link @click="handleConfirm(row)">确认调拨</el-button>
          <el-button v-if="hasPermission('transfer:delete') && row.orderStatus === 'DRAFT'" type="danger" link @click="handleDelete(row)">删除</el-button>
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

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="formVisible"
      :title="isEdit ? '编辑调拨单' : '新增调拨单'"
      width="1000px"
      top="5vh"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="调出仓库" prop="fromWarehouseId">
              <el-select v-model="form.fromWarehouseId" placeholder="选择仓库" style="width: 100%" :disabled="isEdit" @change="handleFromWarehouseChange">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调入仓库" prop="toWarehouseId">
              <el-select v-model="form.toWarehouseId" placeholder="选择仓库" style="width: 100%" @change="handleToWarehouseChange">
                <el-option v-for="item in warehouseList.filter(w => w.id !== form.fromWarehouseId)" :key="item.id" :label="item.warehouseName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调拨日期" prop="transferDate">
              <el-date-picker
                v-model="form.transferDate"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入备注" />
        </el-form-item>
      </el-form>

      <!-- SN 选择区域 -->
      <el-card v-if="form.fromWarehouseId && !isEdit" class="sn-select-area" shadow="never">
        <template #header>
          <div class="sn-header">
            <span>选择调拨机器（SN 码）</span>
            <el-tag type="info">已选择 {{ selectedSnList.length }} 台</el-tag>
          </div>
        </template>

        <el-table
          ref="snTableRef"
          :data="warehouseSnList"
          border
          size="small"
          max-height="400"
          @selection-change="handleSnSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="snCode" label="SN 码" width="180" />
          <el-table-column prop="productName" label="商品名称" min-width="150" />
          <el-table-column prop="productCode" label="商品编码" width="120" />
          <el-table-column prop="purchaseDate" label="入库日期" width="120" />
          <el-table-column prop="warrantyMonths" label="保修期" width="100">
            <template #default="{ row }">
              {{ row.warrantyMonths }}个月
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 编辑时显示已选 SN -->
      <el-card v-if="isEdit && form.items.length > 0" class="sn-select-area" shadow="never">
        <template #header>
          <div class="sn-header">
            <span>已选调拨机器</span>
            <el-tag type="info">共 {{ form.items.length }} 台</el-tag>
          </div>
        </template>
        <el-table :data="form.items" border size="small">
          <el-table-column prop="snCode" label="SN 码" width="180" />
          <el-table-column prop="productName" label="商品名称" min-width="150" />
          <el-table-column prop="productCode" label="商品编码" width="120" />
        </el-table>
      </el-card>

      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" :disabled="!form.fromWarehouseId || !form.toWarehouseId" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="调拨单详情" width="900px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="调拨单号">{{ currentOrder.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="调拨日期">{{ currentOrder.transferDate }}</el-descriptions-item>
        <el-descriptions-item label="调出仓库">{{ currentOrder.fromWarehouseName }}</el-descriptions-item>
        <el-descriptions-item label="调入仓库">{{ currentOrder.toWarehouseName }}</el-descriptions-item>
        <el-descriptions-item label="调拨数量">{{ currentOrder.totalQuantity }} 台</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder.orderStatus)">{{ getStatusText(currentOrder.orderStatus) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建人">{{ currentOrder.creator }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(currentOrder.createTime) }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>调拨明细</el-divider>

      <el-table :data="currentOrder.items" border>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="snCode" label="SN 码" width="180">
          <template #default="{ row }">
            <el-tag type="info">{{ row.snCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" min-width="150" />
        <el-table-column prop="productCode" label="商品编码" width="120" />
      </el-table>

      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/format'
import { transferApi, getWarehouseSimpleList, snApi } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 列表数据
const loading = ref(false)
const orderList = ref([])
const warehouseList = ref([])
const warehouseSnList = ref([])
const selectedSnList = ref([])

// 搜索表单
const searchForm = reactive({
  orderNo: '',
  fromWarehouseId: null,
  toWarehouseId: null
})

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// 表单弹窗
const formVisible = ref(false)
const formRef = ref()
const snTableRef = ref()
const isEdit = ref(false)

const form = reactive({
  id: null,
  fromWarehouseId: null,
  fromWarehouseName: '',
  toWarehouseId: null,
  toWarehouseName: '',
  transferDate: new Date().toISOString().split('T')[0],
  totalQuantity: 0,
  remark: '',
  orderStatus: 'DRAFT',
  items: []
})

const rules = {
  fromWarehouseId: [{ required: true, message: '请选择调出仓库', trigger: 'change' }],
  toWarehouseId: [{ required: true, message: '请选择调入仓库', trigger: 'change' }],
  transferDate: [{ required: true, message: '请选择调拨日期', trigger: 'change' }]
}

// 详情弹窗
const detailVisible = ref(false)
const currentOrder = ref({})

// 权限检查
function hasPermission(permission) {
  return appStore.hasPermission(permission)
}

// 加载数据
async function loadData() {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.orderNo) params.order_no = searchForm.orderNo
    if (searchForm.fromWarehouseId) params.out_warehouse_id = searchForm.fromWarehouseId
    if (searchForm.toWarehouseId) params.in_warehouse_id = searchForm.toWarehouseId

    const res = await transferApi.getList(params)
    if (res.code === 'SUC0000') {
      orderList.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载调拨单列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载基础数据
async function loadBaseData() {
  try {
    const res = await getWarehouseSimpleList()
    if (res.code === 'SUC0000') {
      warehouseList.value = res.body || []
    }
  } catch (error) {
    console.error('加载仓库列表失败:', error)
  }
}

// 加载调出仓库的 SN 列表
async function loadWarehouseSn(warehouseId) {
  if (!warehouseId) {
    warehouseSnList.value = []
    return
  }
  try {
    const res = await snApi.getByWarehouse(warehouseId)
    const list = Array.isArray(res) ? res : (res.body || res.data || [])
    warehouseSnList.value = list.filter(sn => sn.status === 'INSTOCK')
  } catch (error) {
    console.error('加载仓库 SN 列表失败:', error)
    warehouseSnList.value = []
  }
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 重置
function handleReset() {
  searchForm.orderNo = ''
  searchForm.fromWarehouseId = null
  searchForm.toWarehouseId = null
  handleSearch()
}

// 新增
function handleCreate() {
  isEdit.value = false
  form.id = null
  form.fromWarehouseId = null
  form.fromWarehouseName = ''
  form.toWarehouseId = null
  form.toWarehouseName = ''
  form.transferDate = new Date().toISOString().split('T')[0]
  form.totalQuantity = 0
  form.remark = ''
  form.orderStatus = 'DRAFT'
  form.items = []
  warehouseSnList.value = []
  selectedSnList.value = []
  formVisible.value = true
}

// 调出仓库变化
function handleFromWarehouseChange(warehouseId) {
  const warehouse = warehouseList.value.find(w => w.id === warehouseId)
  if (warehouse) {
    form.fromWarehouseName = warehouse.warehouseName
  }
  // 清空已选 SN，重新加载
  selectedSnList.value = []
  warehouseSnList.value = []
  if (snTableRef.value) {
    snTableRef.value.clearSelection()
  }
  loadWarehouseSn(warehouseId)
}

// 调入仓库变化
function handleToWarehouseChange(warehouseId) {
  const warehouse = warehouseList.value.find(w => w.id === warehouseId)
  if (warehouse) {
    form.toWarehouseName = warehouse.warehouseName
  }
}

// SN 选择变化
function handleSnSelectionChange(selection) {
  selectedSnList.value = selection
}

// 保存调拨单
async function handleSave() {
  try {
    await formRef.value.validate()

    if (!isEdit.value && selectedSnList.value.length === 0) {
      return ElMessage.warning('请至少选择一台机器进行调拨')
    }

    const items = isEdit.value
      ? form.items
      : selectedSnList.value.map(sn => ({
          snCode: sn.snCode,
          productId: sn.productId,
          productName: sn.productName,
          productCode: sn.productCode
        }))

    const data = {
      id: form.id,
      outWarehouseId: form.fromWarehouseId,
      outWarehouseName: form.fromWarehouseName,
      inWarehouseId: form.toWarehouseId,
      inWarehouseName: form.toWarehouseName,
      orderDate: form.transferDate,
      remark: form.remark,
      status: isEdit.value ? undefined : 'DRAFT',
      items
    }

    const res = isEdit.value
      ? await transferApi.edit(data)
      : await transferApi.add(data)

    if (res.code === 'SUC0000') {
      ElMessage.success('保存成功')
      formVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '保存失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('保存失败:', error)
    }
  }
}

// 查看详情
async function handleDetail(row) {
  try {
    const res = await transferApi.getDetail(row.id)
    if (res.code === 'SUC0000') {
      currentOrder.value = res.body || {}
      detailVisible.value = true
    }
  } catch (error) {
    console.error('加载详情失败:', error)
  }
}

// 确认调拨（执行 SN 仓库变更）
async function handleConfirm(row) {
  try {
    await ElMessageBox.confirm(
      `确认执行调拨？\n调出仓库：${row.fromWarehouseName}\n调入仓库：${row.toWarehouseName}\n调拨数量：${row.totalQuantity} 台`,
      '确认调拨',
      { type: 'warning' }
    )

    loading.value = true

    // 1. 获取调拨单明细
    let items = []
    try {
      const detailRes = await transferApi.getDetail(row.id)
      items = detailRes.body?.items || []
    } catch (e) {
      console.warn('获取调拨明细失败:', e)
    }

    // 2. 更新每个 SN 的仓库归属
    let updated = 0
    for (const item of items) {
      if (item.snCode) {
        try {
          await snApi.edit({
            snCode: item.snCode,
            warehouseId: row.toWarehouseId,
            warehouseName: row.toWarehouseName
          })
          updated++
        } catch (e) {
          console.warn(`更新 SN ${item.snCode} 仓库失败:`, e)
        }
      }
    }

    // 3. 更新调拨单状态为已确认
    const res = await transferApi.edit({ id: row.id, status: 'CONFIRMED' })
    if (res.code === 'SUC0000') {
      ElMessage.success(`调拨确认成功，已更新 ${updated} 台机器的仓库归属`)
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '确认失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('调拨确认失败：' + (error.message || error))
    }
  } finally {
    loading.value = false
  }
}

// 删除
async function handleDelete(row) {
  try {
    await ElMessageBox.confirm('确认要删除该调拨单吗？', '提示', { type: 'warning' })
    const res = await transferApi.delete(row.id)
    if (res.code === 'SUC0000') {
      ElMessage.success('删除成功')
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
    }
  }
}

// 状态类型
function getStatusType(status) {
  const map = {
    DRAFT: 'info',
    CONFIRMED: 'success',
    CANCELLED: 'danger'
  }
  return map[status] || 'info'
}

// 状态文本
function getStatusText(status) {
  const map = {
    DRAFT: '草稿',
    CONFIRMED: '已确认',
    CANCELLED: '已取消'
  }
  return map[status] || status
}

onMounted(() => {
  loadData()
  loadBaseData()
})
</script>

<style scoped>
.page-container {
  padding: 0;
}

.search-card {
  margin-bottom: 15px;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.sn-select-area {
  margin-top: 15px;
}

.sn-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <div class="check-page">
    <el-card class="filter-card">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="单号">
          <el-input v-model="queryForm.orderNo" placeholder="请输入单号" clearable />
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="queryForm.warehouseId" placeholder="全部" clearable>
            <el-option v-for="w in warehouses" :key="w.id" :label="w.warehouseName" :value="w.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="queryForm.dateRange" type="daterange" range-separator="至" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryForm.status" clearable>
            <el-option label="全部" value="" />
            <el-option label="盘点中" value="PENDING" />
            <el-option label="已完成" value="COMPLETED" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch"><el-icon><Search /></el-icon> 查询</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleCreate"><el-icon><Plus /></el-icon> 新建盘点单</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table :data="tableData" v-loading="loading" border stripe>
        <el-table-column prop="orderNo" label="单号" width="180" />
        <el-table-column prop="orderDate" label="盘点日期" width="110" />
        <el-table-column prop="warehouseName" label="仓库" width="120" />
        <el-table-column prop="totalQuantity" label="账面数量" width="90" align="center" />
        <el-table-column prop="actualQuantity" label="实盘数量" width="90" align="center" />
        <el-table-column label="盈亏数量" width="90" align="center">
          <template #default="{ row }">
            <span :class="row.profitLossQuantity > 0 ? 'profit' : row.profitLossQuantity < 0 ? 'loss' : ''">
              {{ row.profitLossQuantity }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="盈亏金额" width="110" align="right">
          <template #default="{ row }">
            <span :class="row.profitLossAmount > 0 ? 'profit' : row.profitLossAmount < 0 ? 'loss' : ''">
              ¥{{ row.profitLossAmount?.toFixed(2) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="120" show-overflow-tooltip />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="success" @click="handleComplete(row)" v-if="row.status === 'PENDING'">完成</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.size" :total="pagination.total" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next" @change="loadData" />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑盘点单' : '新建盘点单'" width="1000px" top="5vh">
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="100px">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="仓库" prop="warehouseId">
              <el-select v-model="form.warehouseId" placeholder="请选择" @change="handleWarehouseChange">
                <el-option v-for="w in warehouses" :key="w.id" :label="w.warehouseName" :value="w.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="盘点日期" prop="orderDate">
              <el-date-picker v-model="form.orderDate" type="date" value-format="YYYY-MM-DD" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button @click="handleLoadStock" :loading="loadingStock" :disabled="!form.warehouseId">
              <el-icon><Refresh /></el-icon> 加载库存
            </el-button>
          </el-col>
        </el-row>
        <el-form-item label="盘点明细">
          <el-table :data="form.items" border size="small" show-summary>
            <el-table-column prop="productCode" label="商品编码" width="120" />
            <el-table-column prop="productName" label="商品名称" min-width="150" />
            <el-table-column prop="snCode" label="SN码" width="150" />
            <el-table-column prop="bookQuantity" label="账面数量" width="90" align="center" />
            <el-table-column label="实盘数量" width="120" align="center">
              <template #default="{ row }">
                <el-input-number v-model="row.actualQuantity" :min="0" size="small" @change="val => calculateLoss(row)" />
              </template>
            </el-table-column>
            <el-table-column label="盈亏数量" width="90" align="center">
              <template #default="{ row }">
                <span :class="getLossClass(row)">{{ row.profitLossQuantity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="100" align="right">
              <template #default="{ row }">¥{{ row.price?.toFixed(2) }}</template>
            </el-table-column>
            <el-table-column label="盈亏金额" width="100" align="right">
              <template #default="{ row }">
                <span :class="getLossClass(row)">¥{{ row.profitLossAmount?.toFixed(2) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="账面总数">{{ form.items.reduce((sum, x) => sum + (x.bookQuantity || 0), 0) }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实盘总数">{{ form.items.reduce((sum, x) => sum + (x.actualQuantity || 0), 0) }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Refresh } from '@element-plus/icons-vue'
import { checkApi, warehouseApi, basicDataApi } from '@/api'

const loading = ref(false)
const loadingStock = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const tableData = ref([])
const warehouses = ref([])

const queryForm = reactive({ orderNo: '', warehouseId: '', dateRange: [], status: '' })
const pagination = reactive({ page: 1, size: 20, total: 0 })
const form = reactive({ id: '', warehouseId: '', orderDate: '', remark: '', items: [] })
const formRules = {
  warehouseId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  orderDate: [{ required: true, message: '请选择日期', trigger: 'change' }]
}

onMounted(() => { loadData(); loadWarehouses() })

const loadData = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (queryForm.orderNo) params.order_no = queryForm.orderNo
    if (queryForm.warehouseId) params.warehouse_id = queryForm.warehouseId
    if (queryForm.status) params.status = queryForm.status
    if (queryForm.dateRange?.length === 2) {
      params.order_date_start = queryForm.dateRange[0]
      params.order_date_end = queryForm.dateRange[1]
    }
    const res = await checkApi.list(params)
    tableData.value = res.list || []
    pagination.total = res.total || 0
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

const loadWarehouses = async () => {
  warehouses.value = await warehouseApi.getAll() || []
}

const handleWarehouseChange = () => { /* 可选：清空明细 */ }

const handleLoadStock = async () => {
  if (!form.warehouseId) return ElMessage.warning('请先选择仓库')
  loadingStock.value = true
  try {
    const stock = await basicDataApi.getInventoryByWarehouse(form.warehouseId)
    form.items = (stock || []).map(item => ({
      productId: item.productId,
      productCode: item.productCode,
      productName: item.productName,
      snCode: item.snCode || '-',
      bookQuantity: item.quantity,
      actualQuantity: item.quantity,
      price: item.costPrice || 0,
      profitLossQuantity: 0,
      profitLossAmount: 0
    }))
    ElMessage.success(`已加载 ${form.items.length} 条库存`)
  } catch (e) { ElMessage.error('加载库存失败') }
  finally { loadingStock.value = false }
}

const calculateLoss = (row) => {
  row.profitLossQuantity = (row.actualQuantity || 0) - (row.bookQuantity || 0)
  row.profitLossAmount = row.profitLossQuantity * (row.price || 0)
}

const getLossClass = (row) => row.profitLossQuantity > 0 ? 'profit' : row.profitLossQuantity < 0 ? 'loss' : ''

const handleSearch = () => { pagination.page = 1; loadData() }
const handleReset = () => { Object.assign(queryForm, { orderNo: '', warehouseId: '', dateRange: [], status: '' }); handleSearch() }

const handleCreate = () => {
  isEdit.value = false
  Object.assign(form, { id: '', warehouseId: '', orderDate: new Date().toISOString().slice(0, 10), remark: '', items: [] })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  checkApi.get(row.id).then(res => { Object.assign(form, res); dialogVisible.value = true })
}

const handleComplete = async (row) => {
  try {
    await ElMessageBox.confirm('确认完成盘点？完成后将更新库存数据', '提示', { type: 'warning' })
    await checkApi.complete(row.id)
    ElMessage.success('盘点完成')
    loadData()
  } catch (e) { if (e !== 'cancel') ElMessage.error('操作失败') }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除?', '警告', { type: 'warning' })
    await checkApi.delete(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) { if (e !== 'cancel') ElMessage.error('删除失败') }
}

const handleSave = async () => {
  try {
    await formRef.value.validate()
    if (!form.items.length) return ElMessage.warning('请先加载库存数据')
    // 计算汇总
    form.totalQuantity = form.items.reduce((sum, x) => sum + (x.bookQuantity || 0), 0)
    form.actualQuantity = form.items.reduce((sum, x) => sum + (x.actualQuantity || 0), 0)
    form.profitLossQuantity = form.items.reduce((sum, x) => sum + (x.profitLossQuantity || 0), 0)
    form.profitLossAmount = form.items.reduce((sum, x) => sum + (x.profitLossAmount || 0), 0)
    const data = {
      id: form.id,
      warehouseId: form.warehouseId,
      warehouseName: form.warehouseName,
      orderDate: form.checkDate,
      remark: form.remark,
      status: form.orderStatus,
      totalBookQuantity: form.totalQuantity,
      totalActualQuantity: form.actualQuantity,
      totalProfitQuantity: form.profitLossQuantity,
      totalProfitAmount: form.profitLossAmount,
      items: form.items
    }
    isEdit.value ? await checkApi.update(data) : await checkApi.create(data)
    ElMessage.success('保存成功')
    dialogVisible.value = false
    loadData()
  } catch (e) { console.error(e) }
}

const getStatusType = (s) => ({ PENDING: 'warning', COMPLETED: 'success' }[s] || '')
const getStatusText = (s) => ({ PENDING: '盘点中', COMPLETED: '已完成' }[s] || s)
</script>

<style scoped>
.check-page { padding: 16px; }
.filter-card { margin-bottom: 16px; }
.pagination { margin-top: 16px; display: flex; justify-content: flex-end; }
.profit { color: #67c23a; font-weight: bold; }
.loss { color: #f56c6c; font-weight: bold; }
</style>

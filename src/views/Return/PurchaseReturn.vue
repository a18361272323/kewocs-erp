<template>
  <div class="return-list">
    <el-card class="filter-card">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="单号">
          <el-input v-model="queryForm.orderNo" placeholder="请输入单号" clearable />
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="queryForm.supplierName" placeholder="请输入供应商" clearable />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="queryForm.dateRange"
            type="daterange"
            range-separator="至"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryForm.status" clearable>
            <el-option label="全部" value="" />
            <el-option label="待处理" value="PENDING" />
            <el-option label="已完成" value="COMPLETED" />
            <el-option label="已取消" value="CANCELLED" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleCreate">
            <el-icon><Plus /></el-icon> 新增
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table :data="tableData" v-loading="loading" border stripe>
        <el-table-column prop="orderNo" label="单号" width="180" />
        <el-table-column prop="orderDate" label="退货日期" width="110" />
        <el-table-column prop="supplierName" label="供应商" min-width="150" />
        <el-table-column prop="warehouseName" label="仓库" width="120" />
        <el-table-column prop="totalQuantity" label="数量" width="80" align="center" />
        <el-table-column prop="totalAmount" label="金额" width="120" align="right">
          <template #default="{ row }">
            ¥{{ row.totalAmount?.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="退货原因" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.size"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @change="loadData"
        />
      </div>
    </el-card>

    <!-- 退货单弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑采购退货单' : '新增采购退货单'"
      width="900px"
      top="5vh"
    >
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="100px">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="供应商" prop="supplierId">
              <el-select v-model="form.supplierId" filterable placeholder="请选择">
                <el-option v-for="s in suppliers" :key="s.id" :label="s.supplierName" :value="s.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库" prop="warehouseId">
              <el-select v-model="form.warehouseId" placeholder="请选择">
                <el-option v-for="w in warehouses" :key="w.id" :label="w.warehouseName" :value="w.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退货日期" prop="orderDate">
              <el-date-picker v-model="form.orderDate" type="date" value-format="YYYY-MM-DD" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="24">
            <el-form-item label="退货原因" prop="reason">
              <el-input v-model="form.reason" placeholder="请输入退货原因" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="商品明细">
          <el-table :data="form.items" border size="small">
            <el-table-column label="商品" width="180">
              <template #default="{ row }">
                <el-select v-model="row.productId" filterable placeholder="选择商品" @change="val => handleProductChange(val, row)">
                  <el-option v-for="p in products" :key="p.id" :label="p.productName" :value="p.id" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="snCode" label="SN码" width="160">
              <template #default="{ row }">
                <el-input v-model="row.snCode" placeholder="输入SN码" />
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="70" />
            <el-table-column prop="quantity" label="数量" width="100">
              <template #default="{ row }">
                <el-input-number v-model="row.quantity" :min="1" size="small" />
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="120">
              <template #default="{ row }">
                <el-input-number v-model="row.price" :precision="2" :min="0" size="small" />
              </template>
            </el-table-column>
            <el-table-column label="金额" width="100">
              <template #default="{ row }">
                ¥{{ ((row.quantity || 0) * (row.price || 0)).toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template #default="{ $index }">
                <el-button type="danger" size="small" @click="removeItem($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" size="small" @click="addItem" style="margin-top:8px">
            <el-icon><Plus /></el-icon> 添加商品
          </el-button>
        </el-form-item>
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
import { Search, Plus } from '@element-plus/icons-vue'
import { purchaseReturnApi, basicDataApi, warehouseApi } from '@/api'

const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const tableData = ref([])
const suppliers = ref([])
const warehouses = ref([])
const products = ref([])

const queryForm = reactive({ orderNo: '', supplierName: '', dateRange: [], status: '' })
const pagination = reactive({ page: 1, size: 20, total: 0 })
const form = reactive({ id: '', supplierId: '', warehouseId: '', orderDate: '', reason: '', remark: '', items: [] })
const formRules = {
  supplierId: [{ required: true, message: '请选择供应商', trigger: 'change' }],
  warehouseId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  orderDate: [{ required: true, message: '请选择日期', trigger: 'change' }]
}

onMounted(() => { loadData(); loadOptions() })

const loadData = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (queryForm.orderNo) params.order_no = queryForm.orderNo
    if (queryForm.status) params.status = queryForm.status
    if (queryForm.dateRange?.length === 2) {
      params.order_date_start = queryForm.dateRange[0]
      params.order_date_end = queryForm.dateRange[1]
    }
    // 注意：supplierName 是展示字段，如果表中只有 supplierId，需要通过 supplierId 筛选
    // 当前 queryForm 中无 supplierId，如需按供应商筛选请添加 supplierId 选择器
    const res = await purchaseReturnApi.list(params)
    tableData.value = res.list || []
    pagination.total = res.total || 0
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

const loadOptions = async () => {
  const [s, w, p] = await Promise.all([
    basicDataApi.getSuppliers(),
    warehouseApi.getAll(),
    basicDataApi.getSnProducts()
  ])
  suppliers.value = s || []
  warehouses.value = w || []
  products.value = p || []
}

const handleSearch = () => { pagination.page = 1; loadData() }
const handleReset = () => { Object.assign(queryForm, { orderNo: '', supplierName: '', dateRange: [], status: '' }); handleSearch() }

const handleCreate = () => {
  isEdit.value = false
  Object.assign(form, { id: '', supplierId: '', warehouseId: warehouses.value[0]?.id || '', orderDate: new Date().toISOString().slice(0, 10), reason: '', remark: '', items: [] })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  purchaseReturnApi.get(row.id).then(res => { Object.assign(form, res); dialogVisible.value = true })
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除?', '警告', { type: 'warning' })
    await purchaseReturnApi.delete(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) { if (e !== 'cancel') ElMessage.error('删除失败') }
}

const addItem = () => { form.items.push({ productId: '', productCode: '', productName: '', snCode: '', unit: '台', quantity: 1, price: 0 }) }
const removeItem = (index) => { form.items.splice(index, 1) }

const handleProductChange = (productId, row) => {
  const p = products.value.find(x => x.id === productId)
  if (p) { row.productCode = p.productCode; row.productName = p.productName; row.price = p.purchasePrice || 0 }
}

const handleSave = async () => {
  try {
    await formRef.value.validate()
    if (!form.items.length) return ElMessage.warning('请添加商品')
    const data = { ...form, reason: undefined }
    isEdit.value ? await purchaseReturnApi.update(data) : await purchaseReturnApi.create(data)
    ElMessage.success('保存成功')
    dialogVisible.value = false
    loadData()
  } catch (e) { console.error(e) }
}

const getStatusType = (s) => ({ PENDING: 'warning', COMPLETED: 'success', CANCELLED: 'info' }[s] || '')
const getStatusText = (s) => ({ PENDING: '待处理', COMPLETED: '已完成', CANCELLED: '已取消' }[s] || s)
</script>

<style scoped>
.return-list { padding: 16px; }
.filter-card { margin-bottom: 16px; }
.pagination { margin-top: 16px; display: flex; justify-content: flex-end; }
</style>

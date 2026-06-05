<template>
  <div class="sale-return-list">
    <el-card class="filter-card">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="单号">
          <el-input v-model="queryForm.order_no" placeholder="请输入单号" clearable />
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="queryForm.customer_name" placeholder="请输入客户" clearable />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="queryForm.dateRange" type="daterange" range-separator="至" value-format="YYYY-MM-DD" />
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
        <el-table-column prop="order_no" label="单号" width="180" />
        <el-table-column prop="order_date" label="退货日期" width="110" />
        <el-table-column prop="customer_name" label="客户" min-width="150" />
        <el-table-column prop="warehouse_name" label="仓库" width="120" />
        <el-table-column prop="total_amount" label="金额" width="120" align="right">
          <template #default="{ row }">¥{{ row.total_amount?.toFixed(2) }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="退货原因/备注" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.size" :total="pagination.total" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next" @change="loadData" />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑销售退货单' : '新增销售退货单'" width="900px" top="5vh">
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="100px">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="客户" prop="customer_id">
              <el-select v-model="form.customer_id" filterable placeholder="请选择" @change="val => { const c = customers.find(x => x.id === val); if (c) form.customer_name = c.customer_name }">
                <el-option v-for="c in customers" :key="c.id" :label="c.customer_name" :value="c.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库" prop="warehouse_id">
              <el-select v-model="form.warehouse_id" placeholder="请选择" @change="val => { const w = warehouses.find(x => x.id === val); if (w) form.warehouse_name = w.warehouse_name }">
                <el-option v-for="w in warehouses" :key="w.id" :label="w.warehouse_name" :value="w.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退货日期" prop="order_date">
              <el-date-picker v-model="form.order_date" type="date" value-format="YYYY-MM-DD" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入退货原因/备注" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="商品明细">
          <el-table :data="form.items" border size="small">
            <el-table-column label="商品" width="180">
              <template #default="{ row }">
                <el-select v-model="row.product_id" filterable placeholder="选择商品" @change="val => handleProductChange(val, row)">
                  <el-option v-for="p in products" :key="p.id" :label="p.product_name" :value="p.id" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="sn_codes" label="SN码" width="160">
              <template #default="{ row }">
                <el-input v-model="row.sn_codes" placeholder="输入SN码" />
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
              <template #default="{ row }">¥{{ ((row.quantity || 0) * (row.price || 0)).toFixed(2) }}</template>
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
import { saleReturnApi, returnOutDetailApi, basicDataApi, warehouseApi, snApi, deleteReceivable, adjustInventory } from '@/api'

const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const tableData = ref([])
const customers = ref([])
const warehouses = ref([])
const products = ref([])

const toList = (res) => {
  if (Array.isArray(res)) return res
  if (Array.isArray(res?.body)) return res.body
  if (Array.isArray(res?.data)) return res.data
  return res?.body?.list || res?.data?.list || []
}

const findSnByCode = async (code) => {
  const res = await snApi.list({ current: 1, pageSize: 9999 })
  return toList(res).find(sn => sn.sn_code === code)
}

const queryForm = reactive({ order_no: '', customer_name: '', dateRange: [], status: '' })
const pagination = reactive({ page: 1, size: 20, total: 0 })
const form = reactive({ id: '', customer_id: '', customer_name: '', warehouse_id: '', warehouse_name: '', order_date: '', remark: '', items: [] })
const formRules = {
  customer_id: [{ required: true, message: '请选择客户', trigger: 'change' }],
  warehouse_id: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  order_date: [{ required: true, message: '请选择日期', trigger: 'change' }]
}

onMounted(() => { loadData(); loadOptions() })

const loadData = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.page,
      pageSize: pagination.size
    }
    if (queryForm.order_no) params.order_no = queryForm.order_no
    if (queryForm.customer_name) params.customer_name = queryForm.customer_name
    if (queryForm.status) params.status = queryForm.status
    if (queryForm.dateRange?.length === 2) {
      params.order_date_start = queryForm.dateRange[0]
      params.order_date_end = queryForm.dateRange[1]
    }
    // 注意：customer_name 是展示字段，如果表中只有 customer_id，需要通过 customer_id 筛选
    // 当前 queryForm 中无 customer_id，如需按客户筛选请添加 customer_id 选择器
    const res = await saleReturnApi.list(params)
    tableData.value = res.body?.list || []
    pagination.total = res.body?.total || 0
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

const loadOptions = async () => {
  const [c, w, p] = await Promise.all([
    basicDataApi.getCustomers(),
    warehouseApi.getAll(),
    basicDataApi.getSnProducts()
  ])
  customers.value = toList(c)
  warehouses.value = toList(w)
  products.value = toList(p)
}

const handleSearch = () => { pagination.page = 1; loadData() }
const handleReset = () => { Object.assign(queryForm, { order_no: '', customer_name: '', dateRange: [], status: '' }); handleSearch() }

const handleCreate = () => {
  isEdit.value = false
  Object.assign(form, { id: '', customer_id: '', customer_name: '', warehouse_id: warehouses.value[0]?.id || '', warehouse_name: warehouses.value[0]?.warehouse_name || '', order_date: new Date().toISOString().slice(0, 10), remark: '', items: [] })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  saleReturnApi.getDetail(row.id).then(res => { const d = res.data || res.body || res; Object.assign(form, d); dialogVisible.value = true })
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除?', '警告', { type: 'warning' })
    await saleReturnApi.delete(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) { if (e !== 'cancel') ElMessage.error('删除失败') }
}

const addItem = () => { form.items.push({ product_id: '', product_code: '', product_name: '', sn_codes: '', unit: '台', quantity: 1, price: 0 }) }
const removeItem = (index) => { form.items.splice(index, 1) }

const handleProductChange = (product_id, row) => {
  const p = products.value.find(x => x.id === product_id)
  if (p) { row.product_code = p.product_code; row.product_name = p.product_name; row.unit = p.unit || "台"; row.price = p.sale_price || 0 }
}

const handleSave = async () => {
  try {
    await formRef.value.validate()
    if (!form.items.length) return ElMessage.warning('请添加商品')
    // SN状态校验：手动输入的SN需检查是否存在且状态可退
    for (const item of form.items) {
      if (item.sn_codes) {
        const codes = item.sn_codes.split(',').filter(Boolean)
        for (const code of codes) {
          try {
            const snRecord = await findSnByCode(code.trim())
            if (!snRecord) {
              return ElMessage.error('SN码 ' + code + ' 不存在，请检查')
            }
            if (snRecord.status !== 'SOLD' && snRecord.status !== 'RETURNED') {
              const statusMap = { INSTOCK: '在库', SOLD: '已售', RETURNED: '已退', LOST: '已盘亏', SCRAP: '已报废', PENDING: '待入库' }
              const statusText = statusMap[snRecord.status] || snRecord.status
              return ElMessage.error('SN码 ' + code + ' 当前状态为' + statusText + '，不可退货')
            }
          } catch (err) {
            return ElMessage.error('SN码 ' + code + ' 查询失败: ' + (err.message || '网络错误'))
          }
        }
      }
    }

    // 计算总金额
    form.total_amount = form.items.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0)
    if (!isEdit.value) form.status = 'PENDING'
    const data = { ...form };
    delete data.items;
    const res = isEdit.value ? await saleReturnApi.update(data) : await saleReturnApi.create(data)
    if (res.code === 'SUC0000') {
      // 新增时创建明细记录
      if (!isEdit.value && form.items && form.items.length > 0) {
        const orderNo = data.order_no
        await Promise.allSettled(
          form.items.map(item =>
            returnOutDetailApi.add({
              order_no: orderNo,
              product_id: item.product_id,
              product_code: item.product_code,
              product_name: item.product_name,
              unit: item.unit,
              quantity: item.quantity,
              price: item.price,
              amount: (item.quantity || 0) * (item.price || 0),
              sn_codes: item.sn_codes || '',
              sn_count: item.sn_codes ? item.sn_codes.split(',').filter(Boolean).length : 0,
            })
          )
        )
      }
      ElMessage.success('保存成功')
      // 退货成功后，更新SN状态为INSTOCK，清空客户关联
      for (const item of form.items) {
        if (item.sn_codes) {
          const codes = item.sn_codes.split(',').filter(Boolean)
          for (const code of codes) {
            try {
              const snRecord = await findSnByCode(code.trim())
              if (snRecord && snRecord.status === 'SOLD') {
                await snApi.edit({
                  id: snRecord.id,
                  sn_code: snRecord.sn_code,
                  status: 'INSTOCK',
                  warehouse_id: form.warehouse_id,
                  warehouse_name: form.warehouse_name,
                  customer_id: null,
                  source_order_type: 'RETURN'
                })
                await adjustInventory({
                  warehouse_id: form.warehouse_id,
                  warehouse_name: form.warehouse_name,
                  product_id: snRecord.product_id || item.product_id,
                  product_name: snRecord.product_name || item.product_name,
                  product_code: snRecord.product_code || item.product_code,
                  unit: item.unit || '台',
                  quantityDelta: 1,
                  snQuantityDelta: 1,
                  price: item.price || snRecord.price || 0
                })
              }
            } catch (err) { console.warn('SN ' + code + ' 状态更新失败:', err) }
          }
        }
      }
      // 删除对应的应收单
      if (form.source_order_no) {
        await deleteReceivable(form.source_order_no).catch(err => console.warn('应收单删除失败:', err))
      }
      dialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '保存失败')
    }
  } catch (e) { console.error(e) }
}

const getStatusType = (s) => ({ PENDING: 'warning', COMPLETED: 'success', CANCELLED: 'info' }[s] || '')
const getStatusText = (s) => ({ PENDING: '待处理', COMPLETED: '已完成', CANCELLED: '已取消' }[s] || s)
</script>

<style scoped>
.sale-return-list { padding: 16px; }
.filter-card { margin-bottom: 16px; }
.pagination { margin-top: 16px; display: flex; justify-content: flex-end; }
</style>

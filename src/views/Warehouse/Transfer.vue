<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="调拨单号">
          <el-input v-model="searchForm.order_no" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="调出仓库">
          <el-select v-model="searchForm.out_warehouse_id" placeholder="选择仓库" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouse_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="调入仓库">
          <el-select v-model="searchForm.in_warehouse_id" placeholder="选择仓库" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouse_name" :value="item.id" />
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
      <el-table-column prop="order_no" label="调拨单号" width="200" />
      <el-table-column prop="out_warehouse_name" label="调出仓库" width="120" />
      <el-table-column prop="in_warehouse_name" label="调入仓库" width="120" />
      <el-table-column prop="order_date" label="调拨日期" width="120" />
      <el-table-column prop="total_quantity" label="调拨数量" width="100" align="center" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
      <el-table-column prop="creator" label="创建人" width="100" />
      <el-table-column prop="created_at" label="创建时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">查看</el-button>
          <el-button v-if="row.status === 'DRAFT'" type="success" link @click="handleConfirm(row)">确认调拨</el-button>
          <el-button v-if="hasPermission('transfer:delete') && row.status === 'DRAFT'" type="danger" link @click="handleDelete(row)">删除</el-button>
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
            <el-form-item label="调出仓库" prop="out_warehouse_id">
              <el-select v-model="form.out_warehouse_id" placeholder="选择仓库" style="width: 100%" :disabled="isEdit" @change="handleout_warehouseChange">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouse_name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调入仓库" prop="in_warehouse_id">
              <el-select v-model="form.in_warehouse_id" placeholder="选择仓库" style="width: 100%" @change="handlein_warehouseChange">
                <el-option v-for="item in warehouseList.filter(w => w.id !== form.out_warehouse_id)" :key="item.id" :label="item.warehouse_name" :value="item.id" />
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
      <el-card v-if="form.out_warehouse_id && !isEdit" class="sn-select-area" shadow="never">
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
          <el-table-column prop="sn_code" label="SN 码" width="180" />
          <el-table-column prop="product_name" label="商品名称" min-width="150" />
          <el-table-column prop="product_code" label="商品编码" width="120" />
          <el-table-column prop="stock_in_time" label="入库日期" width="120" />
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
          <el-table-column prop="sn_code" label="SN 码" width="180" />
          <el-table-column prop="product_name" label="商品名称" min-width="150" />
          <el-table-column prop="product_code" label="商品编码" width="120" />
        </el-table>
      </el-card>

      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" :disabled="!form.out_warehouse_id || !form.in_warehouse_id" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="调拨单详情" width="900px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="调拨单号">{{ currentOrder.order_no }}</el-descriptions-item>
        <el-descriptions-item label="调拨日期">{{ currentOrder.order_date }}</el-descriptions-item>
        <el-descriptions-item label="调出仓库">{{ currentOrder.out_warehouse_name }}</el-descriptions-item>
        <el-descriptions-item label="调入仓库">{{ currentOrder.in_warehouse_name }}</el-descriptions-item>
        <el-descriptions-item label="调拨数量">{{ currentOrder.total_quantity }} 台</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder.status)">{{ getStatusText(currentOrder.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建人">{{ currentOrder.creator }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(currentOrder.created_at) }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>调拨明细</el-divider>

      <el-table :data="currentOrder.items" border>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="sn_code" label="SN 码" width="180">
          <template #default="{ row }">
            <el-tag type="info">{{ row.sn_code }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="product_name" label="商品名称" min-width="150" />
        <el-table-column prop="product_code" label="商品编码" width="120" />
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
import { transferApi, transferDetailApi, getWarehouseSimpleList, snApi, adjustInventory } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 列表数据
const loading = ref(false)
const orderList = ref([])
const warehouseList = ref([])
const warehouseSnList = ref([])
const selectedSnList = ref([])

const toList = (res) => {
  if (Array.isArray(res)) return res
  if (Array.isArray(res?.body)) return res.body
  if (Array.isArray(res?.data)) return res.data
  return res?.body?.list || res?.data?.list || []
}

const findSnByCode = async (code) => {
  const res = await snApi.getList({ current: 1, pageSize: 9999 })
  return toList(res).find(sn => sn.sn_code === code)
}

// 搜索表单
const searchForm = reactive({
  order_no: '',
  out_warehouse_id: null,
  in_warehouse_id: null
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
  order_no: '',
  out_warehouse_id: null,
  out_warehouse_name: '',
  in_warehouse_id: null,
  in_warehouse_name: '',
  transferDate: new Date().toISOString().split('T')[0],
  totalQuantity: 0,
  remark: '',
  status: 'DRAFT',
  items: []
})

const rules = {
  out_warehouse_id: [{ required: true, message: '请选择调出仓库', trigger: 'change' }],
  in_warehouse_id: [{ required: true, message: '请选择调入仓库', trigger: 'change' }],
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
    if (searchForm.order_no) params.order_no = searchForm.order_no
    if (searchForm.out_warehouse_id) params.out_warehouse_id = searchForm.out_warehouse_id
    if (searchForm.in_warehouse_id) params.in_warehouse_id = searchForm.in_warehouse_id

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
      warehouseList.value = res.body?.list || []
    }
  } catch (error) {
    console.error('加载仓库列表失败:', error)
  }
}

// 加载调出仓库的 SN 列表
async function loadWarehouseSn(warehouse_id) {
  if (!warehouse_id) {
    warehouseSnList.value = []
    return
  }
  try {
    const res = await snApi.getByWarehouse(warehouse_id)
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
  searchForm.order_no = ''
  searchForm.out_warehouse_id = null
  searchForm.in_warehouse_id = null
  handleSearch()
}

// 新增
function handleCreate() {
  isEdit.value = false
  form.id = null
  form.order_no = ''
  form.out_warehouse_id = null
  form.out_warehouse_name = ''
  form.in_warehouse_id = null
  form.in_warehouse_name = ''
  form.transferDate = new Date().toISOString().split('T')[0]
  form.totalQuantity = 0
  form.remark = ''
  form.status = 'DRAFT'
  form.items = []
  warehouseSnList.value = []
  selectedSnList.value = []
  formVisible.value = true
}

// 调出仓库变化
function handleout_warehouseChange(warehouse_id) {
  const warehouse = warehouseList.value.find(w => w.id === warehouse_id)
  if (warehouse) {
    form.out_warehouse_name = warehouse.warehouse_name
  }
  // 清空已选 SN，重新加载
  selectedSnList.value = []
  warehouseSnList.value = []
  if (snTableRef.value) {
    snTableRef.value.clearSelection()
  }
  loadWarehouseSn(warehouse_id)
}

// 调入仓库变化
function handlein_warehouseChange(warehouse_id) {
  const warehouse = warehouseList.value.find(w => w.id === warehouse_id)
  if (warehouse) {
    form.in_warehouse_name = warehouse.warehouse_name
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
          sn_code: sn.sn_code,
          product_id: sn.product_id,
          product_name: sn.product_name,
          product_code: sn.product_code
        }))

    const orderNo = form.order_no || `DB${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.floor(Math.random() * 9000) + 1000)}`
    const data = {
      out_warehouse_id: form.out_warehouse_id,
      out_warehouse_name: form.out_warehouse_name,
      in_warehouse_id: form.in_warehouse_id,
      in_warehouse_name: form.in_warehouse_name,
      order_no: orderNo,
      order_date: form.transferDate,
      remark: form.remark,
      status: isEdit.value ? undefined : 'DRAFT',
      total_quantity: items.length
    }
    if (isEdit.value) data.id = form.id

    const res = isEdit.value
      ? await transferApi.edit(data)
      : await transferApi.add(data)

    if (res.code === 'SUC0000') {
      if (!isEdit.value && items.length > 0) {
        const orderId = res.body?.id || res.data?.id
        const detailResults = await Promise.allSettled(
          items.map(item => transferDetailApi.add({
            order_id: orderId,
            order_no: orderNo,
            product_id: item.product_id,
            product_code: item.product_code,
            product_name: item.product_name,
            quantity: 1,
            sn_codes: item.sn_code,
            sn_count: 1
          }))
        )
        const failures = detailResults.filter(result => result.status === 'rejected')
        if (failures.length > 0) {
          console.error('调拨明细创建部分失败:', failures.length, '条')
        }
      }
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
      `确认执行调拨？\n调出仓库：${row.out_warehouse_name}\n调入仓库：${row.in_warehouse_name}\n调拨数量：${row.total_quantity} 台`,
      '确认调拨',
      { type: 'warning' }
    )

    loading.value = true

    // 1. 获取调拨单明细。平台的主表详情不稳定携带 items，优先从明细模型按单号回读。
    let items = []
    try {
      const detailListRes = await transferDetailApi.getList({
        order_no: row.order_no,
        current: 1,
        pageSize: 9999
      })
      items = toList(detailListRes)
    } catch (e) {
      console.warn('按单号获取调拨明细失败:', e)
    }
    if (!items.length) {
      try {
        const detailRes = await transferApi.getDetail(row.id)
        items = detailRes.body?.items || detailRes.data?.items || []
      } catch (e) {
        console.warn('从主表详情获取调拨明细失败:', e)
      }
    }

    // 2. 更新每个 SN 的仓库归属，并同步两仓库存台账
    let updated = 0
    const movedSnRecords = []
    for (const item of items) {
      const codes = String(item.sn_code || item.sn_codes || item.snCode || '').split(',').map(code => code.trim()).filter(Boolean)
      for (const code of codes) {
        try {
          const snRecord = await findSnByCode(code)
          if (!snRecord?.id) throw new Error('SN不存在或无法定位')
          await snApi.edit({
            id: snRecord.id,
            sn_code: snRecord.sn_code,
            warehouse_id: row.in_warehouse_id,
            warehouse_name: row.in_warehouse_name
          })
          movedSnRecords.push(snRecord)
          updated++
        } catch (e) {
          console.warn(`更新 SN ${code} 仓库失败:`, e)
        }
      }
    }

    const inventoryGroups = new Map()
    movedSnRecords.forEach(sn => {
      const key = sn.product_id
      if (!inventoryGroups.has(key)) inventoryGroups.set(key, { ...sn, count: 0 })
      inventoryGroups.get(key).count += 1
    })
    await Promise.allSettled(Array.from(inventoryGroups.values()).flatMap(sn => [
      adjustInventory({
        warehouse_id: row.out_warehouse_id,
        warehouse_name: row.out_warehouse_name,
        product_id: sn.product_id,
        product_name: sn.product_name,
        product_code: sn.product_code,
        unit: sn.unit || '台',
        quantityDelta: -sn.count,
        snQuantityDelta: -sn.count,
        price: sn.purchase_price || sn.price || 0
      }),
      adjustInventory({
        warehouse_id: row.in_warehouse_id,
        warehouse_name: row.in_warehouse_name,
        product_id: sn.product_id,
        product_name: sn.product_name,
        product_code: sn.product_code,
        unit: sn.unit || '台',
        quantityDelta: sn.count,
        snQuantityDelta: sn.count,
        price: sn.purchase_price || sn.price || 0
      })
    ]))

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

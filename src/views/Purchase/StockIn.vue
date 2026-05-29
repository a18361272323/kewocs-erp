<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="入库单号">
          <el-input v-model="searchForm.orderNo" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="供应商">
          <el-select v-model="searchForm.supplierId" placeholder="选择供应商" clearable style="width: 180px">
            <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="searchForm.warehouseId" placeholder="选择仓库" clearable style="width: 180px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 240px"
          />
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
        <el-button v-if="hasPermission('stockIn:create')" type="primary" :icon="Plus" @click="handleCreate">新增入库</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="orderNo" label="入库单号" width="180" fixed />
      <el-table-column prop="supplierName" label="供应商" min-width="150" />
      <el-table-column prop="warehouseName" label="入库仓库" width="120" />
      <el-table-column prop="orderDate" label="入库日期" width="120" />
      <el-table-column prop="totalQuantity" label="数量" width="80" align="center" />
      <el-table-column prop="totalAmount" label="金额" width="120" align="right">
        <template #default="{ row }">
          ￥{{ formatMoney(row.totalAmount) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">查看</el-button>
          <el-button v-if="row.status === 'CONFIRMED'" type="danger" link @click="handleCancel(row)">取消</el-button>
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

    <!-- ========== 新增/编辑入库弹窗 ========== -->
    <el-dialog
      v-model="formVisible"
      :title="isEdit ? '编辑入库单' : '新增入库'"
      width="1100px"
      top="5vh"
      :close-on-click-modal="false"
      class="stock-in-dialog"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <!-- 基本信息 -->
        <el-card header="基本信息" class="form-card">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="供应商" prop="supplierId">
                <el-select v-model="form.supplierId" placeholder="选择供应商" style="width: 100%" @change="handleSupplierChange">
                  <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库仓库" prop="warehouseId">
                <el-select v-model="form.warehouseId" placeholder="选择仓库" style="width: 100%" @change="handleWarehouseChange">
                  <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库日期" prop="orderDate">
                <el-date-picker
                  v-model="form.orderDate"
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
        </el-card>

        <!-- SN码录入区 -->
        <el-card header="SN码录入" class="form-card">
          <div class="sn-input-area">
            <el-row :gutter="20" align="middle">
              <el-col :span="8">
                <el-form-item label="SN码" label-width="60px" style="margin-bottom: 0">
                  <el-input
                    ref="snInputRef"
                    v-model="currentSn"
                    placeholder="扫描或输入SN码后按回车"
                    @keyup.enter="handleAddSn"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商品" label-width="50px" style="margin-bottom: 0" prop="currentProductId">
                  <el-select v-model="form.currentProductId" placeholder="选择商品" style="width: 100%" allow-create filterable>
                    <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单价" label-width="50px" style="margin-bottom: 0" prop="currentUnitPrice">
                  <el-input-number
                    v-model="form.currentUnitPrice"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" :icon="Plus" @click="handleAddSn">添加入库</el-button>
                <el-button :icon="Refresh" @click="handleClearSn">清空</el-button>
              </el-col>
            </el-row>
            <div class="sn-tip">
              <el-icon><InfoFilled /></el-icon>
              <span>输入SN码后选择商品和单价，点击"添加入库"或按回车键将该机器添加到列表中</span>
            </div>
          </div>
        </el-card>

        <!-- 入库明细列表 -->
        <el-card header="入库明细" class="form-card">
          <el-table :data="form.items" border max-height="400">
            <el-table-column type="index" label="序号" width="60" align="center" fixed />
            <el-table-column prop="snCode" label="SN码" width="180" fixed>
              <template #default="{ row }">
                <el-tag type="info">{{ row.snCode }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="商品" min-width="200">
              <template #default="{ row }">
                <span>{{ row.productName || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="productCode" label="商品编码" width="120" />
            <el-table-column prop="unitPrice" label="单价" width="100" align="right">
              <template #default="{ row }">
                ￥{{ formatMoney(row.unitPrice) }}
              </template>
            </el-table-column>
            <el-table-column label="SN状态" width="100" align="center">
              <template #default="{ row }">
                <el-tag :type="row.snCode ? 'success' : 'info'" size="small">
                  {{ row.snCode ? '已录入' : '待录入' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center" fixed="right">
              <template #default="{ $index }">
                <el-button type="danger" link @click="handleRemoveItem($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 汇总信息 -->
          <div class="summary-area">
            <span class="summary-item">入库数量：<strong>{{ form.items.length }}</strong> 台</span>
            <span class="summary-item">入库金额：<strong class="amount">￥{{ formatMoney(totalAmount) }}</strong></span>
          </div>
        </el-card>
      </el-form>

      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" :disabled="form.items.length === 0" @click="handleSubmit">
          确认入库 ({{ form.items.length }}台)
        </el-button>
      </template>
    </el-dialog>

    <!-- ========== 查看详情弹窗 ========== -->
    <el-dialog v-model="detailVisible" title="入库单详情" width="900px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="入库单号">{{ currentOrder.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="入库日期">{{ currentOrder.orderDate }}</el-descriptions-item>
        <el-descriptions-item label="供应商">{{ currentOrder.supplierName }}</el-descriptions-item>
        <el-descriptions-item label="入库仓库">{{ currentOrder.warehouseName }}</el-descriptions-item>
        <el-descriptions-item label="入库数量">{{ currentOrder.totalQuantity || currentOrder.items?.length }} 台</el-descriptions-item>
        <el-descriptions-item label="单据金额">￥{{ formatMoney(currentOrder.totalAmount) }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder.status)">{{ getStatusText(currentOrder.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建人">{{ currentOrder.creator }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(currentOrder.createTime) }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>入库明细</el-divider>

      <el-table :data="currentOrder.items" border max-height="300">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="snCode" label="SN码" width="180">
          <template #default="{ row }">
            <el-tag type="info">{{ row.snCode || '-' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" min-width="150" />
        <el-table-column prop="productCode" label="商品编码" width="120" />
        <el-table-column prop="unitPrice" label="单价" width="100" align="right">
          <template #default="{ row }">
            ￥{{ formatMoney(row.unitPrice) }}
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { stockInApi, basicDataApi, snApi } from '@/api'
import { formatMoney, formatDate } from '@/utils/format'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

function hasPermission(permission) {
  return appStore.hasPermission(permission)
}

// 状态
const loading = ref(false)
const formVisible = ref(false)
const detailVisible = ref(false)
const isEdit = ref(false)
const submitting = ref(false)
const snInputRef = ref(null)

// 当前录入的SN码
const currentSn = ref('')

// 搜索表单
const searchForm = reactive({
  orderNo: '',
  supplierId: '',
  warehouseId: '',
  dateRange: []
})

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// 列表数据
const orderList = ref([])

// 下拉数据
const supplierList = ref([])
const warehouseList = ref([])
const productList = ref([])

// 当前查看的订单
  items: [],
  warehouseName: '',
  supplierName: '',

// 表单数据
const form = reactive({
  supplierId: '',
  warehouseId: '',
  orderDate: new Date().toISOString().slice(0, 10),
  remark: '',
  // 当前录入
  currentProductId: '',
  currentUnitPrice: 0,
  // 明细列表
  items: []
})

// 表单验证规则
const rules = {
  supplierId: [{ required: true, message: '请选择供应商', trigger: 'change' }],
  warehouseId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  orderDate: [{ required: true, message: '请选择入库日期', trigger: 'change' }]
}

// 计算总金额
const totalAmount = computed(() => {
  return form.items.reduce((sum, item) => sum + (item.unitPrice || 0), 0)
})

// 状态映射
const statusMap = {
  DRAFT: { text: '草稿', type: 'info' },
  CONFIRMED: { text: '已确认', type: 'success' },
  CANCELLED: { text: '已取消', type: 'danger' }
}

const getStatusType = (status) => statusMap[status]?.type || 'info'
const getStatusText = (status) => statusMap[status]?.text || status

// 加载下拉数据
const loadSelectData = async () => {
  try {
    const [supplierRes, warehouseRes, productRes] = await Promise.all([
      basicDataApi.getSupplierList({ current: 1, pageSize: 9999 }),
      basicDataApi.getWarehouseList({ current: 1, pageSize: 9999 }),
      basicDataApi.getProductList({ current: 1, pageSize: 9999 })
    ])
    supplierList.value = supplierRes?.data?.list || []
    warehouseList.value = warehouseRes?.data?.list || []
    productList.value = productRes?.data?.list || []
  } catch (err) {
    console.error('加载下拉数据失败:', err)
  }
}

// 加载列表数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (searchForm.orderNo) params.order_no = searchForm.orderNo
    if (searchForm.supplierId) params.supplier_id = searchForm.supplierId
    if (searchForm.warehouseId) params.warehouse_id = searchForm.warehouseId
    if (searchForm.dateRange?.length === 2) {
      params.order_date_start = searchForm.dateRange[0]
      params.order_date_end = searchForm.dateRange[1]
    }
    const res = await stockInApi.getList(params)
    orderList.value = res?.data?.list || []
    pagination.total = res?.data?.total || 0
  } catch (err) {
    console.error('加载入库单列表失败:', err)
    ElMessage.error('加载入库单列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    orderNo: '',
    supplierId: '',
    warehouseId: '',
    dateRange: []
  })
  handleSearch()
}

// 新增入库
const handleCreate = () => {
  isEdit.value = false
  resetForm()
  formVisible.value = true
  nextTick(() => {
    snInputRef.value?.focus()
  })
}

// 重置表单
const resetForm = () => {
  currentSn.value = ''
  Object.assign(form, {
    supplierId: '',
    warehouseId: '',
    orderDate: new Date().toISOString().slice(0, 10),
    remark: '',
    currentProductId: '',
    currentUnitPrice: 0,
    items: []
  })
}

// 供应商变更
const handleSupplierChange = () => {
  // 可根据供应商加载默认商品等
  const supplier = supplierList.value.find(s => s.id === form.supplierId)
  if (supplier) form.supplierName = supplier.supplierName
}

// 仓库变更
const handleWarehouseChange = () => {
  const warehouse = warehouseList.value.find(w => w.id === form.warehouseId)
  if (warehouse) form.warehouseName = warehouse.warehouseName
}

// 添加入库（SN码）
const handleAddSn = async () => {
  const sn = currentSn.value.trim()
  const productId = form.currentProductId
  const unitPrice = form.currentUnitPrice

  if (!sn) {
    ElMessage.warning('请输入SN码')
    return
  }

  // 检查是否已存在
  if (form.items.some(item => item.snCode === sn)) {
    ElMessage.warning('该SN码已添加，请勿重复添加')
    currentSn.value = ''
    snInputRef.value?.focus()
    return
  }

  // 查找商品信息
  const product = productList.value.find(p => p.id === productId)
  if (!product) {
    ElMessage.warning('请选择商品')
    return
  }

  // 添加到列表
  form.items.push({
    snCode: sn,
    productId: product.id,
    productName: product.productName,
    productCode: product.productCode,
    unitPrice: unitPrice || 0
  })

  // 清空SN码输入框，自动填入相同商品继续扫码
  currentSn.value = ''
  nextTick(() => {
    snInputRef.value?.focus()
  })

  ElMessage.success(`已添加 SN码: ${sn}`)
}

// 清空当前录入
const handleClearSn = () => {
  currentSn.value = ''
  form.currentProductId = ''
  form.currentUnitPrice = 0
  snInputRef.value?.focus()
}

// 移除明细
const handleRemoveItem = (index) => {
  form.items.splice(index, 1)
}

// 提交入库
const handleSubmit = async () => {
  if (form.items.length === 0) {
    ElMessage.warning('请先添加入库明细')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认入库 ${form.items.length} 台机器？`,
      '确认入库',
      { type: 'warning' }
    )
  } catch {
    return
  }

  submitting.value = true
  try {
    // 1. 创建入库单
    const orderRes = await stockInApi.add({
      supplierId: form.supplierId,
      warehouseId: form.warehouseId,
      orderDate: form.orderDate,
      remark: form.remark,
      totalAmount: totalAmount.value
    })

    const orderId = orderRes?.data?.id
    if (!orderId) {
      throw new Error('创建入库单失败')
    }

    // 2. 批量创建/更新SN码状态（新SN先add，已存在的SN用edit）
    const snUpdatePromises = form.items.map(async (item) => {
      const snData = {
        snCode: item.snCode,
        status: 'INSTOCK',
        warehouseId: form.warehouseId,
        warehouseName: form.warehouseName,
        stockInTime: form.orderDate,
        sourceOrderNo: orderRes?.data?.orderNo || orderId,
        sourceOrderType: 'PURCHASE',
        productId: item.productId,
        productName: item.productName,
        productCode: item.productCode,
        purchasePrice: item.unitPrice,
        supplierId: form.supplierId,
        supplierName: form.supplierName
      }
      try {
        return await snApi.add(snData)
      } catch (e) {
        // SN已存在，降级为编辑
        console.warn(`SN ${item.snCode} 已存在，降级为编辑:`, e)
        return await snApi.edit(snData)
      }
    })

    await Promise.all(snUpdatePromises)

    ElMessage.success('入库成功！')
    formVisible.value = false
    loadData()
  } catch (err) {
    console.error('入库失败:', err)
    // rollback: delete orphaned order
    if (orderId) { try { await stockInApi.delete(orderId) } catch (e) { console.warn('rollback fail', e) } }
    ElMessage.error(err.message || '入库失败')
  } finally {
    submitting.value = false
  }
}

// 查看详情
const handleDetail = async (row) => {
  try {
    const res = await stockInApi.getDetail(row.id)
    currentOrder.value = res?.data || row
    detailVisible.value = true
  } catch (err) {
    console.error('获取详情失败:', err)
    ElMessage.error('获取详情失败')
  }
}

// 取消入库单
const handleCancel = async (row) => {
  try {
    await ElMessageBox.confirm('确认取消该入库单？取消后相关SN码状态将恢复', '取消入库', { type: 'warning' })
    await stockInApi.edit({ id: row.id, status: 'CANCELLED' })
    ElMessage.success('已取消')
    loadData()
  } catch (err) {
    if (err !== 'cancel') {
      console.error('取消失败:', err)
      ElMessage.error('取消失败')
    }
  }
}

// 页面加载
onMounted(() => {
  loadSelectData()
  loadData()
})
</script>

<style scoped>
.page-container {
  padding: 16px;
}

.search-card {
  margin-bottom: 16px;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.form-card {
  margin-bottom: 16px;
}

.sn-input-area {
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.sn-tip {
  margin-top: 10px;
  font-size: 12px;
  color: #909399;
  display: flex;
  align-items: center;
  gap: 5px;
}

.summary-area {
  margin-top: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 4px;
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  font-size: 14px;
}

.summary-area .amount {
  font-size: 18px;
  color: #f56c6c;
  font-weight: bold;
}

:deep(.el-dialog__body) {
  max-height: 70vh;
  overflow-y: auto;
}
</style>

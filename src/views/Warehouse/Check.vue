<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="盘点单号">
          <el-input v-model="searchForm.checkNo" placeholder="输入单号" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="盘点仓库">
          <el-select v-model="searchForm.warehouseId" placeholder="选择仓库" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.orderStatus" placeholder="选择状态" clearable style="width: 120px">
            <el-option label="草稿" value="DRAFT" />
            <el-option label="盘点中" value="CHECKING" />
            <el-option label="已完成" value="COMPLETED" />
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
        <el-button v-if="hasPermission('check:create')" type="primary" :icon="Plus" @click="handleCreate">新增盘点</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="checkNo" label="盘点单号" width="180" />
      <el-table-column prop="warehouseName" label="盘点仓库" width="120" />
      <el-table-column prop="checkDate" label="盘点日期" width="120" />
      <el-table-column prop="totalSystemQty" label="系统数量" width="100" align="center" />
      <el-table-column prop="totalActualQty" label="实盘数量" width="100" align="center" />
      <el-table-column prop="lossQty" label="盘亏" width="80" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.lossQty > 0" type="danger" size="small">{{ row.lossQty }}</el-tag>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column prop="profitQty" label="盘盈" width="80" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.profitQty > 0" type="warning" size="small">{{ row.profitQty }}</el-tag>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderStatus" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.orderStatus)">{{ getStatusText(row.orderStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="160">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">查看</el-button>
          <el-button v-if="row.orderStatus === 'DRAFT' || row.orderStatus === 'CHECKING'" type="success" link @click="handleContinue(row)">继续盘点</el-button>
          <el-button v-if="row.orderStatus === 'CHECKING'" type="warning" link @click="handleComplete(row)">完成盘点</el-button>
          <el-button v-if="hasPermission('check:delete') && row.orderStatus === 'DRAFT'" type="danger" link @click="handleDelete(row)">删除</el-button>
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

    <!-- ========== 新增/编辑盘点弹窗 ========== -->
    <el-dialog
      v-model="formVisible"
      :title="isEdit ? '继续盘点' : '新增盘点单'"
      width="1100px"
      top="5vh"
      :close-on-click-modal="false"
      class="check-dialog"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <!-- 基本信息 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="盘点仓库" prop="warehouseId">
              <el-select v-model="form.warehouseId" placeholder="选择仓库" style="width: 100%" :disabled="isEdit" @change="handleWarehouseChange">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="盘点日期" prop="checkDate">
              <el-date-picker
                v-model="form.checkDate"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- SN 盘点区域 -->
      <el-card v-if="form.warehouseId" class="check-area" shadow="never">
        <template #header>
          <div class="check-header">
            <span>SN 码盘点</span>
            <div class="check-stats">
              <el-tag type="info">系统库存: {{ systemSnList.length }} 台</el-tag>
              <el-tag type="success">已盘点: {{ checkedCount }} 台</el-tag>
              <el-tag v-if="lossCount > 0" type="danger">盘亏: {{ lossCount }} 台</el-tag>
              <el-tag v-if="profitCount > 0" type="warning">盘盈: {{ profitCount }} 台</el-tag>
            </div>
          </div>
        </template>

        <!-- 扫描输入 -->
        <div class="scan-area">
          <el-input
            ref="snInputRef"
            v-model="currentSn"
            placeholder="扫描或输入 SN 码后按回车"
            clearable
            style="width: 320px"
            @keyup.enter="handleScanSn"
          >
            <template #append>
              <el-button :icon="Plus" @click="handleScanSn">添加</el-button>
            </template>
          </el-input>
          <el-text type="info" class="scan-tip">扫描实际库存中的 SN 码，系统将自动比对</el-text>
        </div>

        <!-- SN 明细表格 -->
        <el-table :data="displaySnList" border max-height="400" size="small">
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="snCode" label="SN 码" width="180">
            <template #default="{ row }">
              <el-tag :type="getSnTagType(row)">{{ row.snCode }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="商品名称" min-width="150" />
          <el-table-column prop="productCode" label="商品编码" width="120" />
          <el-table-column label="系统状态" width="100" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.inSystem" type="success" size="small">在库</el-tag>
              <el-tag v-else type="info" size="small">未录入</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="盘点结果" width="100" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.diffType === 'NONE'" type="success" size="small">正常</el-tag>
              <el-tag v-else-if="row.diffType === 'LOSS'" type="danger" size="small">盘亏</el-tag>
              <el-tag v-else-if="row.diffType === 'PROFIT'" type="warning" size="small">盘盈</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template #default="{ row }">
              <el-button v-if="row.inSystem && !row.scanned" type="primary" link size="small" @click="markChecked(row)">标记已盘</el-button>
              <el-button v-if="row.scanned" type="danger" link size="small" @click="removeScanned(row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" :disabled="!form.warehouseId || displaySnList.length === 0" :loading="submitting" @click="handleSave">保存盘点</el-button>
        <el-button type="success" :disabled="!form.warehouseId || displaySnList.length === 0" :loading="submitting" @click="handleCompleteCheck">完成盘点</el-button>
      </template>
    </el-dialog>

    <!-- ========== 查看详情弹窗 ========== -->
    <el-dialog v-model="detailVisible" title="盘点单详情" width="1000px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="盘点单号">{{ currentOrder.checkNo }}</el-descriptions-item>
        <el-descriptions-item label="盘点日期">{{ currentOrder.checkDate }}</el-descriptions-item>
        <el-descriptions-item label="盘点仓库">{{ currentOrder.warehouseName }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder.orderStatus)">{{ getStatusText(currentOrder.orderStatus) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="系统数量">{{ currentOrder.totalSystemQty }} 台</el-descriptions-item>
        <el-descriptions-item label="实盘数量">{{ currentOrder.totalActualQty }} 台</el-descriptions-item>
        <el-descriptions-item label="盘亏">
          <el-tag v-if="currentOrder.lossQty > 0" type="danger">{{ currentOrder.lossQty }} 台</el-tag>
          <span v-else>0 台</span>
        </el-descriptions-item>
        <el-descriptions-item label="盘盈">
          <el-tag v-if="currentOrder.profitQty > 0" type="warning">{{ currentOrder.profitQty }} 台</el-tag>
          <span v-else>0 台</span>
        </el-descriptions-item>
        <el-descriptions-item label="创建人">{{ currentOrder.creator }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(currentOrder.createTime) }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>盘点明细</el-divider>

      <el-table :data="currentOrder.items" border max-height="400" size="small">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="snCode" label="SN 码" width="180">
          <template #default="{ row }">
            <el-tag :type="row.diffType === 'PROFIT' ? 'warning' : row.diffType === 'LOSS' ? 'danger' : 'success'">{{ row.snCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" min-width="150" />
        <el-table-column prop="productCode" label="商品编码" width="120" />
        <el-table-column label="盘点结果" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.diffType === 'NONE'" type="success" size="small">正常</el-tag>
            <el-tag v-else-if="row.diffType === 'LOSS'" type="danger" size="small">盘亏</el-tag>
            <el-tag v-else-if="row.diffType === 'PROFIT'" type="warning" size="small">盘盈</el-tag>
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
import { checkApi, getWarehouseSimpleList, snApi } from '@/api'
import { formatDate } from '@/utils/format'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 列表数据
const loading = ref(false)
const orderList = ref([])
const warehouseList = ref([])

// 搜索表单
const searchForm = reactive({
  checkNo: '',
  warehouseId: null,
  orderStatus: null
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
const isEdit = ref(false)
const submitting = ref(false)
const snInputRef = ref(null)
const currentSn = ref('')

const form = reactive({
  id: null,
  warehouseId: null,
  warehouseName: '',
  checkDate: new Date().toISOString().slice(0, 10),
  remark: '',
  orderStatus: 'DRAFT'
})

const rules = {
  warehouseId: [{ required: true, message: '请选择盘点仓库', trigger: 'change' }],
  checkDate: [{ required: true, message: '请选择盘点日期', trigger: 'change' }]
}

// 系统库存 SN 列表
const systemSnList = ref([])
// 扫描到的 SN 列表（盘盈）
const scannedSnList = ref([])

// 合并显示的 SN 列表（系统 + 扫描到的盘盈）
const displaySnList = computed(() => {
  const map = new Map()

  // 先放入系统 SN
  systemSnList.value.forEach(sn => {
    map.set(sn.snCode, {
      ...sn,
      inSystem: true,
      scanned: sn.scanned || false,
      diffType: sn.scanned ? 'NONE' : 'LOSS'
    })
  })

  // 再放入扫描到的 SN（盘盈）
  scannedSnList.value.forEach(sn => {
    if (map.has(sn.snCode)) {
      // 已存在，标记为已盘点
      const existing = map.get(sn.snCode)
      existing.scanned = true
      existing.diffType = 'NONE'
    } else {
      // 盘盈
      map.set(sn.snCode, {
        ...sn,
        inSystem: false,
        scanned: true,
        diffType: 'PROFIT'
      })
    }
  })

  return Array.from(map.values())
})

// 统计
const checkedCount = computed(() => displaySnList.value.filter(sn => sn.scanned).length)
const lossCount = computed(() => displaySnList.value.filter(sn => sn.diffType === 'LOSS').length)
const profitCount = computed(() => displaySnList.value.filter(sn => sn.diffType === 'PROFIT').length)

// 详情弹窗
const detailVisible = ref(false)
const currentOrder = ref({ items: [] })

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
    if (searchForm.checkNo) params.order_no = searchForm.checkNo
    if (searchForm.warehouseId) params.warehouse_id = searchForm.warehouseId
    if (searchForm.orderStatus) params.status = searchForm.orderStatus

    const res = await checkApi.getList(params)
    if (res.code === 'SUC0000') {
      orderList.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载盘点单列表失败:', error)
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

// 加载系统库存 SN
async function loadSystemSn(warehouseId) {
  if (!warehouseId) {
    systemSnList.value = []
    return
  }
  try {
    const res = await snApi.getByWarehouse(warehouseId)
    const list = Array.isArray(res) ? res : (res.body || res.data || [])
    systemSnList.value = list
      .filter(sn => sn.status === 'INSTOCK')
      .map(sn => ({
        snCode: sn.snCode,
        productId: sn.productId,
        productName: sn.productName,
        productCode: sn.productCode,
        status: sn.status,
        scanned: false
      }))
  } catch (error) {
    console.error('加载系统库存失败:', error)
    systemSnList.value = []
    ElMessage.warning('加载系统库存失败，请检查网络')
  }
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 重置
function handleReset() {
  searchForm.checkNo = ''
  searchForm.warehouseId = null
  searchForm.orderStatus = null
  handleSearch()
}

// 新增盘点
function handleCreate() {
  isEdit.value = false
  form.id = null
  form.warehouseId = null
  form.warehouseName = ''
  form.checkDate = new Date().toISOString().slice(0, 10)
  form.remark = ''
  form.orderStatus = 'DRAFT'
  systemSnList.value = []
  scannedSnList.value = []
  formVisible.value = true
  nextTick(() => {
    snInputRef.value?.focus()
  })
}

// 仓库选择变化
function handleWarehouseChange(warehouseId) {
  const warehouse = warehouseList.value.find(w => w.id === warehouseId)
  if (warehouse) {
    form.warehouseName = warehouse.warehouseName
  }
  systemSnList.value = []
  scannedSnList.value = []
  loadSystemSn(warehouseId)
  nextTick(() => {
    snInputRef.value?.focus()
  })
}

// 扫描 SN
function handleScanSn() {
  const sn = currentSn.value.trim()
  if (!sn) {
    ElMessage.warning('请输入 SN 码')
    return
  }

  // 检查是否已扫描
  if (scannedSnList.value.some(item => item.snCode === sn)) {
    ElMessage.warning('该 SN 码已扫描')
    currentSn.value = ''
    nextTick(() => snInputRef.value?.focus())
    return
  }

  // 检查是否在系统库存中
  const systemSn = systemSnList.value.find(item => item.snCode === sn)
  if (systemSn) {
    // 在系统库存中，标记为已盘点
    systemSn.scanned = true
    ElMessage.success(`SN ${sn} 盘点成功`)
  } else {
    // 不在系统库存中，可能是盘盈
    // 尝试从所有 SN 中查找商品信息
    scannedSnList.value.push({
      snCode: sn,
      productId: null,
      productName: '未知商品（需核对）',
      productCode: ''
    })
    ElMessage.warning(`SN ${sn} 不在系统库存中，标记为盘盈`)
  }

  currentSn.value = ''
  nextTick(() => snInputRef.value?.focus())
}

// 手动标记已盘点
function markChecked(row) {
  const sn = systemSnList.value.find(item => item.snCode === row.snCode)
  if (sn) {
    sn.scanned = true
    ElMessage.success(`已标记 ${row.snCode} 为已盘点`)
  }
}

// 移除扫描记录
function removeScanned(row) {
  // 如果是系统 SN，取消标记
  const systemSn = systemSnList.value.find(item => item.snCode === row.snCode)
  if (systemSn) {
    systemSn.scanned = false
  }
  // 如果是盘盈，从扫描列表移除
  scannedSnList.value = scannedSnList.value.filter(item => item.snCode !== row.snCode)
}

// 获取 SN 标签类型
function getSnTagType(row) {
  if (row.diffType === 'LOSS') return 'danger'
  if (row.diffType === 'PROFIT') return 'warning'
  return 'success'
}

// 生成盘点单数据
function buildCheckData(status) {
  const items = displaySnList.value.map(sn => ({
    snCode: sn.snCode,
    productId: sn.productId,
    productName: sn.productName,
    productCode: sn.productCode,
    diffType: sn.diffType
  }))

  return {
    id: form.id,
    warehouseId: form.warehouseId,
    warehouseName: form.warehouseName,
    orderDate: form.checkDate,
    remark: form.remark,
    status,
    totalBookQuantity: systemSnList.value.length,
    totalActualQuantity: checkedCount.value,
    totalProfitQuantity: profitCount.value - lossCount.value,
    items
  }
}

// 保存盘点（草稿/盘点中）
async function handleSave() {
  try {
    await formRef.value.validate()
    if (displaySnList.value.length === 0) {
      return ElMessage.warning('请先加载库存数据')
    }

    submitting.value = true
    const data = buildCheckData('CHECKING')

    const res = isEdit.value
      ? await checkApi.edit(data)
      : await checkApi.add(data)

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
  } finally {
    submitting.value = false
  }
}

// 完成盘点
async function handleCompleteCheck() {
  try {
    await formRef.value.validate()
    if (displaySnList.value.length === 0) {
      return ElMessage.warning('请先加载库存数据')
    }

    const loss = lossCount.value
    const profit = profitCount.value
    let confirmMsg = '确认完成盘点？'
    if (loss > 0 || profit > 0) {
      confirmMsg += `\n发现 ${loss} 台盘亏，${profit} 台盘盈。确认后将更新库存状态。`
    }

    await ElMessageBox.confirm(confirmMsg, '确认完成盘点', { type: 'warning' })

    submitting.value = true
    const data = buildCheckData('COMPLETED')

    const res = isEdit.value
      ? await checkApi.edit(data)
      : await checkApi.add(data)

    if (res.code === 'SUC0000') {
      // 更新盘亏 SN 的状态（可选，视后端支持情况）
      try {
        const lossItems = displaySnList.value.filter(sn => sn.diffType === 'LOSS')
        for (const item of lossItems) {
          await snApi.edit({ snCode: item.snCode, status: 'LOST' })
        }
        if (lossItems.length > 0) {
          ElMessage.success(`盘点完成，已标记 ${lossItems.length} 台盘亏`)
        } else {
          ElMessage.success('盘点完成')
        }
      } catch (e) {
        ElMessage.success('盘点完成')
      }
      formVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '保存失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('完成盘点失败:', error)
    }
  } finally {
    submitting.value = false
  }
}

// 继续盘点（加载已有数据）
async function handleContinue(row) {
  try {
    const res = await checkApi.getDetail(row.id)
    if (res.code !== 'SUC0000') {
      ElMessage.error('加载盘点单失败')
      return
    }

    const data = res.body || {}
    isEdit.value = true
    form.id = data.id
    form.warehouseId = data.warehouseId
    form.warehouseName = data.warehouseName || ''
    form.checkDate = data.checkDate || new Date().toISOString().slice(0, 10)
    form.remark = data.remark || ''
    form.orderStatus = data.orderStatus || 'CHECKING'

    // 加载系统库存
    await loadSystemSn(data.warehouseId)

    // 恢复已扫描的 SN
    scannedSnList.value = []
    const items = data.items || []
    items.forEach(item => {
      if (item.diffType === 'NONE') {
        const sysSn = systemSnList.value.find(s => s.snCode === item.snCode)
        if (sysSn) {
          sysSn.scanned = true
        }
      } else if (item.diffType === 'PROFIT') {
        scannedSnList.value.push({
          snCode: item.snCode,
          productId: item.productId,
          productName: item.productName,
          productCode: item.productCode
        })
      }
    })

    formVisible.value = true
    nextTick(() => {
      snInputRef.value?.focus()
    })
  } catch (error) {
    console.error('继续盘点失败:', error)
    ElMessage.error('加载盘点单失败')
  }
}

// 完成盘点（从列表操作）
async function handleComplete(row) {
  try {
    await ElMessageBox.confirm('确认完成该盘点单？', '提示', { type: 'warning' })
    const res = await checkApi.edit({ id: row.id, status: 'COMPLETED' })
    if (res.code === 'SUC0000') {
      ElMessage.success('盘点单已完成')
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '操作失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('完成盘点失败:', error)
    }
  }
}

// 查看详情
async function handleDetail(row) {
  try {
    const res = await checkApi.getDetail(row.id)
    if (res.code === 'SUC0000') {
      currentOrder.value = res.body || { items: [] }
      detailVisible.value = true
    }
  } catch (error) {
    console.error('加载详情失败:', error)
  }
}

// 删除
async function handleDelete(row) {
  try {
    await ElMessageBox.confirm('确认要删除该盘点单吗？', '提示', { type: 'warning' })
    const res = await checkApi.delete(row.id)
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
    CHECKING: 'primary',
    COMPLETED: 'success',
    CANCELLED: 'danger'
  }
  return map[status] || 'info'
}

// 状态文本
function getStatusText(status) {
  const map = {
    DRAFT: '草稿',
    CHECKING: '盘点中',
    COMPLETED: '已完成',
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

.check-area {
  margin-top: 15px;
}

.check-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.check-stats {
  display: flex;
  gap: 10px;
}

.scan-area {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.scan-tip {
  font-size: 13px;
}
</style>

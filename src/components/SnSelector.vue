/**
 * SN码选择器组件
 * 用于采购入库和销售出库时选择SN码
 */

<template>
  <el-dialog
    v-model="visible"
    title="选择SN码"
    width="900px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <!-- 搜索条件 -->
    <div class="search-bar">
      <el-input
        v-model="searchForm.sn"
        placeholder="输入SN码搜索"
        clearable
        style="width: 200px"
        @keyup.enter="handleSearch"
      />
      <el-select
        v-model="searchForm.productId"
        placeholder="选择货品"
        clearable
        style="width: 200px"
        @change="handleSearch"
      >
        <el-option
          v-for="item in productList"
          :key="item.id"
          :label="item.productName"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="searchForm.warehouseId"
        placeholder="选择仓库"
        clearable
        style="width: 200px"
        @change="handleSearch"
      >
        <el-option
          v-for="item in warehouseList"
          :key="item.id"
          :label="item.warehouseName"
          :value="item.id"
        />
      </el-select>
      <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button :icon="Refresh" @click="handleReset">重置</el-button>
    </div>

    <!-- 已选SN码提示 -->
    <div v-if="selectedSnList.length > 0" class="selected-tip">
      已选 {{ selectedSnList.length }} 台SN码
      <el-tag type="success" size="small">点击行可移除</el-tag>
    </div>

    <!-- SN码列表 -->
    <el-table
      ref="snTableRef"
      :data="snList"
      :loading="loading"
      height="400px"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column type="selection" width="55" :selectable="checkSelectable" />
      <el-table-column prop="sn" label="SN码" width="180" />
      <el-table-column prop="productName" label="货品名称" min-width="150" />
      <el-table-column prop="productCode" label="货品编码" width="120" />
      <el-table-column prop="warehouseName" label="所在仓库" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="stockInTime" label="入库时间" width="160">
        <template #default="{ row }">
          {{ row.stockInTime ? formatDate(row.stockInTime) : '-' }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="loadSnList"
        @current-change="loadSnList"
      />
    </div>

    <!-- 底部操作 -->
    <template #footer>
      <span class="dialog-footer">
        <span class="selected-count">已选: {{ selectedSnList.length }} 台</span>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定 ({{ selectedSnList.length }})</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'
import { getSnList } from '../api'
import { formatDate } from '../utils/format'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  // 预选的SN码ID列表
  preSelectedIds: {
    type: Array,
    default: () => []
  },
  // 模式: stockIn-入库可选, sale-销售可选
  mode: {
    type: String,
    default: 'stockIn',
    validator: (v) => ['stockIn', 'sale'].includes(v)
  },
  // 仓库ID限制
  warehouseId: {
    type: [Number, String],
    default: null
  },
  // 货品ID限制
  productId: {
    type: [Number, String],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

// 状态
const visible = ref(false)
const loading = ref(false)
const snTableRef = ref(null)
const snList = ref([])
const productList = ref([])
const warehouseList = ref([])

// 已选中的SN码列表
const selectedSnList = ref([])

// 搜索表单
const searchForm = reactive({
  sn: '',
  productId: null,
  warehouseId: null
})

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// 监听 visible
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    // 打开时加载数据
    loadProductList()
    loadWarehouseList()
    loadSnList()
    
    // 设置预选
    if (props.preSelectedIds.length > 0) {
      selectedSnList.value = [...props.preSelectedIds]
    }
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

// 加载SN码列表
async function loadSnList() {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      // 只查询可用状态的SN码
      status: props.mode === 'stockIn' ? 'PURCHASED' : 'INSTOCK'
    }
    
    if (searchForm.sn) params.sn = searchForm.sn
    if (searchForm.productId) params.productId = searchForm.productId
    if (searchForm.warehouseId) params.warehouseId = searchForm.warehouseId
    
    // 入库时可选已采购状态的，销售时可选已入库状态的
    if (props.warehouseId) params.warehouseId = props.warehouseId
    if (props.productId) params.productId = props.productId
    
    const res = await getSnList(params)
    
    if (res.code === 'SUC0000') {
      snList.value = res.body?.list || []
      pagination.total = res.body?.total || 0
      
      // 回显已选中的行
      setTimeout(() => {
        snList.value.forEach(row => {
          if (selectedSnList.value.includes(row.id)) {
            snTableRef.value?.toggleRowSelection(row, true)
          }
        })
      }, 100)
    }
  } catch (error) {
    console.error('加载SN码列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载货品列表
async function loadProductList() {
  // 实际项目中应该调用货品列表接口
  // 这里简化处理
  const res = await getSnList({ pageSize: 1000 })
  if (res.code === 'SUC0000') {
    const products = new Map()
    ;(res.body?.list || []).forEach(item => {
      if (item.productId && !products.has(item.productId)) {
        products.set(item.productId, {
          id: item.productId,
          productName: item.productName,
          productCode: item.productCode
        })
      }
    })
    productList.value = Array.from(products.values())
  }
}

// 加载仓库列表
async function loadWarehouseList() {
  const res = await getSnList({ pageSize: 1000 })
  if (res.code === 'SUC0000') {
    const warehouses = new Map()
    ;(res.body?.list || []).forEach(item => {
      if (item.warehouseId && !warehouses.has(item.warehouseId)) {
        warehouses.set(item.warehouseId, {
          id: item.warehouseId,
          warehouseName: item.warehouseName
        })
      }
    })
    warehouseList.value = Array.from(warehouses.values())
  }
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadSnList()
}

// 重置
function handleReset() {
  searchForm.sn = ''
  searchForm.productId = null
  searchForm.warehouseId = null
  handleSearch()
}

// 检查行是否可选
function checkSelectable(row) {
  // 销售模式下只能选择INSTOCK状态的
  if (props.mode === 'sale') {
    return row.status === 'INSTOCK'
  }
  return true
}

// 选择变化
function handleSelect(selection, row) {
  updateSelectedList()
}

// 全选变化
function handleSelectAll(selection) {
  updateSelectedList()
}

// 更新已选列表
function updateSelectedList() {
  const selection = snTableRef.value?.getSelectionRows() || []
  selectedSnList.value = selection.map(row => row.id)
}

// 关闭
function handleClose() {
  visible.value = false
}

// 确认
function handleConfirm() {
  if (selectedSnList.value.length === 0) {
    ElMessage.warning('请至少选择一台SN码')
    return
  }
  
  const selectedRows = snTableRef.value?.getSelectionRows() || []
  emit('confirm', {
    ids: selectedSnList.value,
    list: selectedRows
  })
  handleClose()
}

// 状态类型
function getStatusType(status) {
  const map = {
    PURCHASED: 'warning',
    INSTOCK: 'success',
    SOLD: 'info',
    RETURN: 'danger'
  }
  return map[status] || 'info'
}

// 状态文本
function getStatusText(status) {
  const map = {
    PURCHASED: '已采购',
    INSTOCK: '已入库',
    SOLD: '已销售',
    RETURN: '已退货',
    SCRAP: '已报废'
  }
  return map[status] || status
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.selected-tip {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background: #f0f9eb;
  border-radius: 4px;
  color: #67c23a;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.selected-count {
  color: #409eff;
  font-weight: bold;
  margin-right: 20px;
}
</style>

<template>
  <div class="page-container">
    <!-- 鎼滅储琛ㄥ崟 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="璋冩嫧鍗曞彿">
          <el-input v-model="searchForm.orderNo" placeholder="杈撳叆鍗曞彿" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="璋冨嚭浠撳簱">
          <el-select v-model="searchForm.fromWarehouseId" placeholder="閫夋嫨浠撳簱" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="璋冨叆浠撳簱">
          <el-select v-model="searchForm.toWarehouseId" placeholder="閫夋嫨浠撳簱" clearable style="width: 150px">
            <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">鎼滅储</el-button>
          <el-button :icon="Refresh" @click="handleReset">閲嶇疆</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 鎿嶄綔鎸夐挳 -->
    <div class="table-toolbar">
      <div class="toolbar-left">
        <el-button v-if="hasPermission('transfer:create')" type="primary" :icon="Plus" @click="handleCreate">鏂板璋冩嫧</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">鍏?{{ pagination.total }} 鏉¤褰?/el-tag>
      </div>
    </div>

    <!-- 鏁版嵁琛ㄦ牸 -->
    <el-table v-loading="loading" :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index" label="搴忓彿" width="60" align="center" />
      <el-table-column prop="orderNo" label="璋冩嫧鍗曞彿" width="200" />
      <el-table-column prop="fromWarehouseName" label="璋冨嚭浠撳簱" width="120" />
      <el-table-column prop="toWarehouseName" label="璋冨叆浠撳簱" width="120" />
      <el-table-column prop="transferDate" label="璋冩嫧鏃ユ湡" width="120" />
      <el-table-column prop="totalQuantity" label="璋冩嫧鏁伴噺" width="100" align="center" />
      <el-table-column prop="status" label="鐘舵€? width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="澶囨敞" min-width="150" show-overflow-tooltip />
      <el-table-column prop="creator" label="鍒涘缓浜? width="100" />
      <el-table-column prop="createTime" label="鍒涘缓鏃堕棿" width="160">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="鎿嶄綔" width="220" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">鏌ョ湅</el-button>
          <el-button v-if="row.status === 'DRAFT'" type="success" link @click="handleConfirm(row)">纭璋冩嫧</el-button>
          <el-button v-if="hasPermission('transfer:delete') && row.status === 'DRAFT'" type="danger" link @click="handleDelete(row)">鍒犻櫎</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 鍒嗛〉 -->
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

    <!-- 鏂板/缂栬緫寮圭獥 -->
    <el-dialog
      v-model="formVisible"
      :title="isEdit ? '缂栬緫璋冩嫧鍗? : '鏂板璋冩嫧鍗?"
      width="1000px"
      top="5vh"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="璋冨嚭浠撳簱" prop="fromWarehouseId">
              <el-select v-model="form.fromWarehouseId" placeholder="閫夋嫨浠撳簱" style="width: 100%" :disabled="isEdit" @change="handleFromWarehouseChange">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="璋冨叆浠撳簱" prop="toWarehouseId">
              <el-select v-model="form.toWarehouseId" placeholder="閫夋嫨浠撳簱" style="width: 100%" @change="handleToWarehouseChange">
                <el-option v-for="item in warehouseList.filter(w => w.id !== form.fromWarehouseId)" :key="item.id" :label="item.warehouseName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="璋冩嫧鏃ユ湡" prop="transferDate">
              <el-date-picker
                v-model="form.transferDate"
                type="date"
                placeholder="閫夋嫨鏃ユ湡"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="澶囨敞">
          <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="璇疯緭鍏ュ娉? />
        </el-form-item>
      </el-form>

      <!-- SN 閫夋嫨鍖哄煙 -->
      <el-card v-if="form.fromWarehouseId && !isEdit" class="sn-select-area" shadow="never">
        <template #header>
          <div class="sn-header">
            <span>閫夋嫨璋冩嫧鏈哄櫒锛圫N 鐮侊級</span>
            <el-tag type="info">宸查€夋嫨 {{ selectedSnList.length }} 鍙?/el-tag>
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
          <el-table-column prop="snCode" label="SN 鐮? width="180" />
          <el-table-column prop="productName" label="鍟嗗搧鍚嶇О" min-width="150" />
          <el-table-column prop="productCode" label="鍟嗗搧缂栫爜" width="120" />
          <el-table-column prop="purchaseDate" label="鍏ュ簱鏃ユ湡" width="120" />
          <el-table-column prop="warrantyMonths" label="淇濅慨鏈? width="100">
            <template #default="{ row }">
              {{ row.warrantyMonths }}涓湀
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 缂栬緫鏃舵樉绀哄凡閫?SN -->
      <el-card v-if="isEdit && form.items.length > 0" class="sn-select-area" shadow="never">
        <template #header>
          <div class="sn-header">
            <span>宸查€夎皟鎷ㄦ満鍣?/span>
            <el-tag type="info">鍏?{{ form.items.length }} 鍙?/el-tag>
          </div>
        </template>
        <el-table :data="form.items" border size="small">
          <el-table-column prop="snCode" label="SN 鐮? width="180" />
          <el-table-column prop="productName" label="鍟嗗搧鍚嶇О" min-width="150" />
          <el-table-column prop="productCode" label="鍟嗗搧缂栫爜" width="120" />
        </el-table>
      </el-card>

      <template #footer>
        <el-button @click="formVisible = false">鍙栨秷</el-button>
        <el-button type="primary" :disabled="!form.fromWarehouseId || !form.toWarehouseId" @click="handleSave">淇濆瓨</el-button>
      </template>
    </el-dialog>

    <!-- 璇︽儏寮圭獥 -->
    <el-dialog v-model="detailVisible" title="璋冩嫧鍗曡鎯? width="900px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="璋冩嫧鍗曞彿">{{ currentOrder.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="璋冩嫧鏃ユ湡">{{ currentOrder.transferDate }}</el-descriptions-item>
        <el-descriptions-item label="璋冨嚭浠撳簱">{{ currentOrder.fromWarehouseName }}</el-descriptions-item>
        <el-descriptions-item label="璋冨叆浠撳簱">{{ currentOrder.toWarehouseName }}</el-descriptions-item>
        <el-descriptions-item label="璋冩嫧鏁伴噺">{{ currentOrder.totalQuantity }} 鍙?/el-descriptions-item>
        <el-descriptions-item label="鐘舵€?>
          <el-tag :type="getStatusType(currentOrder.status)">{{ getStatusText(currentOrder.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="鍒涘缓浜?>{{ currentOrder.creator }}</el-descriptions-item>
        <el-descriptions-item label="鍒涘缓鏃堕棿">{{ formatDate(currentOrder.createTime) }}</el-descriptions-item>
        <el-descriptions-item label="澶囨敞" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>璋冩嫧鏄庣粏</el-divider>

      <el-table :data="currentOrder.items" border>
        <el-table-column type="index" label="搴忓彿" width="60" align="center" />
        <el-table-column prop="snCode" label="SN 鐮? width="180">
          <template #default="{ row }">
            <el-tag type="info">{{ row.snCode }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="鍟嗗搧鍚嶇О" min-width="150" />
        <el-table-column prop="productCode" label="鍟嗗搧缂栫爜" width="120" />
      </el-table>

      <template #footer>
        <el-button @click="detailVisible = false">鍏抽棴</el-button>
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

// 鍒楄〃鏁版嵁
const loading = ref(false)
const orderList = ref([])
const warehouseList = ref([])
const warehouseSnList = ref([])
const selectedSnList = ref([])

// 鎼滅储琛ㄥ崟
const searchForm = reactive({
  orderNo: '',
  fromWarehouseId: null,
  toWarehouseId: null
})

// 鍒嗛〉
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// 琛ㄥ崟寮圭獥
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
  fromWarehouseId: [{ required: true, message: '璇烽€夋嫨璋冨嚭浠撳簱', trigger: 'change' }],
  toWarehouseId: [{ required: true, message: '璇烽€夋嫨璋冨叆浠撳簱', trigger: 'change' }],
  transferDate: [{ required: true, message: '璇烽€夋嫨璋冩嫧鏃ユ湡', trigger: 'change' }]
}

// 璇︽儏寮圭獥
const detailVisible = ref(false)
const currentOrder = ref({})

// 鏉冮檺妫€鏌?function hasPermission(permission) {
  return appStore.hasPermission(permission)
}

// 鍔犺浇鏁版嵁
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
    console.error('鍔犺浇璋冩嫧鍗曞垪琛ㄥけ璐?', error)
  } finally {
    loading.value = false
  }
}

// 鍔犺浇鍩虹鏁版嵁
async function loadBaseData() {
  try {
    const res = await getWarehouseSimpleList()
    if (res.code === 'SUC0000') {
      warehouseList.value = res.body || []
    }
  } catch (error) {
    console.error('鍔犺浇浠撳簱鍒楄〃澶辫触:', error)
  }
}

// 鍔犺浇璋冨嚭浠撳簱鐨?SN 鍒楄〃
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
    console.error('鍔犺浇浠撳簱 SN 鍒楄〃澶辫触:', error)
    warehouseSnList.value = []
  }
}

// 鎼滅储
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 閲嶇疆
function handleReset() {
  searchForm.orderNo = ''
  searchForm.fromWarehouseId = null
  searchForm.toWarehouseId = null
  handleSearch()
}

// 鏂板
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

// 璋冨嚭浠撳簱鍙樺寲
function handleFromWarehouseChange(warehouseId) {
  const warehouse = warehouseList.value.find(w => w.id === warehouseId)
  if (warehouse) {
    form.fromWarehouseName = warehouse.warehouseName
  }
  // 娓呯┖宸查€?SN锛岄噸鏂板姞杞?  selectedSnList.value = []
  warehouseSnList.value = []
  if (snTableRef.value) {
    snTableRef.value.clearSelection()
  }
  loadWarehouseSn(warehouseId)
}

// 璋冨叆浠撳簱鍙樺寲
function handleToWarehouseChange(warehouseId) {
  const warehouse = warehouseList.value.find(w => w.id === warehouseId)
  if (warehouse) {
    form.toWarehouseName = warehouse.warehouseName
  }
}

// SN 閫夋嫨鍙樺寲
function handleSnSelectionChange(selection) {
  selectedSnList.value = selection
}

// 淇濆瓨璋冩嫧鍗?async function handleSave() {
  try {
    await formRef.value.validate()

    if (!isEdit.value && selectedSnList.value.length === 0) {
      return ElMessage.warning('璇疯嚦灏戦€夋嫨涓€鍙版満鍣ㄨ繘琛岃皟鎷?)
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
      ElMessage.success('淇濆瓨鎴愬姛')
      formVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '淇濆瓨澶辫触')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('淇濆瓨澶辫触:', error)
    }
  }
}

// 鏌ョ湅璇︽儏
async function handleDetail(row) {
  try {
    const res = await transferApi.getDetail(row.id)
    if (res.code === 'SUC0000') {
      currentOrder.value = res.body || {}
      detailVisible.value = true
    }
  } catch (error) {
    console.error('鍔犺浇璇︽儏澶辫触:', error)
  }
}

// 纭璋冩嫧锛堟墽琛?SN 浠撳簱鍙樻洿锛?async function handleConfirm(row) {
  try {
    await ElMessageBox.confirm(
      `纭鎵ц璋冩嫧锛焅n璋冨嚭浠撳簱锛?{row.fromWarehouseName}\n璋冨叆浠撳簱锛?{row.toWarehouseName}\n璋冩嫧鏁伴噺锛?{row.totalQuantity} 鍙癭,
      '纭璋冩嫧',
      { type: 'warning' }
    )

    loading.value = true

    // 1. 鑾峰彇璋冩嫧鍗曟槑缁?    let items = []
    try {
      const detailRes = await transferApi.getDetail(row.id)
      items = detailRes.body?.items || []
    } catch (e) {
      console.warn('鑾峰彇璋冩嫧鏄庣粏澶辫触:', e)
    }

    // 2. 先确认调拨单状态
    const res = await transferApi.edit({ id: row.id, status: 'CONFIRMED' })
    if (res.code !== 'SUC0000') {
      ElMessage.error(res.errorMsg || '确认失败')
      return
    }

    // 3. 更新每个 SN 的仓库归属（确认后才能更新）
    let updated = 0
    for (const item of items) {
      if (item.snCode) {
        try {
          const snRes = await snApi.getList({ sn_code: item.snCode, pageSize: 1 })
          const snRecord = snRes?.data?.list?.[0] || snRes?.list?.[0] || snRes?.[0]
          if (snRecord) {
            await snApi.edit({
              id: snRecord.id,
              warehouseId: row.toWarehouseId,
              warehouseName: row.toWarehouseName
            })
            updated++
          }
        } catch (e) {
          console.warn(`更新 SN ${item.snCode} 仓库失败:`, e)
        }
      }
    }

    ElMessage.success(`调拨确认成功，已更新 ${updated}/${items.length} 台机器的仓库归属`)
    loadData()
} catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('璋冩嫧纭澶辫触锛? + (error.message || error))
    }
  } finally {
    loading.value = false
  }
}

// 鍒犻櫎
async function handleDelete(row) {
  try {
    await ElMessageBox.confirm('纭瑕佸垹闄よ璋冩嫧鍗曞悧锛?, '鎻愮ず', { type: 'warning' })
    const res = await transferApi.delete(row.id)
    if (res.code === 'SUC0000') {
      ElMessage.success('鍒犻櫎鎴愬姛')
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '鍒犻櫎澶辫触')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('鍒犻櫎澶辫触:', error)
    }
  }
}

// 鐘舵€佺被鍨?function getStatusType(status) {
  const map = {
    DRAFT: 'info',
    CONFIRMED: 'success',
    CANCELLED: 'danger'
  }
  return map[status] || 'info'
}

// 鐘舵€佹枃鏈?function getStatusText(status) {
  const map = {
    DRAFT: '鑽夌',
    CONFIRMED: '宸茬‘璁?,
    CANCELLED: '宸插彇娑?
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

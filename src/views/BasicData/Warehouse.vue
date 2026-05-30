<template>
  <div class="page-container">
    <!-- ???? -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="????">
          <el-input v-model="searchForm.warehouseName" placeholder="??????" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">??</el-button>
          <el-button :icon="Refresh" @click="handleReset">??</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- ???? -->
    <div class="table-toolbar">
      <div class="toolbar-left">
        <el-button v-if="hasPermission('warehouse:create')" type="primary" :icon="Plus" @click="handleCreate">????</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">? {{ pagination.total }} ???</el-tag>
      </div>
    </div>

    <!-- ???? -->
    <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="??" width="60" align="center" />
      <el-table-column prop="warehouseCode" label="????" width="120" />
      <el-table-column prop="warehouseName" label="????" min-width="150" />
      <el-table-column prop="warehouseManager" label="???" width="100" />
      <el-table-column prop="warehouseAddress" label="??" min-width="200" show-overflow-tooltip />
      <el-table-column prop="remark" label="??" min-width="150" show-overflow-tooltip />
      <el-table-column label="??" width="150" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">??</el-button>
          <el-button v-if="hasPermission('warehouse:delete')" type="danger" link @click="handleDelete(row)">??</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- ?? -->
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

    <!-- ??/???? -->
    <el-dialog
      v-model="formVisible"
      :title="isEdit ? '????' : '????'"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="????" prop="warehouseCode">
          <el-input v-model="form.warehouseCode" placeholder="???????" />
        </el-form-item>
        <el-form-item label="????" prop="warehouseName">
          <el-input v-model="form.warehouseName" placeholder="???????" />
        </el-form-item>
        <el-form-item label="???" prop="warehouseManager">
          <el-input v-model="form.warehouseManager" placeholder="??????" />
        </el-form-item>
        <el-form-item label="??" prop="warehouseAddress">
          <el-input v-model="form.warehouseAddress" placeholder="???????" />
        </el-form-item>
        <el-form-item label="??">
          <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="?????" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formVisible = false">??</el-button>
        <el-button type="primary" @click="handleSubmit">??</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { warehouseApi } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// ????
const loading = ref(false)
const tableData = ref([])

// ????
const searchForm = reactive({
  warehouseName: ''
})

// ??
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0
})

// ????
const formVisible = ref(false)
const formRef = ref()
const isEdit = ref(false)
const form = reactive({
  id: null,
  warehouseCode: '',
  warehouseName: '',
  warehouseManager: '',
  warehouseAddress: '',
  remark: ''
})

const rules = {
  warehouseCode: [{ required: true, message: '???????', trigger: 'blur' }],
  warehouseName: [{ required: true, message: '???????', trigger: 'blur' }]
}

// ????
function hasPermission(permission) {
  return appStore.hasPermission(permission)
}

// ????
async function loadData() {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      isDelete: 0
    }
    if (searchForm.warehouseName) params.warehouseName = searchForm.warehouseName

    const res = await warehouseApi.list(params)
    if (res.code === 'SUC0000') {
      tableData.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('????????:', error)
  } finally {
    loading.value = false
  }
}

// ??
function handleSearch() {
  pagination.current = 1
  loadData()
}

// ??
function handleReset() {
  searchForm.warehouseName = ''
  handleSearch()
}

// ??
function handleCreate() {
  isEdit.value = false
  form.id = null
  form.warehouseCode = ''
  form.warehouseName = ''
  form.warehouseManager = ''
  form.warehouseAddress = ''
  form.remark = ''
  formVisible.value = true
}

// ??
function handleEdit(row) {
  isEdit.value = true
  Object.assign(form, {
    id: row.id,
    warehouseCode: row.warehouseCode || '',
    warehouseName: row.warehouseName || '',
    warehouseManager: row.warehouseManager || '',
    warehouseAddress: row.warehouseAddress || '',
    remark: row.remark || ''
  })
  formVisible.value = true
}

// ??
async function handleSubmit() {
  try {
    await formRef.value.validate()

    const data = {
      id: form.id,
      warehouseCode: form.warehouseCode,
      warehouseName: form.warehouseName,
      warehouseManager: form.warehouseManager,
      warehouseAddress: form.warehouseAddress,
      remark: form.remark
    }
    const res = isEdit.value
      ? await warehouseApi.update(data)
      : await warehouseApi.create(data)

    if (res.code === 'SUC0000') {
      ElMessage.success(isEdit.value ? '????' : '????')
      formVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '????')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('????:', error)
    }
  }
}

// ??
async function handleDelete(row) {
  try {
    await ElMessageBox.confirm(
      `????????${row.warehouseName}???`,
      '????',
      { type: 'warning' }
    )

    const res = await warehouseApi.delete(row.id)
    if (res.code === 'SUC0000') {
      ElMessage.success('????')
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '????')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('????:', error)
    }
  }
}

onMounted(() => {
  loadData()
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
</style>

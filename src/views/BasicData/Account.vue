<template>
  <div class="page-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="账户名称">
          <el-input v-model="searchForm.accountName" placeholder="输入账户名称" clearable style="width: 180px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item label="账户类型">
          <el-select v-model="searchForm.accountType" placeholder="选择类型" clearable style="width: 120px">
            <el-option label="现金" value="CASH" />
            <el-option label="银行" value="BANK" />
            <el-option label="微信" value="WECHAT" />
            <el-option label="支付宝" value="ALIPAY" />
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
        <el-button v-if="hasPermission('account:create')" type="primary" :icon="Plus" @click="handleCreate">新增账户</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="accountCode" label="账户编码" width="120" />
      <el-table-column prop="accountName" label="账户名称" min-width="150" />
      <el-table-column prop="accountType" label="类型" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ getAccountTypeText(row.accountType) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="accountNo" label="账号" width="180" />
      <el-table-column prop="bankName" label="开户行" width="150" />
      <el-table-column prop="balance" label="余额" width="130" align="right">
        <template #default="{ row }">
          <span class="balance">¥{{ formatMoney(row.balance || 0) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
          <el-button v-if="hasPermission('account:delete')" type="danger" link @click="handleDelete(row)">删除</el-button>
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
      :title="isEdit ? '编辑账户' : '新增账户'"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="账户编码" prop="accountCode">
          <el-input v-model="form.accountCode" placeholder="请输入账户编码" />
        </el-form-item>
        <el-form-item label="账户名称" prop="accountName">
          <el-input v-model="form.accountName" placeholder="请输入账户名称" />
        </el-form-item>
        <el-form-item label="账户类型" prop="accountType">
          <el-select v-model="form.accountType" placeholder="请选择类型" style="width: 100%" @change="handleTypeChange">
            <el-option label="现金" value="CASH" />
            <el-option label="银行" value="BANK" />
            <el-option label="微信" value="WECHAT" />
            <el-option label="支付宝" value="ALIPAY" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.accountNo" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item v-if="form.accountType === 'BANK'" label="开户行">
          <el-input v-model="form.bankName" placeholder="请输入开户行名称" />
        </el-form-item>
        <el-form-item label="期初余额">
          <el-input-number v-model="form.balance" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { formatMoney } from '@/utils/format'
import { accountApi } from '@/api'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 表格数据
const loading = ref(false)
const tableData = ref([])

// 搜索表单
const searchForm = reactive({
  accountName: '',
  accountType: null
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
const form = reactive({
  id: null,
  accountCode: '',
  accountName: '',
  accountType: 'CASH',
  accountNo: '',
  bankName: '',
  balance: 0,
  remark: ''
})

const rules = {
  accountCode: [{ required: true, message: '请输入账户编码', trigger: 'blur' }],
  accountName: [{ required: true, message: '请输入账户名称', trigger: 'blur' }],
  accountType: [{ required: true, message: '请选择账户类型', trigger: 'change' }]
}

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
      pageSize: pagination.pageSize,
      isDelete: 0
    }
    if (searchForm.accountName) params.account_name = searchForm.accountName
    if (searchForm.accountType) params.account_type = searchForm.accountType

    const res = await accountApi.list(params)
    if (res.code === 'SUC0000') {
      tableData.value = res.body?.list || []
      pagination.total = res.body?.total || 0
    }
  } catch (error) {
    console.error('加载账户列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 搜索
function handleSearch() {
  pagination.current = 1
  loadData()
}

// 重置
function handleReset() {
  searchForm.accountName = ''
  searchForm.accountType = null
  handleSearch()
}

// 类型变化
function handleTypeChange(type) {
  if (type !== 'BANK') {
    form.bankName = ''
  }
}

// 新增
function handleCreate() {
  isEdit.value = false
  form.id = null
  form.accountCode = ''
  form.accountName = ''
  form.accountType = 'CASH'
  form.accountNo = ''
  form.bankName = ''
  form.balance = 0
  form.remark = ''
  formVisible.value = true
}

// 编辑
function handleEdit(row) {
  isEdit.value = true
  Object.assign(form, row)
  formVisible.value = true
}

// 提交
async function handleSubmit() {
  try {
    await formRef.value.validate()
    
    const res = isEdit.value
      ? await accountApi.update(form)
      : await accountApi.create(form)
    
    if (res.code === 'SUC0000') {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      formVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.errorMsg || '操作失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('保存失败:', error)
    }
  }
}

// 删除
async function handleDelete(row) {
  try {
    await ElMessageBox.confirm(
      `确认要删除账户「${row.accountName}」吗？`,
      '删除确认',
      { type: 'warning' }
    )
    
    const res = await accountApi.delete(row.id)
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

// 账户类型文本
function getAccountTypeText(type) {
  const map = {
    CASH: '现金',
    BANK: '银行',
    WECHAT: '微信',
    ALIPAY: '支付宝'
  }
  return map[type] || type
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

.balance {
  color: #67c23a;
  font-weight: bold;
}
</style>

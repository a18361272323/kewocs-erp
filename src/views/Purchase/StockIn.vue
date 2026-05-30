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

    <div class="table-toolbar">
      <div class="toolbar-left">
        <el-button type="primary" :icon="Plus" @click="handleCreate">新增入库</el-button>
      </div>
      <div class="toolbar-right">
        <el-tag type="info">共 {{ pagination.total }} 条记录</el-tag>
      </div>
    </div>

    <el-table v-loading="loading" :data="orderList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="入库单号" width="180" fixed>
        <template #default="{ row }">{{ row.orderNo || '-' }}</template>
      </el-table-column>
      <el-table-column label="供应商" min-width="150">
        <template #default="{ row }">{{ row.supplierName || '-' }}</template>
      </el-table-column>
      <el-table-column label="入库仓库" width="120">
        <template #default="{ row }">{{ row.warehouseName || '-' }}</template>
      </el-table-column>
      <el-table-column label="入库日期" width="120">
        <template #default="{ row }">{{ row.orderDate || '-' }}</template>
      </el-table-column>
      <el-table-column label="数量" width="80" align="center">
        <template #default="{ row }">{{ row.totalQuantity || row.items?.length || '-' }}</template>
      </el-table-column>
      <el-table-column label="金额" width="120" align="right">
        <template #default="{ row }">&yen;{{ formatMoney(row.totalAmount) }}</template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template #default="{ row }">{{ formatDate(row.createTime) || '-' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">查看</el-button>
          <el-button v-if="row.status === 'CONFIRMED'" type="danger" link @click="handleCancel(row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

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

    <!-- ===== 新增入库弹窗 ===== -->
    <el-dialog
      v-model="formVisible"
      title="新增入库"
      width="1000px"
      top="3vh"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">

        <!-- 第一步：基本信息 -->
        <el-card shadow="never" class="form-card">
          <template #header><span class="card-header-title">基本信息</span></template>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="供应商" prop="supplierId">
                <el-select v-model="form.supplierId" placeholder="必选" style="width: 100%" filterable>
                  <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库仓库" prop="warehouseId">
                <el-select v-model="form.warehouseId" placeholder="必选" style="width: 100%" filterable>
                  <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库日期" prop="orderDate">
                <el-date-picker v-model="form.orderDate" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品" prop="productId">
                <el-select v-model="form.productId" placeholder="必选" style="width: 100%" filterable @change="onProductChange">
                  <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库单价">
                <el-input-number v-model="form.unitPrice" :min="0" :precision="2" controls-position="right" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="选填" />
          </el-form-item>
        </el-card>

        <!-- 第二步：SN码录入 -->
        <el-card shadow="never" class="form-card">
          <template #header>
            <span class="card-header-title">SN码录入</span>
            <el-tag v-if="form.productId && currentProduct" type="success" size="small" style="margin-left: 12px">
              当前商品: {{ currentProduct.productName }}
            </el-tag>
          </template>
          <div class="sn-input-area">
            <el-row :gutter="12" align="middle">
              <el-col :span="16">
                <el-input
                  ref="snInputRef"
                  v-model="snInput"
                  placeholder="扫描或输入SN码，回车添加"
                  clearable
                  @keyup.enter="handleAddSn"
                />
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="handleAddSn">添加入库</el-button>
                <el-button @click="snInput = ''">清空</el-button>
              </el-col>
            </el-row>
            <div class="sn-tip">
              <el-icon><InfoFilled /></el-icon>
              <span>先在上方选择供应商、仓库、商品和单价，再在此逐个录入SN码。回车或点击按钮添加，商品/规格/型号/单价自动关联。</span>
            </div>
          </div>
        </el-card>

        <!-- 第三步：入库明细预览 -->
        <el-card v-if="form.items.length > 0" shadow="never" class="form-card">
          <template #header>
            <span class="card-header-title">入库明细 ({{ form.items.length }} 台)</span>
          </template>
          <el-table :data="form.items" border stripe size="small" max-height="350">
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column prop="snCode" label="SN码" width="180">
              <template #default="{ row }"><el-tag size="small">{{ row.snCode }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="productName" label="商品" min-width="140" />
            <el-table-column prop="model" label="型号" width="100" />
            <el-table-column prop="specification" label="规格" width="100" />
            <el-table-column prop="unitPrice" label="单价" width="90" align="right">
              <template #default="{ row }">&yen;{{ formatMoney(row.unitPrice) }}</template>
            </el-table-column>
            <el-table-column label="操作" width="60" align="center" fixed="right">
              <template #default="scope">
                <el-button type="danger" link size="small" @click="form.items.splice(scope.$index, 1)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="summary-area">
            <span>合计数量: <strong>{{ form.items.length }}</strong> 台</span>
            <span>合计金额: <strong class="amount">&yen;{{ formatMoney(computedTotalAmount) }}</strong></span>
          </div>
        </el-card>
      </el-form>

      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="submitting"
          :disabled="!form.supplierId || !form.warehouseId || !form.productId || form.items.length === 0"
          @click="handleSubmit"
        >
          确认入库 ({{ form.items.length }} 台)
        </el-button>
      </template>
    </el-dialog>

    <!-- ===== 查看详情弹窗 ===== -->
    <el-dialog v-model="detailVisible" title="入库单详情" width="900px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="入库单号">{{ currentOrder.orderNo || '-' }}</el-descriptions-item>
        <el-descriptions-item label="入库日期">{{ currentOrder.orderDate || '-' }}</el-descriptions-item>
        <el-descriptions-item label="供应商">{{ currentOrder.supplierName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="入库仓库">{{ currentOrder.warehouseName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="数量">{{ currentOrder.totalQuantity || currentOrder.items?.length || '-' }} 台</el-descriptions-item>
        <el-descriptions-item label="金额">&yen;{{ formatMoney(currentOrder.totalAmount) }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentOrder.status)">{{ getStatusText(currentOrder.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(currentOrder.createTime) || '-' }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>入库明细</el-divider>
      <el-table :data="currentOrder.items || []" border max-height="300">
        <el-table-column type="index" label="#" width="60" align="center" />
        <el-table-column prop="snCode" label="SN码" width="180">
          <template #default="{ row }"><el-tag type="info" size="small">{{ row.snCode || '-' }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="productName" label="商品" min-width="150" />
        <el-table-column prop="model" label="型号" width="100" />
        <el-table-column prop="specification" label="规格" width="100" />
        <el-table-column prop="unitPrice" label="单价" width="100" align="right">
          <template #default="{ row }">&yen;{{ formatMoney(row.unitPrice) }}</template>
        </el-table-column>
      </el-table>

      <template #footer><el-button @click="detailVisible = false">关闭</el-button></template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, Plus, InfoFilled } from "@element-plus/icons-vue"
import { stockInApi, basicDataApi, snApi } from "@/api"
import { formatMoney, formatDate } from "@/utils/format"
import { useAppStore } from "@/stores/app"

const appStore = useAppStore()
const loading = ref(false)
const formVisible = ref(false)
const detailVisible = ref(false)
const submitting = ref(false)
const snInputRef = ref(null)
const snInput = ref("")
const formRef = ref(null)

const searchForm = reactive({ orderNo: "", supplierId: "", warehouseId: "", dateRange: [] })
const pagination = reactive({ current: 1, pageSize: 20, total: 0 })
const orderList = ref([])
const supplierList = ref([])
const warehouseList = ref([])
const productList = ref([])
const currentOrder = ref({})

const EMPTY_FORM = { supplierId: "", warehouseId: "", productId: "", orderDate: new Date().toISOString().slice(0, 10), unitPrice: 0, remark: "", items: [] }
const form = reactive({ ...EMPTY_FORM })

const rules = {
  supplierId: [{ required: true, message: "请选择供应商", trigger: "change" }],
  warehouseId: [{ required: true, message: "请选择仓库", trigger: "change" }],
  productId: [{ required: true, message: "请选择商品", trigger: "change" }],
  orderDate: [{ required: true, message: "请选择入库日期", trigger: "change" }]
}

const computedTotalAmount = computed(() => form.items.reduce((s, i) => s + (Number(i.unitPrice) || 0), 0))
const currentProduct = computed(() => productList.value.find(p => p.id === form.productId) || null)

const STATUS_MAP = { DRAFT: { text: "草稿", type: "info" }, CONFIRMED: { text: "已入库", type: "success" }, CANCELLED: { text: "已取消", type: "danger" } }
const getStatusType = (s) => STATUS_MAP[s]?.type || "info"
const getStatusText = (s) => STATUS_MAP[s]?.text || s

async function loadSelectData() {
  try {
    const [sup, wh, prod] = await Promise.all([
      basicDataApi.getSupplierList({ current: 1, pageSize: 9999 }),
      basicDataApi.getWarehouseList({ current: 1, pageSize: 9999 }),
      basicDataApi.getProductList({ current: 1, pageSize: 9999 })
    ])
    supplierList.value = sup?.data?.list || sup?.body?.list || []
    warehouseList.value = wh?.data?.list || wh?.body?.list || []
    productList.value  = prod?.data?.list || prod?.body?.list || []
  } catch (e) { console.error("加载下拉数据失败", e) }
}

async function loadData() {
  loading.value = true
  try {
    const p = { current: pagination.current, pageSize: pagination.pageSize }
    if (searchForm.orderNo)       p.order_no       = searchForm.orderNo
    if (searchForm.supplierId)    p.supplier_id    = searchForm.supplierId
    if (searchForm.warehouseId)   p.warehouse_id   = searchForm.warehouseId
    if (searchForm.dateRange?.length === 2) { p.order_date_start = searchForm.dateRange[0]; p.order_date_end = searchForm.dateRange[1] }
    const res = await stockInApi.getList(p)
    const raw = res?.data?.list || res?.body?.list || []
    orderList.value = raw.map(r => ({
      ...r,
      supplierName: r.supplierName || supplierList.value.find(s => s.id === r.supplierId)?.supplierName || "",
      warehouseName: r.warehouseName || warehouseList.value.find(w => w.id === r.warehouseId)?.warehouseName || "",
    }))
    pagination.total = res?.data?.total || res?.body?.total || 0
  } catch (e) { console.error("加载列表失败", e); ElMessage.error("加载入库单列表失败") }
  finally { loading.value = false }
}

function handleSearch() { pagination.current = 1; loadData() }
function handleReset() { Object.assign(searchForm, { orderNo: "", supplierId: "", warehouseId: "", dateRange: [] }); handleSearch() }

function handleCreate() {
  Object.assign(form, { ...EMPTY_FORM, orderDate: new Date().toISOString().slice(0, 10) })
  snInput.value = ""
  formVisible.value = true
  nextTick(() => snInputRef.value?.focus())
}

function onProductChange(pid) {
  const p = productList.value.find(x => x.id === pid)
  if (p) { form.unitPrice = p.purchasePrice || p.price || p.costPrice || 0 }
}

function handleAddSn() {
  const sn = snInput.value.trim()
  if (!sn) { ElMessage.warning("请先输入SN码"); return }
  if (!form.productId) { ElMessage.warning('请先在"基本信息"中选择商品'); return }
  if (form.items.some(item => item.snCode === sn)) { ElMessage.warning("该SN码已添加"); snInput.value = ""; nextTick(() => snInputRef.value?.focus()); return }
  const product = currentProduct.value
  form.items.push({
    snCode: sn, productId: product.id, productName: product.productName || "", productCode: product.productCode || "",
    model: product.model || "", specification: product.specification || "", unitPrice: form.unitPrice || 0
  })
  snInput.value = ""
  nextTick(() => snInputRef.value?.focus())
}

async function handleSubmit() {
  if (!form.supplierId || !form.warehouseId || !form.productId) { ElMessage.warning("请完善基本信息"); return }
  if (form.items.length === 0) { ElMessage.warning("请至少录入一个SN码"); return }
  try { await ElMessageBox.confirm("确认入库 " + form.items.length + " 台机器？", "确认入库", { type: "warning" }) } catch { return }

  submitting.value = true
  const supplierName = supplierList.value.find(s => s.id === form.supplierId)?.supplierName || ""
  const warehouseName = warehouseList.value.find(w => w.id === form.warehouseId)?.warehouseName || ""
  const today = form.orderDate.replace(/-/g, "")
  const seq = String(Math.floor(Math.random() * 9000) + 1000)
  const orderNo = "RK" + today + "-" + seq

  try {
    await stockInApi.add({
      orderNo, supplierId: form.supplierId, supplierName, warehouseId: form.warehouseId, warehouseName,
      orderDate: form.orderDate, totalQuantity: form.items.length, totalAmount: computedTotalAmount.value,
      status: "CONFIRMED", remark: form.remark
    })

    const snResults = await Promise.allSettled(form.items.map(item =>
      snApi.add({ snCode: item.snCode, status: "INSTOCK", warehouseId: form.warehouseId, warehouseName, productId: item.productId, productName: item.productName, productCode: item.productCode, model: item.model || "", specification: item.specification || "", purchasePrice: item.unitPrice, stockInTime: form.orderDate, sourceOrderNo: orderNo, sourceOrderType: "PURCHASE" })
    ))

    const failures = snResults.map((r, i) => r.status === "rejected" ? form.items[i].snCode : null).filter(Boolean)
    if (failures.length > 0) throw new Error("SN创建失败: " + failures.join(", "))

    ElMessage.success("入库成功")
    formVisible.value = false
    loadData()
  } catch (e) {
    if (e !== "cancel") { console.error("入库失败", e); ElMessage.error(typeof e === "string" ? e : (e.message || "入库失败")) }
  } finally { submitting.value = false }
}

async function handleDetail(row) {
  try { const res = await stockInApi.getDetail(row.id); currentOrder.value = res?.data || res?.body || row; detailVisible.value = true }
  catch (e) { ElMessage.error("获取详情失败") }
}

async function handleCancel(row) {
  try { await ElMessageBox.confirm("确认取消该入库单？", "取消入库", { type: "warning" }); await stockInApi.edit({ id: row.id, status: "CANCELLED" }); ElMessage.success("已取消"); loadData() }
  catch (e) { if (e !== "cancel") ElMessage.error("取消失败") }
}

onMounted(() => { loadSelectData(); loadData() })
</script>
<style scoped>
.page-container { padding: 16px; }
.search-card   { margin-bottom: 16px; }
.table-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.pagination    { display: flex; justify-content: flex-end; margin-top: 16px; }
.form-card     { margin-bottom: 14px; }
.card-header-title { font-weight: 600; font-size: 15px; }

.sn-input-area {
  padding: 12px 16px;
  background: #f0f5ff;
  border-radius: 6px;
  border: 1px dashed #b3d4ff;
}

.sn-tip {
  margin-top: 10px;
  font-size: 12px;
  color: #7c8db0;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.5;
}

.summary-area {
  margin-top: 14px;
  padding: 10px 16px;
  background: #f5f7fa;
  border-radius: 4px;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  font-size: 14px;
}

.summary-area .amount { font-size: 16px; color: #e74c3c; }

:deep(.el-dialog__body) { max-height: 72vh; overflow-y: auto; padding-top: 12px; }
</style>

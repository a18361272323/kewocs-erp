<template>
  <div class="scan-stock-in">
    <el-card class="header-card">
      <el-form :model="form" inline>
        <el-form-item label="入库单号">
          <el-input v-model="form.billNo" placeholder="自动生成" disabled />
        </el-form-item>
        <el-form-item label="入库日期" required>
          <el-date-picker v-model="form.inDate" type="date" placeholder="选择日期" style="width: 150px" />
        </el-form-item>
        <el-form-item label="供应商" required>
          <el-select v-model="form.supplierId" placeholder="请选择供应商" filterable style="width: 180px">
            <el-option v-for="s in supplierList" :key="s.id" :label="s.name" :value="s.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库" required>
          <el-select v-model="form.warehouseId" placeholder="请选择仓库" filterable style="width: 150px">
            <el-option v-for="w in warehouseList" :key="w.id" :label="w.name" :value="w.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="备注信息" style="width: 150px" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="scan-card">
      <div class="scan-section">
        <el-input
          ref="snInputRef"
          v-model="scanSn"
          placeholder="扫描或输入SN码后按回车"
          size="large"
          @keyup.enter="handleScanSn"
          style="width: 300px"
        >
          <template #prefix><i class="el-icon-camera"></i></template>
        </el-input>
        <el-button type="primary" size="large" @click="handleScanSn" :loading="scanning">确认录入</el-button>
      </div>

      <!-- 已扫描列表 -->
      <el-table :data="scannedList" border style="margin-top: 20px" max-height="400">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="snCode" label="SN码" min-width="180" />
        <el-table-column prop="productName" label="商品名称" min-width="150" />
        <el-table-column prop="productModel" label="型号" min-width="120" />
        <el-table-column prop="warehouseName" label="仓库" width="120" />
        <el-table-column prop="inTime" label="入库时间" width="160" />
        <el-table-column label="操作" width="80" fixed="right">
          <template #default="{ $index }">
            <el-button type="danger" size="small" @click="removeItem($index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="summary">
        <span>共 {{ scannedList.length }} 台</span>
        <el-button type="success" size="large" @click="submitStockIn" :disabled="scannedList.length === 0" :loading="submitting">
          提交入库
        </el-button>
      </div>
    </el-card>

    <!-- SN码信息弹窗 -->
    <el-dialog v-model="showSnInfo" title="SN码信息" width="500px">
      <el-descriptions :column="2" border v-if="snInfo">
        <el-descriptions-item label="SN码">{{ snInfo.snCode }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="snInfo.snStatus === 'INSTOCK' ? 'success' : 'warning'">
            {{ snInfo.snStatus === 'INSTOCK' ? '在库' : '未入库' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品名称">{{ snInfo.productName }}</el-descriptions-item>
        <el-descriptions-item label="商品型号">{{ snInfo.productModel }}</el-descriptions-item>
        <el-descriptions-item label="商品规格">{{ snInfo.productSpec }}</el-descriptions-item>
        <el-descriptions-item label="单位">{{ snInfo.productUnit }}</el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 20px; color: #666;">
        <p v-if="snInfo && snInfo.snStatus === 'INSTOCK'">
          <i class="el-icon-warning"></i> 该SN码已在库，是否重新入库？
        </p>
      </div>
      <template #footer>
        <el-button @click="showSnInfo = false">取消</el-button>
        <el-button type="primary" @click="confirmAddSn" :disabled="!form.warehouseId">确认入库</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { getSupplierSimpleList, getWarehouseSimpleList, snApi } from '@/api'

const snInputRef = ref(null)
const scanSn = ref('')
const scanning = ref(false)
const submitting = ref(false)
const showSnInfo = ref(false)
const snInfo = ref(null)
const currentSnIndex = ref(-1)

const form = reactive({
  billNo: '',
  inDate: new Date(),
  supplierId: '',
  warehouseId: '',
  remark: ''
})

const supplierList = ref([])
const warehouseList = ref([])
const scannedList = ref([])

onMounted(async () => {
  await loadBasicData()
  nextTick(() => {
    snInputRef.value?.focus()
  })
})

async function loadBasicData() {
  try {
    const [supplierRes, warehouseRes] = await Promise.all([
      getSupplierSimpleList(),
      getWarehouseSimpleList()
    ])
    if (supplierRes?.code === 200 || supplierRes?.code === 0) {
      supplierList.value = supplierRes.body?.list || []
    }
    if (warehouseRes?.code === 200 || warehouseRes?.code === 0) {
      warehouseList.value = warehouseRes.body?.list || []
    }
  } catch (e) {
    console.error('加载基础数据失败', e)
  }
}

async function handleScanSn() {
  const sn = scanSn.value.trim()
  if (!sn) {
    ElMessage.warning('请输入SN码')
    return
  }

  scanning.value = true
  try {
    const res = await snApi.getList({ sn_code: sn, current: 1, pageSize: 10 })
    if (res?.code === 200 || res?.code === 0) {
      const list = res.body?.list || []
      if (list.length > 0) {
        // SN码已存在
        snInfo.value = list[0]
      } else {
        // SN码不存在，创建新记录
        snInfo.value = {
          snCode: sn,
          snStatus: 'NOT_IN',
          productName: '',
          productModel: '',
          productSpec: '',
          productUnit: '台'
        }
      }
      currentSnIndex.value = -1
      showSnInfo.value = true
    } else {
      ElMessage.error(res?.message || '查询SN码失败')
    }
  } catch (e) {
    console.error('查询SN码失败', e)
    ElMessage.error('查询SN码失败')
  } finally {
    scanning.value = false
  }
}

function confirmAddSn() {
  if (!snInfo.value) return

  if (!form.warehouseId) {
    ElMessage.warning('请先选择仓库')
    return
  }

  const warehouse = warehouseList.value.find(w => w.id === form.warehouseId)
  
  // 检查是否已添加过
  if (scannedList.value.some(item => item.snCode === snInfo.value.snCode)) {
    ElMessage.warning('该SN码已添加')
    showSnInfo.value = false
    scanSn.value = ''
    snInputRef.value?.focus()
    return
  }

  const item = {
    snCode: snInfo.value.snCode,
    productName: snInfo.value.productName || '',
    productModel: snInfo.value.productModel || '',
    productSpec: snInfo.value.productSpec || '',
    productUnit: snInfo.value.productUnit || '台',
    warehouseId: form.warehouseId,
    warehouseName: warehouse?.name || '',
    inTime: new Date().toLocaleString(),
    status: snInfo.value.snStatus === 'INSTOCK' ? 'REPEAT' : 'NEW'
  }

  scannedList.value.push(item)
  showSnInfo.value = false
  scanSn.value = ''
  snInputRef.value?.focus()
}

function removeItem(index) {
  scannedList.value.splice(index, 1)
}

async function submitStockIn() {
  if (scannedList.value.length === 0) {
    ElMessage.warning('请先录入SN码')
    return
  }
  if (!form.supplierId) {
    ElMessage.warning('请选择供应商')
    return
  }
  if (!form.warehouseId) {
    ElMessage.warning('请选择仓库')
    return
  }

  submitting.value = true
  try {
    let successCount = 0
    let failCount = 0

    for (const item of scannedList.value) {
      try {
        // 调用SN码入库接口
        await snApi.edit({
          snCode: item.snCode,
          status: 'INSTOCK',
          warehouseId: form.warehouseId,
          stockInTime: form.inDate ? new Date(form.inDate).toISOString() : undefined,
          remark: form.remark || ''
        })
        successCount++
      } catch (e) {
        console.error(`SN码 ${item.snCode} 入库失败`, e)
        failCount++
      }
    }

    if (successCount > 0) {
      ElMessage.success(`成功入库 ${successCount} 台${failCount > 0 ? `，失败 ${failCount} 台` : ''}`)
      scannedList.value = []
      form.remark = ''
    } else {
      ElMessage.error('入库失败')
    }
  } catch (e) {
    console.error('提交入库失败', e)
    ElMessage.error('提交入库失败')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.scan-stock-in {
  padding: 20px;
}
.header-card {
  margin-bottom: 20px;
}
.scan-card {
  min-height: 500px;
}
.scan-section {
  display: flex;
  gap: 15px;
  align-items: center;
}
.summary {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
}
.summary span {
  font-size: 16px;
  font-weight: bold;
  color: #409eff;
}
</style>

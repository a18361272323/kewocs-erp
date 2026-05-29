<template>
  <el-dialog
    :model-value="visible"
    title="销售SN码出库"
    width="900px"
    :close-on-click-modal="false"
    @update:model-value="$emit('update:visible', $event)"
  >
    <el-alert
      title="提示"
      type="info"
      :closable="false"
      style="margin-bottom: 15px"
    >
      请为每个需要SN码的货品选择出库的SN码序列号
    </el-alert>

    <!-- 货品SN码录入 -->
    <div v-for="(item, index) in snItems" :key="index" class="sn-item">
      <div class="sn-item-header">
        <span class="product-name">{{ item.productName }}</span>
        <span class="product-code">{{ item.productCode }}</span>
        <span class="quantity-info">需要出库: {{ item.quantity }} 台</span>
        <span class="sn-count">已选: {{ item.selectedSns.length }} 个</span>
      </div>

      <div class="sn-selector">
        <div class="available-sn">
          <div class="sn-label">可选SN码库 (点击添加)</div>
          <div class="sn-list">
            <el-tag
              v-for="sn in item.availableSns"
              :key="sn.id"
              class="sn-tag"
              type="info"
              @click="handleAddSn(item, sn)"
            >
              {{ sn.sn }}
            </el-tag>
            <span v-if="item.availableSns.length === 0" class="no-sn">无可用SN码</span>
          </div>
        </div>

        <div class="selected-sn">
          <div class="sn-label">已选SN码 (点击移除)</div>
          <div class="sn-list">
            <el-tag
              v-for="sn in item.selectedSns"
              :key="sn.id"
              class="sn-tag"
              type="success"
              closable
              @close="handleRemoveSn(item, sn)"
            >
              {{ sn.sn }}
            </el-tag>
            <span v-if="item.selectedSns.length === 0" class="no-sn">请选择SN码</span>
          </div>
        </div>
      </div>

      <el-progress
        :percentage="Math.round((item.selectedSns.length / item.quantity) * 100)"
        :status="item.selectedSns.length === item.quantity ? 'success' : item.selectedSns.length > 0 ? 'warning' : 'exception'"
      />
    </div>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :disabled="!canSubmit" @click="handleSubmit">确认出库</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getStockSnList, getAvailableSnByProduct, doSaleSnOut } from '../api'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  orderId: {
    type: [String, Number],
    required: true
  },
  items: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:visible', 'success'])

// SN码明细
const snItems = ref([])

// 加载SN码数据
async function loadSnData() {
  snItems.value = []
  
  for (const item of props.items) {
    const snItem = reactive({
      productId: item.productId,
      productName: item.productName,
      productCode: item.productCode,
      quantity: item.quantity - (item.pickedQuantity || 0), // 需要出库数量
      pickedQuantity: item.pickedQuantity || 0,
      availableSns: [],
      selectedSns: []
    })
    
    // 加载可选SN码
    try {
      const res = await getAvailableSnByProduct({
        productId: item.productId,
        warehouseId: props.warehouseId
      })
      if (res.code === 'SUC0000') {
        snItem.availableSns = res.body || []
      }
    } catch (error) {
      console.error('加载SN码失败:', error)
    }
    
    snItems.value.push(snItem)
  }
}

// 添加SN码
function handleAddSn(item, sn) {
  if (item.selectedSns.length >= item.quantity) {
    ElMessage.warning(`该货品只需出库 ${item.quantity} 台，已选满`)
    return
  }
  
  const index = item.availableSns.findIndex(s => s.id === sn.id)
  if (index > -1) {
    item.availableSns.splice(index, 1)
    item.selectedSns.push(sn)
  }
}

// 移除SN码
function handleRemoveSn(item, sn) {
  const index = item.selectedSns.findIndex(s => s.id === sn.id)
  if (index > -1) {
    item.selectedSns.splice(index, 1)
    item.availableSns.push(sn)
  }
}

// 是否可以提交
const canSubmit = computed(() => {
  return snItems.value.every(item => {
    // 检查是否所有需要SN码的货品都已选满
    const product = props.items.find(p => p.productId === item.productId)
    if (product && product.hasSn) {
      return item.selectedSns.length === item.quantity
    }
    return true
  })
})

// 关闭
function handleClose() {
  emit('update:visible', false)
}

// 提交
async function handleSubmit() {
  try {
    const snData = []
    
    for (const item of snItems.value) {
      if (item.selectedSns.length > 0) {
        snData.push({
          productId: item.productId,
          snIds: item.selectedSns.map(sn => sn.id)
        })
      }
    }
    
    const res = await doSaleSnOut({
      saleOrderId: props.orderId,
      snJson: JSON.stringify(snData)
    })
    
    if (res.code === 'SUC0000') {
      ElMessage.success('SN码出库成功')
      emit('success')
    } else {
      ElMessage.error(res.errorMsg || '出库失败')
    }
  } catch (error) {
    console.error('SN码出库失败:', error)
  }
}

// 监听visible变化
watch(() => props.visible, (val) => {
  if (val) {
    loadSnData()
  }
}, { immediate: true })
</script>

<style scoped>
.sn-item {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
}

.sn-item-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.product-name {
  font-weight: bold;
  font-size: 14px;
}

.product-code {
  color: #909399;
  font-size: 12px;
}

.quantity-info {
  color: #409eff;
  font-size: 13px;
}

.sn-count {
  color: #67c23a;
  font-size: 13px;
}

.sn-selector {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.available-sn,
.selected-sn {
  flex: 1;
  background: white;
  padding: 10px;
  border-radius: 4px;
}

.sn-label {
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
}

.sn-list {
  min-height: 60px;
  max-height: 150px;
  overflow-y: auto;
}

.sn-tag {
  margin: 3px;
  cursor: pointer;
}

.no-sn {
  color: #c0c4cc;
  font-size: 12px;
}
</style>

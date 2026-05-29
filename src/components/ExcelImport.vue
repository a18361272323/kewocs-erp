<template>
  <div class="excel-import">
    <el-button type="primary" @click="triggerUpload" :loading="importing">
      <el-icon v-if="!importing"><Upload /></el-icon>
      {{ buttonText }}
    </el-button>
    <input
      ref="fileInput"
      type="file"
      accept=".xlsx,.xls"
      style="display: none"
      @change="handleFileChange"
    />
    
    <!-- 预览对话框 -->
    <el-dialog
      v-model="previewVisible"
      title="导入预览"
      width="800px"
      :close-on-click-modal="false"
    >
      <div class="preview-tip">共 {{ previewData.length }} 条数据，请确认：</div>
      <el-table :data="previewData" max-height="400" border size="small">
        <el-table-column
          v-for="col in previewColumns"
          :key="col"
          :prop="col"
          :label="col"
          min-width="120"
        />
      </el-table>
      <div v-if="previewErrors.length > 0" class="preview-errors">
        <div class="error-title">数据验证错误：</div>
        <div v-for="(err, idx) in previewErrors" :key="idx" class="error-item">
          第 {{ err.row }} 行：{{ err.message }}
        </div>
      </div>
      <template #footer>
        <el-button @click="previewVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmImport" :loading="importing">
          确认导入
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Upload } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'

const props = defineProps({
  buttonText: {
    type: String,
    default: '导入Excel'
  },
  columns: {
    type: Array,
    required: true  // 期望的列名，如 ['sn_code', 'product_name']
  },
  requiredColumns: {
    type: Array,
    default: () => []  // 必填列
  }
})

const emit = defineEmits(['success', 'error'])

const fileInput = ref(null)
const importing = ref(false)
const previewVisible = ref(false)
const previewData = ref([])
const previewColumns = ref([])
const previewErrors = ref([])
const currentFileData = ref(null)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
      
      if (jsonData.length < 2) {
        ElMessage.error('Excel 文件内容为空或格式不正确')
        return
      }
      
      // 第一行作为表头
      const headers = jsonData[0].map(h => String(h).trim())
      previewColumns.value = headers
      
      // 转换数据
      const rows = []
      for (let i = 1; i < jsonData.length; i++) {
        const row = {}
        headers.forEach((header, idx) => {
          row[header] = jsonData[i][idx]
        })
        rows.push(row)
      }
      
      // 验证数据
      previewErrors.value = validateData(rows)
      previewData.value = rows.slice(0, 100)  // 最多预览100条
      currentFileData.value = rows
      previewVisible.value = true
      
      ElMessage.success(`已读取 ${rows.length} 条数据`)
    } catch (error) {
      console.error('解析Excel失败:', error)
      ElMessage.error('解析Excel文件失败，请检查文件格式')
    }
  }
  reader.readAsArrayBuffer(file)
  
  // 清空input，允许重复选择同一文件
  event.target.value = ''
}

const validateData = (data) => {
  const errors = []
  
  data.forEach((row, idx) => {
    // 检查必填列
    props.requiredColumns.forEach(col => {
      if (!row[col] || String(row[col]).trim() === '') {
        errors.push({
          row: idx + 2,  // Excel行号从1开始，1是表头
          message: `缺少必填字段：${col}`
        })
      }
    })
  })
  
  return errors
}

const confirmImport = () => {
  if (previewErrors.value.length > 0) {
    ElMessage.warning('存在数据验证错误，请修正后重新导入')
    return
  }
  
  emit('success', currentFileData.value)
  previewVisible.value = false
  importing.value = false
}

// 重置状态
const reset = () => {
  previewData.value = []
  previewColumns.value = []
  previewErrors.value = []
  currentFileData.value = null
}

defineExpose({ reset })
</script>

<style scoped>
.preview-tip {
  margin-bottom: 12px;
  color: #606266;
}

.preview-errors {
  margin-top: 16px;
  padding: 12px;
  background: #fef0f0;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.error-title {
  color: #f56c6c;
  font-weight: bold;
  margin-bottom: 8px;
}

.error-item {
  color: #f56c6c;
  font-size: 12px;
  margin-bottom: 4px;
}
</style>

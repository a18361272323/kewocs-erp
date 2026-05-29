<template>
  <el-dialog
    :model-value="visible"
    title="收款"
    width="500px"
    :close-on-click-modal="false"
    @update:model-value="$emit('update:visible', $event)"
  >
    <el-descriptions :column="2" border size="small">
      <el-descriptions-item label="单号">{{ order.orderNo }}</el-descriptions-item>
      <el-descriptions-item label="客户">{{ order.customerName }}</el-descriptions-item>
      <el-descriptions-item label="销售金额">¥{{ formatMoney(order.totalAmount) }}</el-descriptions-item>
      <el-descriptions-item label="已收款">¥{{ formatMoney(order.receivedAmount) }}</el-descriptions-item>
      <el-descriptions-item label="待收款">
        <span class="amount-pending">¥{{ formatMoney(order.totalAmount - order.receivedAmount) }}</span>
      </el-descriptions-item>
    </el-descriptions>

    <el-divider />

    <el-alert
      type="info"
      :closable="false"
      show-icon
      style="margin-bottom: 16px"
    >
      <template #title>
        <div style="font-size: 13px">
          <strong>说明：</strong>此处为收款登记（供财务参考）。正式回款请在<b>账款管理</b>中操作，回款状态将通过连接器自动同步。
        </div>
      </template>
    </el-alert>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="收款金额" prop="amount">
        <el-input-number
          v-model="form.amount"
          :min="0.01"
          :max="order.totalAmount - order.receivedAmount"
          :precision="2"
          :controls="false"
          style="width: 100%"
          placeholder="请输入收款金额"
        />
      </el-form-item>
      <el-form-item label="收款账户" prop="accountId">
        <el-select v-model="form.accountId" placeholder="选择收款账户" style="width: 100%">
          <el-option v-for="item in accountList" :key="item.id" :label="item.accountName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="收款日期" prop="collectionDate">
        <el-date-picker
          v-model="form.collectionDate"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="收款方式" prop="paymentMethod">
        <el-select v-model="form.paymentMethod" placeholder="选择收款方式" style="width: 100%">
          <el-option label="现金" value="CASH" />
          <el-option label="银行转账" value="BANK_TRANSFER" />
          <el-option label="微信" value="WECHAT" />
          <el-option label="支付宝" value="ALIPAY" />
          <el-option label="POS机" value="POS" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入备注" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button @click="handleSubmit">确认收款</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { formatMoney } from '../utils/format'
import { createCollection, getAccountSimpleList } from '../api'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  order: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:visible', 'success'])

// 表单
const formRef = ref()
const form = reactive({
  amount: 0,
  accountId: null,
  collectionDate: '',
  paymentMethod: 'BANK_TRANSFER',
  remark: ''
})

const rules = {
  amount: [{ required: true, message: '请输入收款金额', trigger: 'blur' }],
  accountId: [{ required: true, message: '请选择收款账户', trigger: 'change' }],
  collectionDate: [{ required: true, message: '请选择收款日期', trigger: 'change' }],
  paymentMethod: [{ required: true, message: '请选择收款方式', trigger: 'change' }]
}

// 账户列表
const accountList = ref([])

// 加载账户列表
async function loadAccountList() {
  try {
    const res = await getAccountSimpleList()
    if (res.code === 'SUC0000') {
      accountList.value = res.body || []
      // 默认选中第一个
      if (accountList.value.length > 0 && !form.accountId) {
        form.accountId = accountList.value[0].id
      }
    }
  } catch (error) {
    console.error('加载账户列表失败:', error)
  }
}

// 关闭
function handleClose() {
  emit('update:visible', false)
}

// 提交
async function handleSubmit() {
  try {
    await formRef.value.validate()
    
    const data = {
      saleOrderId: props.order.id,
      collectionAmount: form.amount,
      accountId: form.accountId,
      collectionDate: form.collectionDate,
      paymentMethod: form.paymentMethod,
      remark: form.remark
    }
    
    const res = await createCollection(data)
    if (res.code === 'SUC0000') {
      ElMessage.success('收款成功')
      emit('success')
    } else {
      ElMessage.error(res.errorMsg || '收款失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('收款失败:', error)
    }
  }
}

// 监听visible变化
watch(() => props.visible, (val) => {
  if (val) {
    // 重置表单
    form.amount = props.order.totalAmount - props.order.receivedAmount // 默认填待收款金额
    form.collectionDate = new Date().toISOString().split('T')[0]
    form.paymentMethod = 'BANK_TRANSFER'
    form.remark = ''
    loadAccountList()
  }
}, { immediate: true })
</script>

<style scoped>
.amount-pending {
  color: #f56c6c;
  font-weight: bold;
}
</style>

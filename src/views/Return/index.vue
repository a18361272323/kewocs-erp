<template>
  <div class="return-page">
    <!-- Tab切换 -->
    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="采购退货" name="purchase">
        <PurchaseReturn />
      </el-tab-pane>
      <el-tab-pane label="销售退货" name="sale">
        <SaleReturn />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PurchaseReturn from './PurchaseReturn.vue'
import SaleReturn from './SaleReturn.vue'

const activeTab = ref('purchase')

const handleTabChange = (tab) => {
  // Tab切换时刷新数据
}
</script>

<style scoped>
.return-page {
  padding: 16px;
}
</style>

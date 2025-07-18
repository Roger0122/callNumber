<template>
  <div class="flex h-screen w-screen p-4 bg-gray-100">
    <!-- 左側：叫號清單區 -->
    <div class="flex-1 pr-4 flex flex-col min-w-0">
        <TitleBox
          icon="./Served.png"
          title="請取餐"
          subtitle="Served"
          bgColor="bg-lime-600"
        />

        <OrderNumberGrid
        :list="servedList"
        :columns="3"
        :isDeletable="isDeleting"
        :selected="selectedOrder"
        @select="onSelect"
        />
    </div>

    <!-- 右側：操作按鈕 -->
    <div class=" flex flex-col justify-start gap-6">
      <button 
        :class="[
        'text-white text-3xl py-3 rounded shadow font-medium',
        isDeleting ? 'bg-red-600' : 'bg-green-600'
      ]"
        @click="toggleDeleteMode"
      >
      銷單
      </button>

      <button 
      class="bg-amber-500 text-white text-3xl py-3 rounded shadow font-medium"
      >
      今日紀錄
      </button>
      <button 
      class="bg-indigo-600 text-white text-3xl py-3 rounded shadow font-medium"
      @click = "SystemSettingMode"
      >
      設定
      </button>
    </div>
  </div>

  <ConfirmModal
    :isOpen="showConfirmModal"
    :message="`確定要銷單：${selectedOrder}`"
    @confirm="confirmCancelOrder"
    @cancel="toggleDeleteMode"
    @update:isOpen="showConfirmModal = $event"
  />

  <SystemSettings 
  :isOpen ="showSystemSettingModal"
  @confirm="confirmSystemSetting"
  @cancel="SystemSettingCancelMode"

  />

</template>

<script setup>
import { ref } from 'vue'
import TitleBox from '../components/TitleBox.vue'
import OrderNumberGrid from '../components/OrderNumberGrid.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import SystemSettings from '../components/SystemSettings.vue'
import { toastSimple } from '../composables/toastSimple.js'

const isDeleting = ref(false)
const selectedOrder = ref(null)
const showConfirmModal = ref(false)
const showSystemSettingModal = ref(false)


// 模擬號碼
const servedList = ref([
  'A008', '#4140', '2005',
  '2001', '2002', 'c2a04',
  '2003', 'cd638', '#4142',
  'cd639', '2004', '3005',
  '#4136', '#4137', 'W012',
  'K806', 'W006', 'K808'
])

function toggleDeleteMode() {
  isDeleting.value = !isDeleting.value
  selectedOrder.value = null
}

function SystemSettingCancelMode() {
  SystemSettingMode()
}

function SystemSettingMode() {
  showSystemSettingModal.value = !showSystemSettingModal.value
}

function onSelect(orderNo) {
  selectedOrder.value = orderNo
  showConfirmModal.value = true
}

function confirmCancelOrder() {
  servedList.value = servedList.value.filter(item => item !== selectedOrder.value)
  toastSimple('success', `銷單成功！`)
  selectedOrder.value = null

}

function confirmSystemSetting() {
  
  toastSimple('success', `設定成功！`)
  SystemSettingMode()
}



</script>

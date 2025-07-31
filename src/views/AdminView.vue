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
        :list="preparingOrders"
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
      :class="[' text-white text-3xl py-3 rounded shadow font-medium',
      isDaying ? 'bg-red-500' : 'bg-amber-500'
      ]"
      @click = "DayingMode"
      >
      今日紀錄
      </button>

      <button 
      :class="[' text-white text-3xl py-3 rounded shadow font-medium',
      isSetting ? 'bg-red-600' : 'bg-indigo-600'
      ]"
      
      @click = "SystemSettingMode"
      >
      設定
      </button>
    </div>

      <!-- 測試用掃碼輸入框 -->
<!-- 右側：操作按鈕 -->
<div class="flex flex-col justify-start gap-6">
  <!-- 你的按鈕區塊... -->

  <!-- 顯示目前掃碼輸入中的內容 -->
  <p class="text-xl text-gray-500">目前掃碼內容：{{ inputBuffer }}</p>
</div>
  </div>

  <ConfirmModal
    :isOpen="showConfirmModal"
    :message="`確定要銷單：${selectedOrder}`"
    @confirm="confirmCancelOrder"
    @cancel="cancelDeleteOrder"
    @update:isOpen="showConfirmModal = $event"
  />


  <DayRecord 
  :isOpen ="showDayModal"
  @confirm="confirmDaying"
  @cancel="DayingCancelMode"
  
  />

  <SystemSettings 
  :isOpen ="showSystemSettingModal"
  @confirm="confirmSystemSetting"
  @cancel="SystemSettingCancelMode"
  />

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TitleBox from '../components/TitleBox.vue'
import OrderNumberGrid from '../components/OrderNumberGrid.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import SystemSettings from '../components/SystemSettings.vue'
import DayRecord from '../components/DayRecord.vue'
import { toastSimple } from '../composables/toastSimple.js'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()
const testInput = ref('')

const inputBuffer = ref('')
let scanTimeout = null

const isDeleting = ref(false)
const isSetting = ref(false)
const isDaying = ref(false)
const selectedOrder = ref(null)
const showConfirmModal = ref(false)
const showDayModal = ref(false)
const showSystemSettingModal = ref(false)
const lastClickOrder = ref(null)
const lastClickTime = ref(0)

const { preparingOrders } = storeToRefs(orderStore)

// 條碼
function handleScan(e){
  const char = e.key

  if(char.length !== 1 && char !=='Enter') return

  if(scanTimeout) clearTimeout(scanTimeout)

  scanTimeout = setTimeout(() => {
    inputBuffer.value =''
  }, 300)

  if(char ==='Enter'){
    const scannedCode = inputBuffer.value.trim()
    inputBuffer.value = ''
    handleScannedCode(scannedCode)
    return
  }
  inputBuffer.value += char
}

function handleScannedCode(scannedCode) {
  const order = orderStore.servedList.find(item  => item.no === scannedCode)


  if(!order){
    toastSimple('error','查無訂單:${scannedCode}')
    return
  }
  selectedOrder.value = scannedCode
  confirmCancelOrder()

}


function SystemSettingCancelMode() {
  SystemSettingMode()
}

function DayingCancelMode(){
  DayingMode()  
}

function SystemSettingMode() {
  showSystemSettingModal.value = !showSystemSettingModal.value
  isSetting.value = !isSetting.value
}

function DayingMode () {
  isDaying.value = !isDaying.value
  showDayModal.value = !showDayModal.value
}

function onSelect(orderNo) {
  const now = Date.now()

  // 銷單模式開啟時，直接選擇就彈窗
  if (isDeleting.value) {
    selectedOrder.value = orderNo
    showConfirmModal.value = true
    return
  }

  // 非銷單模式時，點兩次才觸發彈窗
  if (lastClickOrder.value === orderNo && now - lastClickTime.value < 1000) {
    selectedOrder.value = orderNo
    isDeleting.value = true
    showConfirmModal.value = true
    lastClickOrder.value = null
    lastClickTime.value = 0
  } else {
    lastClickOrder.value = orderNo
    lastClickTime.value = now
  }
}

function toggleDeleteMode() {
  isDeleting.value = !isDeleting.value
  selectedOrder.value = null
}


function confirmCancelOrder() {
  const removed = orderStore.servedList.find(item => item.no === selectedOrder.value)
  const newList = orderStore.servedList.filter(item => item.no !== selectedOrder.value)

  if (removed) {
    orderStore.addToFinishedList(removed)
  }

  orderStore.updateOrderList(newList)
  toastSimple('success', `銷單成功！`)
  selectedOrder.value = null
  isDeleting.value = false
  showConfirmModal.value = false
}

function confirmSystemSetting() {
  toastSimple('success', `設定成功！`)
  SystemSettingMode()
}

// 若使用者點取消
function cancelDeleteOrder() {
  isDeleting.value = false
  selectedOrder.value = null 
  showConfirmModal.value = false
}



function confirmDaying() {
  DayingMode()
}

onMounted(() => {
  window.addEventListener('keydown', handleScan)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleScan)
})

</script>

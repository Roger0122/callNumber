<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <!-- 背景遮罩 -->
    <div class=" absolute inset-0 bg-gray-400 opacity-40"></div>
    <!-- 展示內容 -->
    <div class="relative bg-white  rounded shadow-lg h-screen w-[600px] z-10">
      <h2 class="text-2xl font-bold mb-4 p-2 bg-black text-white text-center">今日紀錄</h2>
      
      <div class="flex">
      <div class= "text-2xl  font-bold ml-6 p-2 text-black text-center w-30  rounded-3xl">訂單類型</div>
        <v-select
        v-model="selectedType"
        :options="orderTypes"
        placeholder="請選擇"
        class="w-60 font-bold"
      />
      </div>

      <!-- 選項操作區 -->
  <div class="grid grid-cols-2 px-6 py-2">
    <div
      v-for="item in orderSources"
      :key="item.key"
      class="grid grid-cols-[1fr_auto_auto] items-center border rounded shadow-sm"
    >
      <!-- 左側叫號 -->
      <p class="font-bold text-xl px-2 truncate">{{ item.label }}</p>

      <!-- 中間時間 -->
      <p class="text-base text-right px-2">{{ item.time }}</p>

      <div class="bg-amber-600 w-full h-full flex justify-end items-center">
        <button
          class="text-white text-xl font-bold px-3 py-1"
          :disabled="!item.enabled"
          @click="toggleSource(item.key)"
        >
          還 原
        </button>
      </div>
    </div>
  </div>

      <div class="flex justify-center gap-3 mb-4">
        <button class=" font-semibold text-2xl px-8 py-2 border-2 border-gray-600 text-gray-600 rounded-3xl" @click="cancel">取消</button>
        <button class=" font-semibold text-2xl px-8 py-2  border-2 border-gray-600 text-gray-600 rounded-3xl" @click="confirm">確定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { toastSimple } from '../composables/toastSimple.js'
import { useSettingsStore } from '../stores/settings'
import { useOrderStore } from '../stores/order'

const settingsStore = useSettingsStore()
const userOrderStore = useOrderStore()

const selectedType = ref('全部')
const orderSources = ref([])

const orderTypes = [
  '全部', 'APP', 'Kiosk', 'Web', '熊貓', 'Uber',
  'POS1機', 'POS2機', 'POS3機', 'POS4機', 'POS5機',
  '電外送', 'A外送', '車道', '員工餐'
]

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
})



const emit = defineEmits(['update:isOpen', 'confirm', 'cancel'])

const cancel = () => {
  emit('update:isOpen', false)
  emit('cancel')
}

const confirm = () => {
  settingsStore.updateOrderSources(orderSources.value)
  emit('confirm', orderSources.value) 
  emit('update:isOpen', false)
}

function toggleSource(key) {
  const item = orderSources.value.find(i => i.key === key)
  if (item) {
    item.enabled = false
    userOrderStore.restoreFinishedOrder(key)

    orderSources.value = userOrderStore.finishedList.map(item => ({
      key: item.no,
      label: item.no,
      time: item.time || '-',
      enabled: !item.restored,
    }))
  }

  toastSimple('success', `已還原 ${item.label}`)

  emit('confirm', item.label )
  emit('update:isOpen', false)
}

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      orderSources.value = userOrderStore.finishedList.map(item => ({
        key: item.no,
        label: item.no,
        time: item.time || '-',
        enabled: !item.restored
      }))
    }
  }
)
</script>

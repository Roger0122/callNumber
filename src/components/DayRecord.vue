<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <!-- 背景遮罩 -->
    <div class=" absolute inset-0 bg-gray-400 opacity-40"></div>
    <!-- 展示內容 -->

    <div class="relative bg-white  rounded shadow-lg h-screen w-[600px] z-10">     
    <div class="flex items-center justify-between mb-4 p-2 bg-black text-white">
      <h2 class="text-2xl font-bold text-center w-full">今日紀錄</h2>
      <button @click="cancel" class="absolute right-4 text-white text-2xl font-bold">&times;</button>
    </div>



      <div class="flex ">
      <div class= "text-2xl  font-bold  p-2 text-black text-center w-30  rounded-3xl">訂單類型</div>
      <div class="  my-1.5">
      <v-select
        class="w-60 font-bold "
        v-model="selectedType"
        :options="orderTypeOptions"
        label="label"
        :reduce="option => option.value"
        placeholder="請選擇"
      />
      </div>
      </div>

      <!-- 選項操作區 -->
  <div class="grid grid-cols-2 px-6 py-2">
    <template v-if="orderSources.length > 0">
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
    </template>

    <template v-else>
    <div class="col-span-2 text-center text-gray-500 text-xl py-8">
      沒有符合條件的訂單
    </div>
      </template>
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

const selectedType = ref('all')
const orderSources = ref([])

const orderTypeOptions = [
  { label: '全部', value: 'all' },
  { label: 'APP', value: 'app' },
  { label: 'Kiosk', value: 'kiosk' },
  { label: 'Web', value: 'web' },
  { label: '熊貓', value: 'foodpanda' },
  { label: 'Uber', value: 'uber' },
  { label: '員工餐', value: 'staff' },
  { label: 'POS1機', value: 'pos1' },
  { label: 'POS2機', value: 'pos2' },
  { label: 'POS3機', value: 'pos3' },
  { label: 'POS4機', value: 'pos4' },
  { label: 'POS5機', value: 'pos5' },
  { label: '電外送', value: 'delivery1' },
  { label: 'A外送', value: 'delivery2' },
  { label: '車道', value: 'drive' },
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
  [() => props.isOpen, selectedType],
  ([isOpen]) => {
    if (isOpen) {
      const all = userOrderStore.finishedList.map(item => ({
        key: item.no,
        label: item.no,
        source: item.source || '未知', 
        time: item.time || '-',
        enabled: !item.restored,
      }))
      orderSources.value = selectedType.value === 'all'
        ? all
        : all.filter(i => i.source === selectedType.value.toLowerCase())
    }
  },
  { immediate: true }
)
</script>

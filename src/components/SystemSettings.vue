<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <!-- 背景遮罩 -->
    <div class=" absolute inset-0 bg-gray-400 opacity-40"></div>
    <!-- 展示內容 -->
    <div class="relative bg-white  rounded shadow-lg h-screen w-[600px] z-10">
      <h2 class="text-2xl font-bold mb-4 p-2 bg-black text-white text-center">用餐別顯示</h2>
      <p class= "text-xl  font-bold ml-6 p-2 bg-green-600 text-white text-center w-30  rounded-3xl">餐別顯示</p> 
    <!-- 選項操作區 -->
    <div class="grid grid-cols-2 px-6 py-2">
      <div
        v-for="item in orderSources"
        :key="item.key"
        class="flex items-center justify-between border px-4 py-2 rounded shadow-sm"
      >
        <p class="font-bold text-lg">{{ item.label }}</p>
        <div class="flex gap-1">
          <button
            class="w-12 py-1 rounded text-white"
            :class="!item.enabled ? 'bg-red-600' : 'bg-gray-300'"
            @click="toggleSource(item.key, false)"
          >
            OFF
          </button>
          <button
            class="w-12 py-1 rounded text-white"
            :class="item.enabled ? 'bg-green-600' : 'bg-gray-300'"
            @click="toggleSource(item.key, true)"
          >
            ON
          </button>
        </div>
      </div>
    </div>


      <div class="flex justify-center gap-3 mb-4">
        <button class=" font-semibold text-2xl px-8 py-2 border-2 border-gray-600 text-gray-600 rounded-3xl" @click="cancel">取消</button>
        <button class=" font-semibold text-2xl px-8 py-2  border-2 border-gray-600 text-gray-600 rounded-3xl" @click="confirm">確認</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '../stores/settings'
const settingsStore = useSettingsStore()

const orderSources = ref([])

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

function toggleSource(key, value) {
  const item = orderSources.value.find(i => i.key === key)
  if (item) item.enabled = value
}


onMounted(() => {
  orderSources.value = settingsStore.orderSources.map(item => ({ ...item }))
})

</script>

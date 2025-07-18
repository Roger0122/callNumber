<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <!-- 背景遮罩 -->
    <div class=" absolute inset-0 bg-gray-400 opacity-40"></div>
    <!-- 展示內容 -->
    <div class="relative bg-white  rounded shadow-lg w-[800px] z-10">
      <h2 class="text-2xl font-bold mb-4 p-2 bg-black text-white text-center">今日紀錄</h2>
      
      <div class="flex">
      <div class= "text-2xl  font-bold ml-6 p-2 text-black text-center w-30  rounded-3xl">訂單類型</div> 
      <select class="appearance-none text-2xl font-bold border-2 border-gray-600  w-60  ">
        <option>全部</option>
        <option>熊貓</option>
        <option>Uber</option>
      </select>
    <div class=" bg-gray-400 w-8  flex items-center justify-center">
      <div class=" text-black text-center justify-center">
        ▼
      </div>
    </div>
      </div>
      <!-- 選項操作區 -->
    <div class="grid grid-cols-2 px-6 py-2">
      <div
        v-for="item in orderSources"
        :key="item.key"
        class="flex items-center justify-between border rounded shadow-sm">
        <span class="font-bold text-lg">{{ item.label }}</span>
          <div class="bg-amber-600">
            <div class="border px-4 py-2">
              <button
                class="rounded text-white"
                @click="toggleSource(item.key, true)"
              >
                還原
              </button>
            </div>
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

<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <!-- 背景遮罩 -->
    <div class=" absolute inset-0 bg-gray-400 opacity-40"></div>
    <!-- 展示內容 -->
    <div class="relative bg-white  rounded shadow-lg w-[800px] z-10">
      <h2 class="text-2xl font-bold mb-4 p-2 bg-black text-white text-center">用餐別顯示</h2>
      <p class= "text-xl  font-bold ml-6 p-2 bg-green-600 text-white text-center w-30  rounded-3xl">餐別顯示</p> 
    <!-- 選項操作區 -->
    <div class="grid grid-cols-2 px-6 py-2">
      <div
        v-for="item in orderSources"
        :key="item.key"
        class="flex items-center justify-between border px-4 py-2 rounded shadow-sm"
      >
        <span class="font-bold text-lg">{{ item.label }}</span>
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
import { ref } from 'vue'


const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
})


const orderSources = ref([
  { label: 'APP(1~499)', key: 'app', enabled: true },
  { label: 'Kiosk', key: 'kiosk', enabled: true },
  { label: 'Web', key: 'web', enabled: true },
  { label: '熊貓', key: 'foodpanda', enabled: true },
  { label: 'Uber', key: 'uber', enabled: true },
  { label: 'POS1機', key: 'pos1', enabled: true },
  { label: 'POS2機', key: 'pos2', enabled: true },
  { label: 'POS3機', key: 'pos3', enabled: true },
  { label: 'POS4機', key: 'pos4', enabled: true },
  { label: 'POS5機', key: 'pos5', enabled: true },
  { label: '電外送', key: 'delivery1', enabled: false },
  { label: 'A外送', key: 'delivery2', enabled: false },
  { label: '車道', key: 'drive', enabled: false },
  { label: '員工餐', key: 'staff', enabled: false }
])
const emit = defineEmits(['update:isOpen', 'confirm', 'cancel'])

const cancel = () => {
  emit('update:isOpen', false)
  emit('cancel')
}

const confirm = () => {
  emit('confirm', orderSources.value) 
  console.log(orderSources.value);
  emit('update:isOpen', false)

}

function toggleSource(key, value) {
  const item = orderSources.value.find(i => i.key === key)
  if (item) item.enabled = value
}

</script>

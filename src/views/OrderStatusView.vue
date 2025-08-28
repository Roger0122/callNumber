<template>
  <div class="min-h-screen flex flex-col items-center bg-white text-black">
    <div :class="['w-full py-2 text-white text-lg text-center font-bold', bgColorClass]">
      {{ storeName }}
    </div>

    <div class="text-6xl font-bold mt-6">{{ orderId }}</div>
    <div class="text-xl mt-2">取餐編號</div>
  
    <div v-if="statusType === 'served'" class="flex flex-col items-center mt-6">
      <img src="./Served.png" class="w-12 h-12" />
      <div class="text-2xl text-green-700 font-bold mt-2">請取餐</div>
    </div>


    <div v-else-if="statusType === 'preparing'" class="flex flex-col items-center mt-6">
      <img src="./Preparing.png" class="w-12 h-12" />
      <div class="text-2xl text-red-600 font-bold mt-2">準備中</div>
    </div>

  <div v-else class="text-gray-600 text-center">
      <p>可以透過手機掃描 QR Code</p>
      <p>取得製餐資訊</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '../stores/order'

const route = useRoute()
const orderId = route.params.orderId
const storeName = '北投光明店'
const orderStore = useOrderStore()



const currentOrder = computed(() => {
  return (
    orderStore.servedList.find(o => o.no === orderId) 
  )
})


const statusType = computed(() => {
  if (!currentOrder.value) return 'not-found'
  if (currentOrder.value.status === 'preparing') return 'preparing'
  if (currentOrder.value.status === 'served') return 'served'
  return 'unknown'
})


const bgColorClass = computed(() => {
  switch (statusType.value) {
    case 'served': return 'bg-lime-600'
    case 'preparing': return 'bg-red-600'
    default: return 'bg-gray-400'
  }
})
</script>

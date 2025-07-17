<template>
  <div class="flex h-screen w-screen bg-gray-100 p-4">

        <!-- 左側：準備中 -->
        <div class="w-[40%] pr-4 flex flex-col">
      <div class="bg-red-600  text-white text-3xl font-bold text-center py-3 mb-4 rounded">準備中 Preparing <span>等待人數 16</span></div>
      <div class="grid grid-cols-3 gap-3 text-2xl font-bold bg-white ">
        <div v-for="(num, index) in servedList" :key="index" class="text-center  justify-center text-red-600">
          {{ num }}
        </div>
      </div>
    </div>


    <!-- 右側：叫號清單區 -->
    <div class="w-[40%] pr-4 flex flex-col">
      <div class="bg-lime-600  text-white text-3xl font-bold text-center py-3 mb-4 rounded">請取餐 Served</div>
      <div class="grid grid-cols-3 gap-3 text-2xl font-bold bg-white ">
        <div v-for="(num, index) in servedList" :key="index" class="text-center  justify-center ">
          {{ num }}
        </div>
      </div>
    </div>
  <!-- 外送取餐 -->
        <div class="w-[20%] pr-4 flex flex-col">
      <div class="bg-amber-600  text-white text-3xl font-bold text-center py-3 mb-4 rounded">外送取餐 Delivery</div>
      <div class="grid grid-cols-2 gap-3 text-2xl font-bold bg-white ">
        <div v-for="(num, index) in servedList" :key="index" class="text-center  justify-center  text-red-600">
          {{ num }}
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模擬號碼
const servedList = ref([
  'A008', '#4140', '2005',
  '2001', '2002', 'c2a04',
  '2003', 'cd638', '#4142',
  'cd639', '2004', '3005',
  '#4136', '#4137', 'W012',
  'K806', 'W006', 'K808'
])


</script>

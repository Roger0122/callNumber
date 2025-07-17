<template>
  <div class="flex h-screen w-screen bg-gray-100 p-4">
    <!-- 左側：叫號清單區 -->
    <div class="flex-1 pr-4 flex flex-col min-w-0">
        <TitleBox
          icon="/Served.png"
          title="請取餐"
          subtitle="Served"
          bgColor="bg-lime-600"
        />

        <OrderNumberGrid
        :list="servedList"
        :columns="3"
        />
    </div>

    <!-- 右側：操作按鈕 -->
    <div class="w-[15%] flex flex-col justify-start gap-6">
      <button 
      :class="[
      'text-white text-3xl py-3 rounded shadow font-medium',
      isActive ? 'bg-red-600' : 'bg-green-600'
    ]"
      @click="isActive = !isActive"
      >銷單</button>
      <button class="bg-amber-500 text-white text-3xl py-3 rounded shadow font-medium">今日紀錄</button>
      <button class="bg-indigo-600 text-white text-3xl py-3 rounded shadow font-medium">設定</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TitleBox from '../components/TitleBox.vue'
import OrderNumberGrid from '../components/OrderNumberGrid.vue'

const isActive = ref(false)





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

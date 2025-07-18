<template>
  <div class="flex h-screen w-screen bg-gray-100 p-4">

    <!-- 左側：準備中 -->
    <div class="w-[40%] pr-4 flex flex-col">
        <TitleBox
          icon="./Preparing.png"
          title="準備中"
          subtitle="Preparing"
          bgColor="bg-red-600"
        />
        <OrderNumberGrid
            :list="servedList"
            :columns="3"
            textColor="text-red-600"
        />
    </div>


    <!-- 右側：叫號清單區 -->
    <div class="w-[40%] pr-4 flex flex-col">
        <TitleBox
          icon="./Served.png"
          title="請取餐"
          subtitle="Served"
          bgColor="bg-lime-600"
        />
        <OrderNumberGrid
          :list="servedList"
          :columns="3"
        />
    </div>
  <!-- 外送取餐 -->
        <div class="w-[20%] pr-4 flex flex-col ">
        <TitleBox
          title="外送取餐"
          subtitle="Delivery"
          bgColor="bg-amber-600"
        />

      <OrderNumberGrid
          :list="servedList"
          :columns="2"
          textColor="text-red-600"
        />
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import TitleBox from '../components/TitleBox.vue'
import OrderNumberGrid from '../components/OrderNumberGrid.vue'



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

<template>
  <div class="flex h-screen w-screen bg-gray-100 p-4">

    <!-- 左側：準備中 -->
    <div :class="[showDelivery ? 'w-[40%]' : 'w-1/2', 'pr-4 flex flex-col']">
        <TitleBox
          icon="./Preparing.png"
          title="準備中"
          subtitle="Preparing"
          :waitingCount=waitingCount
          bgColor="bg-red-600"
        />
        <OrderNumberGrid
            :list="preparingOrders"
            :columns="3"
            textColor="text-red-600"
        />
    </div>

    <!-- 右側：叫號清單區 -->
    <div :class="[showDelivery ? 'w-[40%]' : 'w-1/2', 'pr-4 flex flex-col']">
        <TitleBox
          icon="./Served.png"
          title="請取餐"
          subtitle="Served"
          bgColor="bg-lime-600"
        />
        <OrderNumberGrid
          :list="servedOrders"
          :columns="3"
        />
    </div>
  <!-- 外送取餐 -->
        <div 
        v-if="activeSources.includes('foodpanda') || activeSources.includes('uber')"
        class="w-[20%] pr-4 flex flex-col ">
        <TitleBox
          title="外送取餐"
          subtitle="Delivery"
          bgColor="bg-amber-600"
        />

      <OrderNumberGrid
          :list="deliveryOrders"
          :columns="2"
          textColor="text-red-600"
        />
    </div>
  </div>
</template>

<script setup>
import { ref, computed  } from 'vue'
import { storeToRefs } from 'pinia'
import TitleBox from '../components/TitleBox.vue'
import OrderNumberGrid from '../components/OrderNumberGrid.vue'
import { useSettingsStore } from '../stores/settings'
import { useOrderStore } from '../stores/order'

const settingsStore = useSettingsStore()
const orderStore = useOrderStore()

const { servedOrders, preparingOrders, deliveryOrders, waitingCount } = storeToRefs(orderStore)

const activeSources = computed(() =>
  settingsStore.orderSources.filter(item => item.enabled).map(item => item.key)
)

const showDelivery = computed(() =>
  activeSources.value.includes('foodpanda') || activeSources.value.includes('uber')
)
</script>

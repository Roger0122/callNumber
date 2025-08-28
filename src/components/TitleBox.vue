<template>

  <div :class="['text-white rounded-md flex items-center overflow-hidden h-20', bgColor]">
  <div 
  
  :class="[
  'flex  items-center gap-3 text-white px-4 py-3',
    isPreparing ? 'flex-1 justify-start' : 'w-full justify-center text-center'
  ]">
    <!-- 圖示 -->
    <img v-if="icon" :src="icon" alt="icon" class="w-12 h-12" />
    <!-- 中文標題 + 英文副標 -->
    <div class="flex flex-col leading-tight mx-1">
      <p class="text-3xl font-bold leading-tight">{{ title }}</p>
      <p :class="['text-xl font-light', isPreparing ? 'text-center md:text-left' : 'text-center']">{{ subtitle }}</p>
    </div>
  </div>

    <!-- 右側：等待人數 -->
    <div v-if="title== '準備中'" 
    class="relative shrink-0 bg-white text-black px-6 py-3 min-w-[120px] text-center flex flex-col justify-center">
    <div
      class="pointer-events-none absolute inset-y-0 left-[-1.25rem] w-10 bg-white -skew-x-12 origin-left"
      aria-hidden="true"
    ></div>
    
    
    <p class="text-3xl">等待人數</p>
      <p class="text-3xl ">{{ waitingCount }}</p>
    </div>

  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: null
  },
  title: { 
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  bgColor: {
    type: String,
    default: 'bg-gray-600'
  },
  waitingCount:{
    type: Number,
    default: 0
  }
})
</script>
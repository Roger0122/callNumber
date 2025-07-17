<template>
  <div :class="['text-white py-3 px-4 mb-4 rounded flex items-center  justify-center gap-3', bgColor]">
    <!-- 圖示 -->
    <img v-if="icon" :src="icon" alt="icon" class="w-12 h-12" />

    <!-- 中文標題 + 英文副標 -->
    <div class="flex flex-col leading-tight mx-1">
      <p class="text-3xl font-bold leading-tight">{{ title }}</p>
      <p class="text-xl font-light text-center">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: null
  },
  title: String,
  subtitle: String,
  bgColor: {
    type: String,
    default: 'bg-gray-600'
  }
})
</script>
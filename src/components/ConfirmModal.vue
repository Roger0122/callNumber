<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
  <!-- 背景遮罩 -->
    <div class=" absolute inset-0 bg-gray-400 opacity-40"></div>

    <div class="relative bg-white p-6 rounded shadow-lg w-[360px] z-10">
      <h2 class="text-xl font-bold mb-4 text-center">銷單確認</h2>
      <p class="text-center text-lg mb-6">{{ message }}</p>

      <div class="flex justify-center gap-3">
        <button class="px-4 py-2 bg-gray-600 text-white rounded" @click="cancel">取消</button>
        <button class="px-4 py-2 bg-red-600 text-white rounded" @click="confirm">確認</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  message: String
})

const emit = defineEmits(['update:isOpen', 'confirm', 'cancel'])

const cancel = () => {
  emit('update:isOpen', false)
  emit('cancel')
}

const confirm = () => {
  emit('confirm')
  emit('update:isOpen', false)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-whit-100   flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-[360px]">
      <h2 class="text-xl font-bold mb-4 text-center">銷單確認</h2>
      <p class="text-center text-lg mb-6">{{ message }}</p>

      <div class="flex justify-end gap-3">
        <button class="px-4 py-2 bg-gray-400 text-white rounded" @click="cancel">取消</button>
        <button class="px-4 py-2 bg-red-600 text-white rounded" @click="confirm">確認</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  message: String
})

const emit = defineEmits(['update:isOpen', 'confirm'])

const cancel = () => {
  emit('update:isOpen', false)
}

const confirm = () => {
  emit('confirm')
  emit('update:isOpen', false)
}
</script>

<template>
<div class="text-2xl font-bold bg-white ">
  <div :class="['grid gap-3', {
    'grid-cols-1': columns === 1,
    'grid-cols-2': columns === 2,
    'grid-cols-3': columns === 3,
    'grid-cols-4': columns === 4,
    'grid-cols-5': columns === 5,
    'grid-cols-6': columns === 6,
  }]">
    <div
      v-for="(num, index) in list"
      :key="index"
      :class="[
      'cursor-pointer min-w-0 w-full text-center font-bold text-2xl rounded p-2', 
      textColor,
      isDeletable ? 'hover:bg-red-400' : '',
      selected === num.no ? 'bg-red-200' : ''
      ]"
      @click = "handleClick(num.no)"
    >
      {{ num.no }}
    </div>
  </div>
</div>
</template>

<script setup>

const emit = defineEmits(['select'])

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Number,
    default: 3,
  },
  textColor: {
    type: String,
    default: 'text-black'
  },
  isDeletable: {
    type: Boolean,
    default: false
  },
  selected: {
    type: String,
    default: null
  }
})


function handleClick(no){
  if(props.isDeletable){
    emit('select', no)
  }
}

</script>

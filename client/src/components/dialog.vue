<template>
  <div
    class="fixed left-1/2 top-20 -translate-x-1/2 p-5 border w-96 shadow-lg rounded-md bg-white"
    v-show="show"
  >
    <div class="mt-3">
      <div class="mt-2 px-7 py-3">
        <slot />
      </div>
      <div class="flex items-center px-4 py-3">
        <button
          class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md flex-1 mr-2 shadow-sm"
          @click="handleCancel"
        >
          取消
        </button>
        <button
          class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md flex-1 shadow-sm"
          @click="handleComfirm"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'comfirm'])
const handleCancel = () => {
  emit('update:show', false)
}
const handleComfirm = () => {
  emit('comfirm')
}
</script>
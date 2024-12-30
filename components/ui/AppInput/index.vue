<template>
  <div>
    <label :for="$props.id">{{ $props.label }}</label>
    <input
      :id="$props.id"
      type="text"
      :value="reactiveModelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', ($event.target as any).value)"
    >
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

defineOptions({
  name: 'AppInput',
})

interface Props {
  id: string
  label?: string
  modelValue: string
}
const props = defineProps<Props>()

defineEmits(['update:modelValue'])
const reactiveModelValue = toRef(props, 'modelValue')
</script>

<style scoped lang="scss">
input {
  width: 100%;
  height: 14px;
  padding: 3rem 3rem;
  border: 1px solid #e5e5e5;
  border-radius: 2rem;
  color: #808080;
}
</style>

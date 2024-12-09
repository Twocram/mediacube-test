<template>
  <input class="input" :placeholder="placeholder" :type="type" v-model="modelValue" />
</template>

<script setup lang="ts">
type InputType = 'text' | 'password' | 'email' | 'number'

type Props = {
  type: InputType
  placeholder: string
}

defineProps<Props>()

const modelValue = defineModel<string>()
</script>

<style scoped>
.input {
  width: 100%;
  padding: 12px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(199, 204, 209, 1);
  outline: none;
  font-size: 14px;
  line-height: 16px;
  color: var(--main-color);
  background-color: var(--white-color);
}

.input::placeholder {
  font-size: 14px;
  line-height: 16px;
  color: rgba(143, 153, 163, 1);
}
</style>

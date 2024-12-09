<template>
  <div class="input-container">
    <input
      class="input"
      :class="[{ 'input-error': errorMessage }]"
      :placeholder="placeholder"
      :type="type"
      v-model.trim="modelValue"
    />
    <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
type InputType = 'text' | 'password' | 'email' | 'number'

type Props = {
  type: InputType
  placeholder: string
  errorMessage?: string
}

defineProps<Props>()

const modelValue = defineModel<string>()
</script>

<style scoped>
.input-container {
  width: 100%;
  position: relative;
}

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

.input-error {
  border: 1px solid var(--error-color);
}

.error-message {
  position: absolute;
  bottom: -16px;
  left: 0;
  color: var(--error-color);
  font-size: 12px;
  line-height: 16px;
}
</style>

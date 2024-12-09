<template>
  <button class="button" :type="type" :class="[`button-${size}`, `button-${color}`, { 'button-loading': isLoading }]">
    <div class="loader" v-if="isLoading"></div>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonColor, ButtonType, ButtonSize } from '@/types/button'

type Props = {
  size?: ButtonSize
  type?: ButtonType
  color?: ButtonColor
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'default',
  type: 'button',
  color: 'primary',
})
</script>

<style scoped>
.button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  white-space: nowrap;
  font-size: 13px;
  line-height: 16px;
}

.button-primary {
  color: var(--white-color);
  background-color: var(--primary-color);
}

.button-loading {
  cursor: not-allowed;
  pointer-events: none;
}

.button-colorless {
  color: var(--main-color);
  background-color: transparent;
}

.button:hover {
  background-color: var(--primary-color-hover);
  color: var(--white-color);
  transition: all 0.3s ease-in-out;
}

.button-default {
  padding: 8px 12px;
}

.button-medium {
  padding: 12px 16px;
}

.button-rounded {
  border-radius: 50px;
  padding: 8px;
}

.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid var(--primary-color);
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

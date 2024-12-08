<template>
  <button class="button" :type="type" :class="[`button-${size}`, `button-${color}`]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonColor, ButtonType, ButtonSize } from '@/types/button'

type Props = {
  size?: ButtonSize
  type?: ButtonType
  color?: ButtonColor
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
</style>

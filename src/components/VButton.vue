<template>
  <button class="button" :type="type" :class="[`button-${weight}`, `button-${color}`]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type ButtonWeight = "default" | "medium"
type ButtonType = "button" | "submit"
type ButtonColor = "primary" | "colorless"

type Props = {
  weight?: ButtonWeight
  type?: ButtonType
  color?: ButtonColor
}

withDefaults(defineProps<Props>(), {
  weight: "default",
  type: "button",
  color: "primary"
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
  font-size: 13px;
  line-height: 16px;
}

.button-primary {
  color: var(--white-color);
  background-color: var(--primary-color)
}

.button-colorless {
  color: var(--main-color);
  background-color: var(--white-color);
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
</style>

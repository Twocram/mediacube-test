<template>
  <div @click="checked = !checked" class="checkbox" :class="{ 'checkbox--active': checked }">
  </div>
</template>

<script setup lang="ts">
const checked = defineModel<boolean>()

</script>

<style scoped>
.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid rgba(199, 204, 209, 1);
  border-radius: 2px;
}

.checkbox--active {
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  position: relative;
}

.checkbox--active::before {
  content: url('/src/assets/mark.svg');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

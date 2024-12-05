<template>
  <div class="progress-bar" :style="{ '--progress': progress + '%' }">
    <div class="progress-bar__inner" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  count: number
  total: number
  color: string
}

const props = defineProps<Props>()

const progress = computed(() => {
  return (props.count / props.total) * 100
})
</script>

<style scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: rgba(32, 36, 39, 0.07);
  border-radius: 8px;
}

.progress-bar__inner {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: v-bind(color);
  border-radius: 8px;
  transition: width 0.3s ease-in-out;
}

.progress-bar::before {
  content: attr(--progress);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  line-height: 10px;
}
</style>

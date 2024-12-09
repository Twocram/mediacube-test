<template>
  <div class="progress-card">
    <div class="progress-card__count">{{ count }} {{ countLabel }}</div>
    <div class="progress-card__status">{{ status }}</div>
    <VProgressBar :count="count" :total="total" :color="color" />
  </div>
</template>

<script setup lang="ts">
import VProgressBar from '@/components/ui/VProgressBar.vue'

type Props = {
  status: string
  count: number
  countLabel: string
  total: number
  color: string
}

defineProps<Props>()
</script>

<style scoped>
.progress-card {
  padding: 16px;
  background-color: var(--main-low-color);
  width: 100%;
  border-radius: 8px;
  height: 85px;
}

.progress-card__count {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  opacity: 0.5;
  margin-bottom: 4px;
}

.progress-card__status {
  font-weight: 700;
  font-size: 14px;
  line-height: 16.94px;
  margin-bottom: 12px;
}
</style>

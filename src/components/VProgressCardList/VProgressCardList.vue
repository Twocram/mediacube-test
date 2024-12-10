<template>
  <div class="card-list__cards">
    <VProgressCard v-for="(card, index) in progressCards" :key="index" :count-label="card.countLabel"
      class="card-list__cards-progress" :count="card.count" :total="card.total" :color="card.color"
      :status="card.status" />
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { pluralizeText } from '@/utils/textUtils'
import VProgressCard from '@/components/VProgressCard/VProgressCard.vue'

type Props = {
  completedTasksLength: number
  notCompletedTasksLength: number
  tasksLength: number
}

const props = defineProps<Props>()

const progressCards = computed(() => [
  {
    countLabel: pluralizeText(props.notCompletedTasksLength, 'task'),
    count: props.notCompletedTasksLength,
    total: props.tasksLength,
    color: '#2578F4',
    status: 'In progress',
  },
  {
    countLabel: pluralizeText(props.completedTasksLength, 'task'),
    count: props.completedTasksLength,
    total: props.tasksLength,
    color: 'rgba(239, 93, 168, 1)',
    status: 'Completed',
  },
])
</script>


<style scoped>
.card-list__cards {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.card-list__cards-progress {
  max-width: 190px;
}

@media screen and (max-width: 768px) {
  .card-list__cards {
    flex-direction: column;
    gap: 12px;
  }

  .card-list__cards-progress {
    max-width: 100%;
  }
}
</style>

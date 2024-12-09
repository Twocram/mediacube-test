<template>
  <div class="card-list__cards">
    <VProgressCard :count-label="pluralizeText(notCompletedTasksLength, 'task')" class="card-list__cards-progress"
      :count="notCompletedTasksLength" :total="tasksLength" color="#2578F4" status="In progress" />

    <VProgressCard :count-label="pluralizeText(completedTasksLength, 'task')" class="card-list__cards-progress"
      :count="completedTasksLength" :total="tasksLength" color="rgba(239, 93, 168, 1)" status="Completed" />
  </div>
</template>

<script setup lang="ts">
import { pluralizeText } from '@/utils/textUtils'
import VProgressCard from '@/components/VProgressCard/VProgressCard.vue'

type Props = {
  completedTasksLength: number
  notCompletedTasksLength: number
  tasksLength: number
}

defineProps<Props>()
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

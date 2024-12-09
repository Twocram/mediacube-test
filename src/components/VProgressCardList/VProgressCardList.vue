<template>
  <div class="wrapper-content__cards">
    <VProgressCard
      :count-label="pluralizeText(notCompletedTasksLength, 'task')"
      class="wrapper-content__cards-progress"
      :count="notCompletedTasksLength"
      :total="tasksLength"
      color="#2578F4"
      status="In progress"
    />

    <VProgressCard
      :count-label="pluralizeText(completedTasksLength, 'task')"
      class="wrapper-content__cards-progress"
      :count="completedTasksLength"
      :total="tasksLength"
      color="rgba(239, 93, 168, 1)"
      status="Completed"
    />
  </div>
</template>

<script setup lang="ts">
import { pluralizeText } from '@/utils/textUtils'
import VProgressCard from '../VProgressCard/VProgressCard.vue'

type Props = {
  completedTasksLength: number
  notCompletedTasksLength: number
  tasksLength: number
}

defineProps<Props>()
</script>

<style scoped>
.wrapper-content__cards {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.wrapper-content__cards-progress {
  max-width: 190px;
}

@media screen and (max-width: 768px) {
  .wrapper-content__cards {
    flex-direction: column;
    gap: 12px;
  }

  .wrapper-content__cards-progress {
    max-width: 100%;
  }
}
</style>

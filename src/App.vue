<template>
  <main>
    <div class="container">
      <div class="wrapper">
        <div class="wrapper-content">
          <VTodoIcon class="wrapper-content__icon" />
          <div class="wrapper-content__caption">Today I need to</div>
          <VInput
            class="wrapper-content__input"
            placeholder="Add new todo..."
            type="text"
            v-model="inputValue"
          />

          <div class="wrapper-content__footer" v-if="tasks.length < 1">
            <VCheckmarkIcon /> <span>Congrat, you have no more tasks to do</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VCheckmarkIcon from './components/icons/VCheckmarkIcon.vue'
import VTodoIcon from './components/icons/VTodoIcon.vue'
import VInput from './components/VInput.vue'

const inputValue = ref('')

const tasks = ref([])
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.wrapper {
  max-width: 730px;
  width: 100%;
  max-height: 719px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 24px;
  padding: 32px;
}

.wrapper-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper-content__icon {
  margin-bottom: 48px;
}

.wrapper-content__caption {
  font-size: 24px;
  line-height: 29.05px;
  font-weight: 700;
  margin-bottom: 52px;
}

.wrapper-content__input {
  max-width: 317px;
}

.wrapper-content__footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.wrapper-content__footer span {
  font-size: 14px;
  line-height: 16px;
  color: var(--gray-color);
}
</style>

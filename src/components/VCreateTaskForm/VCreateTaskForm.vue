<template>
  <form @submit.prevent="submitHandler" class="create-task__form">
    <VInput
      class="create-task__form-input"
      placeholder="Add new todo..."
      type="text"
      :error-message="inputError"
      v-model="inputValue"
    />
    <VButton v-if="inputValue" :is-loading="isResponseSending" size="medium" type="submit">
      {{ isEditMode ? 'Edit' : 'Add' }}
    </VButton>
  </form>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import VInput from '@/components/ui/VInput.vue'
import { ref, watch } from 'vue'

type Props = {
  isEditMode: boolean
  isResponseSending: boolean
}

defineProps<Props>()
const inputValue = defineModel<string>()

const emits = defineEmits(['submit'])

const inputError = ref('')

const submitHandler = () => {
  if (!inputValue.value) {
    inputError.value = 'Field is required'
    return
  }
  emits('submit', inputValue.value)
  inputValue.value = ''
}

watch(
  () => inputValue.value,
  () => {
    inputError.value = ''
  },
)
</script>

<style scoped>
.create-task__form {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  width: 100%;
}

.create-task__form-input {
  max-width: 317px;
}
</style>

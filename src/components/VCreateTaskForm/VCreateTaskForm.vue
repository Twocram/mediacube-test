<template>
  <form @submit.prevent="submitHandler" class="create-task__form">
    <VInput class="create-task__form-input" placeholder="Add new todo..." type="text" v-model="inputValue" />
    <VButton v-if="inputValue" size="medium" type="submit"> {{ isEditMode ? 'Edit' : 'Add' }} </VButton>
  </form>
</template>

<script setup lang="ts">
import VInput from '@/components/ui/VInput.vue'
import VButton from '@/components/ui/VButton.vue'

type Props = {
  isEditMode: boolean
}

defineProps<Props>()
const inputValue = defineModel<string>()

const emits = defineEmits(['submit'])


const submitHandler = () => {
  if (!inputValue.value) return
  emits('submit', inputValue.value)
  inputValue.value = ''
}

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

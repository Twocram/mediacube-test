<template>
  <form @submit.prevent="submitHandler" class="wrapper-content__form">
    <VInput class="wrapper-content__form-input" placeholder="Add new todo..." type="text" v-model="inputValue" />

    <VButton v-if="inputValue" size="medium" type="submit">
      Submit
    </VButton>
  </form>
</template>

<script setup lang="ts">
import VInput from './ui/VInput.vue';
import VButton from './ui/VButton.vue';

const inputValue = defineModel<string>()

const emits = defineEmits(['submit'])

const submitHandler = () => {
  if (!inputValue.value) return
  emits('submit', inputValue.value)
  inputValue.value = ''
}
</script>

<style scoped>
.wrapper-content__form {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  width: 100%;
}

.wrapper-content__form-input {
  max-width: 317px;
}
</style>

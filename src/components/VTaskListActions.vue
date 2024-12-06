<template>

  <div class="wrapper-content__footer-actions">
    <VButton color="colorless">
      Check all
    </VButton>
    <VButton color="colorless">
      All
    </VButton>
    <VButton color="colorless">
      Active
    </VButton>
    <VButton color="colorless">
      Completed
    </VButton>
    <VButton color="colorless">
      Clear completed
    </VButton>
  </div>
</template>

<script setup lang="ts">
import VButton from './ui/VButton.vue';


</script>

<style scoped>
.wrapper-content__footer-actions {
  display: flex;
}
</style>

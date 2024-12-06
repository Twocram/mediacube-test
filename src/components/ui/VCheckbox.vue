<template>
  <div class="checkbox-container">
    <div class="checkbox" :class="{ 'checkbox--active': value }" @click="changeHandler">
      <div class="checkbox-icon" v-if="value">
        <img :src="markSvgIcon" alt="checked">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import markSvgIcon from "@/assets/icons/mark.svg"
type Props = {
  value: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['change'])

const changeHandler = () => {
  emits('change', !props.value)
}
</script>

<style scoped>
.checkbox-container {
  display: inline-block;
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid rgba(199, 204, 209, 1);
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox--active {
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.checkbox-icon {
  width: 12px;
  height: 12px;
}

.checkbox-icon img {
  width: 100%;
  height: 100%;
}
</style>

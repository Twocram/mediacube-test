<template>
  <VButton @click="toggleTheme" size="rounded">
    <VDarkModeIcon v-if="theme === 'light'" />
    <VLightModeIcon v-else />
  </VButton>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import VButton from '@/components/ui/VButton.vue'
import VDarkModeIcon from '@/components/icons/VDarkModeIcon.vue'
import VLightModeIcon from '@/components/icons/VLightModeIcon.vue'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped></style>

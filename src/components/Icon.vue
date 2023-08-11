<script lang="ts" setup>
const props = defineProps<{ name: string; size: number }>()
</script>

<template>
  <span class="iconify" :data-icon="`mdi-${props.name}`"></span>
</template>

<style scoped></style>

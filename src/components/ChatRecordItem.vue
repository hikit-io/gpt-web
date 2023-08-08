<script setup lang="ts">
const props = defineProps<{ direction: 'left' | 'right', text: string }>()
</script>

<template>
  <div :class="{'chat-item-main':true, 'reverse': props.direction == 'right'}">
    <icon name="user" :size="16"></icon>
    <var-paper>
      <var-cell>{{ props.text }}</var-cell>
    </var-paper>
  </div>
</template>

<style scoped>
.chat-item-main {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.reverse {
  flex-direction: row-reverse;
}
</style>
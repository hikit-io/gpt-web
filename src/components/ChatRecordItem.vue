<script setup lang="ts">
import { computed } from 'vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { useAppBar } from '@/composable/useAppBar'
import { BasicColorSchema } from '@vueuse/core'

const props = defineProps<{ direction: 'left' | 'right'; text: string; loading: boolean }>()
const { colorMode } = useAppBar()

const loading = computed(() => props.loading)
const text = computed(() => props.text)
const theme: { [key in BasicColorSchema]: 'dark' | 'light' } = {
  auto: 'light',
  light: 'light',
  dark: 'dark',
}
</script>

<template>
  <div :class="{ 'chat-item-main': true, reverse: props.direction == 'right' }">
    <div>
      <icon-mdi-user></icon-mdi-user>
    </div>
    <div class="md">
      <MdPreview class="md" v-model="text" :theme="theme[colorMode]" preview-theme="github"></MdPreview>
      <var-loading type="wave" size="small" v-if="loading" />
    </div>
  </div>
</template>

<style scoped>
.chat-item-main {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.reverse {
  flex-direction: row-reverse;
}

.icon {
  display: inline-block;
}

:deep(.md-editor-preview) {
  font-size: 14px;
}

:deep(.md-editor-preview p) {
  margin-block-end: 0;
}

:deep(pre .code-block) {
  font-size: 12px;
}

:deep(pre code *) {
  line-height: 1.2;
}

:deep(.md-editor-preview-wrapper) {
  padding: 0 10px 0 10px;
}

.md {
  display: flex;
  background: transparent;
}
</style>

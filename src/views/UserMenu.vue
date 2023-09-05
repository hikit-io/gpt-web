<script lang="ts" setup>
import { useAppBar } from '@/composable/useAppBar'
import { useAccessToken } from '@/composable/useAccessToken'
import { useGetProfileQuery } from '@/composable/useService'
import { ref } from 'vue'

const { logout, showRight } = useAppBar()

const { name } = useAccessToken()

const { onResult } = useGetProfileQuery()

const count = ref(0)

onResult(param => {
  if (param.data){
    count.value = param.data.profile.count
  }
})
</script>

<template>
  <var-menu v-if="showRight" placement="bottom" trigger="hover" :same-width="true">
    <var-button text>
      {{ name }}
      <var-icon name="chevron-down"></var-icon>
    </var-button>
    <template #menu>
      <var-cell :ripple="true"> Remain: {{ count }}</var-cell>
      <var-cell @click="logout" :ripple="true">Exit</var-cell>
    </template>
  </var-menu>
</template>

<style scoped></style>

<script lang="ts" setup>
import {useAppBar} from "@/composable/useAppBar";
import {useAccessToken} from "@/composable/useAccessToken";

const {onProfile, logout} = useAppBar()

const {name} = useAccessToken()


</script>

<template>
  <var-menu placement="bottom" trigger="hover" :same-width="true">
    <var-button text>
      {{ name }}
      <var-icon name="chevron-down"></var-icon>
    </var-button>
    <template #menu>
      <var-cell @click="onProfile" :ripple="true">Profile</var-cell>
      <var-cell @click="logout" :ripple="true">Exit</var-cell>
    </template>
  </var-menu>
</template>

<style scoped>

</style>
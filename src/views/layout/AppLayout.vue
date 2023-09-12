<script lang="ts" setup>
import { useAppBarProvide } from '@/composable/useAppBar'
import { useAccessToken } from '@/composable/useAccessToken'
import { useGetNameQuery } from '@/composable/useAuthService'
import { useAppLoadingProvide } from '@/composable/useAppLoading'
import AppBarLeft from '@/views/layout/AppBarLeft.vue'
import AppBarRight from '@/views/layout/AppBarRight.vue'

// Api Service

// App bar state manage
const appBarCtx = useAppBarProvide()

// App loading
const appLoadingCtx = useAppLoadingProvide()
appLoadingCtx.on()

// Check Login
const token = useAccessToken()

const { onResult, onError } = useGetNameQuery({
  clientId: 'auth',
  fetchPolicy: 'network-only',
})

onResult((param) => {
  if (param.data.profile) {
    appBarCtx.on()
    appLoadingCtx.off()
  }
})

onError(() => {
  token.del()
})
</script>

<template>
  <var-app-bar>
    <app-bar-left />
    <template #right>
      <app-bar-right />
    </template>
  </var-app-bar>
  <router-view v-if="!appLoadingCtx.loading.value"></router-view>
  <div style="flex: 1"></div>
  <div class="footer">
    <var-divider></var-divider>
    <h4>@HiKit</h4>
  </div>
  <var-skeleton fullscreen :loading="appLoadingCtx.loading.value"></var-skeleton>
</template>

<style scoped>
.footer {
  width: 100%;
  text-align: center;
}

.title {
  color: white;
  text-decoration: none;
}
</style>

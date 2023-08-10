<script lang="ts" setup>

import {provide} from "vue";
import {AppBar, AppBarContext, useAppBarProvide} from "@/composable/useAppBar";
import {useAccessToken} from "@/composable/useAccessToken";
import {useRouter} from "vue-router";
import UserMenu from "./UserMenu.vue";
import {useGetNameLazyQuery} from "@/composable/useAuthService";


// Api Service


// App bar state manage
const appBarContext = useAppBarProvide()
provide(AppBar, appBarContext as AppBarContext)

// Check Login
const router = useRouter()
const token = useAccessToken()

const {load, onResult, onError} = useGetNameLazyQuery({
  clientId: 'auth'
})

onResult(param => {
  if (param.data.profile) {
    appBarContext.toggleRight(true)
  }
})

onError(param => {
  console.log(`error:${param.message}`)
  token.del()
  window.location.href = `https://auth.hikit.io/?from=https://gpt.hikit.io`
})


router.beforeResolve((to, from) => {
  load()
})

const title = import.meta.env.VITE_TITLE


</script>

<template>
  <var-app-bar>
    <router-link to="/" class="title">
      {{ title }}
    </router-link>
    <template #right>
      <user-menu></user-menu>
    </template>
  </var-app-bar>
  <router-view></router-view>
  <div style="flex: 1;"></div>
  <div class="footer">
    <var-divider></var-divider>
    <h4>@HiKit</h4>
  </div>
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
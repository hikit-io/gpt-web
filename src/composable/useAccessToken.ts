import { useCookies } from '@vueuse/integrations/useCookies'
import { computed, Ref } from 'vue'

export interface AccessTokenContext {
  name: Ref<string>
  get: () => string
  del: () => void
}

const useAccessToken = (): AccessTokenContext => {
  const cookies = useCookies()

  const get = () => {
    return cookies.get<string>('HIKIT')
  }
  const del = () => {
    cookies.remove('HIKIT', {
      path: '/',
      domain: '.hikit.io',
    })
    cookies.remove('HIKIT', {
      path: '/',
    })
  }
  const name = computed(() => cookies.get<string>('HIKIT_NAME'))
  return {
    name,
    get,
    del,
  }
}

export { useAccessToken }

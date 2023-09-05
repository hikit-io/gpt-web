<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue'
import { useDateFormat, useFileSystemAccess, useMagicKeys, useNow } from '@vueuse/core'
import { useChatSubscription } from '@/composable/useService'
import { useAccessToken } from '@/composable/useAccessToken'

const text = ref('')

interface Record {
  id: number
  text: string
  direction: 'left' | 'right'
  is_finished: boolean
}

const histories = reactive<Record[]>([])

const keys = useMagicKeys()
const cmdEnter = keys['Command+Enter']
const ctrlEnter = keys['Ctrl+Enter']

const chatScroller = ref<any | null>(null)

const { name } = useAccessToken()

const message = ref(`Hi,I'm ${name.value}`)

const id = ref(histories.length)

watch(cmdEnter, (v) => {
  if (v) {
    histories.push({
      id: id.value + 1,
      text: text.value,
      direction: 'right',
      is_finished: true,
    })
    id.value += 1
    message.value = text.value
    nextTick(() => {
      text.value = ''
      if (chatScroller.value) {
        chatScroller.value.scrollToBottom()
      }
    })
  }
})

watch(ctrlEnter, (v) => {
  if (v) {
    histories.push({
      id: id.value + 1,
      text: text.value,
      direction: 'right',
      is_finished: true,
    })
    id.value += 1
    message.value = text.value
    nextTick(() => {
      text.value = ''
      if (chatScroller.value) {
        chatScroller.value.scrollToBottom()
      }
    })
  }
})

const { onResult, loading } = useChatSubscription(() => ({ msg: message.value }), {})

onResult((e) => {
  histories[histories.length - 1].text += e.data!.chat
  nextTick(() => {
    setTimeout(() => {
      if (chatScroller.value) {
        chatScroller.value.scrollToBottom()
      }
    }, 50)
  })
})

watch(
  loading,
  (value) => {
    if (value) {
      histories.push({
        id: id.value + 1,
        text: text.value,
        direction: 'left',
        is_finished: false,
      })
      id.value += 1
    } else {
      histories[histories.length - 1].is_finished = true
    }
  },
  {
    immediate: true,
  },
)

const onExport = () => {
  const { saveAs, data } = useFileSystemAccess({})
  data.value = ''
  const formatted = useDateFormat(useNow(), 'YYYY-MM-DD_HH:mm:ss')
  for (const history of histories) {
    if (history.direction == 'left') {
      data.value += `GPT:\n${history.text}\n`
    } else {
      data.value += `You:\n${history.text}\n`
    }
  }
  saveAs({ suggestedName: `${formatted.value}.md` })
}
</script>

<template>
  <div class="main">
    <div class="chat-main">
      <div class="history">
        <DynamicScroller ref="chatScroller" :items="histories" :min-item-size="1" key-field="id" class="scroller">
          <template #default="{ item, index, active }">
            <DynamicScrollerItem :item="item" :active="active" :data-index="index" :size-dependencies="[item.text]">
              <chat-record-item :direction="item.direction" :key="index" :loading="!item.is_finished" :text="item.text" />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </div>
      <div class="edit">
        <var-loading type="wave" size="small" :loading="loading">
          <div style="display: flex; flex-direction: row; width: 100%">
            <var-input
              v-model="text"
              variant="outlined"
              style="width: 100%"
              :rows="4"
              placeholder="Cmd/Ctrl + Enter to send"
              :loading="true"
              textarea
            />
          </div>
          <template #description>
            <var-button>Cancel</var-button>
          </template>
        </var-loading>
      </div>
    </div>
  </div>
  <var-fab class="fab" :active="true" bottom="2em" inactive-icon="wrench">
    <var-button @click="onExport" type="info" :size="'large'" round>
      <var-icon name="download" size="30" />
    </var-button>
  </var-fab>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  max-height: calc(100vh - 54px - 71px - 2em);
  padding: 1em;
}

.history {
  overflow-y: hidden;

  height: 100%;
  padding: 1em;

  border: solid 1px rgb(128, 128, 128);
  border-bottom: none;
  border-radius: 3px;
}

.chat-main {
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1024px;
  height: 100%;
}

.edit {
  flex: 1;
}

.scroller {
  height: 100%;
  scrollbar-width: none; /* Firefox */
}

.scroller::-webkit-scrollbar {
  display: none;
}
</style>

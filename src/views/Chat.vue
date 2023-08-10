<script setup lang="ts">

import {nextTick, reactive, ref, watch} from "vue";
import {useMagicKeys, useScroll,} from '@vueuse/core'
import {useChatSubscription} from "@/composable/useService";
import {useAccessToken} from "@/composable/useAccessToken";

const text = ref("")

interface Record {
  id: number,
  text: string,
  direction: 'left' | 'right',
  is_finished: boolean
}

const histories = reactive<Record[]>([])

const keys = useMagicKeys()
const shiftCtrlA = keys['Command+Enter']

const scroll = ref<any | null>(null)
const {x, y, isScrolling, arrivedState, directions} = useScroll(scroll)

const {name} = useAccessToken()

const message = ref(`Hi,I'm ${name.value}`)

const id = ref(0)

watch(shiftCtrlA, (v) => {
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
      if (scroll.value) {
        scroll.value.scrollToItem(histories.length - 1)
      }
    })
  }
})



const {onResult, loading} = useChatSubscription(() => ({msg: message.value}), {})


onResult((e) => {
  histories[histories.length - 1].text += e.data!.chat;
})

watch(loading, (value) => {
  if (value) {
    histories.push({
      id: id.value + 1,
      text: text.value,
      direction: 'left',
      is_finished: false
    })
    id.value += 1
  } else {
    histories[histories.length - 1].is_finished = true
  }
}, {
  immediate: true
})
</script>

<template>
  <div class="main">
    <div class="chat-main">
      <div class="history">
        <DynamicScroller
            ref="scroll"
            :items="histories"
            :min-item-size="54"
            key-field="id"
            class="scroller"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
                :item="item"
                :active="active"
                :data-index="index"
                :size-dependencies="[
                  item.text,
                ]"
            >
              <chat-record-item :direction="item.direction"
                                :key="index"
                                :loading="!item.is_finished"
                                :text="item.text"/>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </div>
      <div class="edit">
        <var-loading type="wave" size="small" :loading="loading">
          <var-input v-model="text" variant="outlined" :rows="4" placeholder="Cmd/Ctrl + Enter to send" :loading="true"
                     textarea/>
          <template #description>
            <var-button>Cancel</var-button>
          </template>
        </var-loading>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding: 1em;
  max-height: calc(100vh - 54px - 71px - 2em);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.history {
  padding: 1em;
  border: solid 1px gray;
  border-radius: 3px;
  border-bottom: none;
  height: 100%;
  overflow-y: hidden;
}


.chat-main {
  max-width: 1024px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.edit {
  flex: 1;
}

.scroller {
  height: 100%;
}

.scroller::-webkit-scrollbar {
  display: none;
}
</style>
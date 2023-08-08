<script setup lang="ts">

import {nextTick, ref, watch} from "vue";
import {useMagicKeys, useScroll,} from '@vueuse/core'

const text = ref('')

interface Record {
  id: number,
  text: string,
  direction: 'left' | 'right'
}

const histories = ref<Record[]>([
  {
    id: 0,
    text: 'Hi',
    direction: 'left'
  }
])

const keys = useMagicKeys()
const shiftCtrlA = keys['Command+Enter']

const scroll = ref<any | null>(null)
const {x, y, isScrolling, arrivedState, directions} = useScroll(scroll)

const id = ref(0)
watch(shiftCtrlA, (v) => {
  if (v) {
    histories.value.push({
      id: id.value + 1,
      text: text.value,
      direction: 'right'
    })
    id.value += 1
    nextTick(() => {
      text.value = ''
      if (scroll.value){
        scroll.value.scrollToItem(histories.value.length-1)
      }
    })
  }
})

const active = ref(true)
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
                                :text="item.text"/>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>

      </div>
      <div class="edit">
        <var-input v-model="text" variant="outlined" :rows="4" placeholder="Cmd/Ctrl + Enter to send" textarea></var-input>
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
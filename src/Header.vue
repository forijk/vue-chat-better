<template>
  <div class="sc-header" :style="{background: colors.header.bg, color: colors.header.text}">
    <slot>
      <img class="sc-header--img" :src="imageUrl" />
      <div class="sc-header--title" v-tooltip="title"> {{curTitle}} </div>
    </slot>
    <div v-if="showSetButton" class="sc-header--close-button" @click="onSetting">
      <img src="./assets/setting.svg" alt="Setting" />
    </div>
    <div v-if="showCloseButton" class="sc-header--close-button" @click="onClose">
      <img :src="icons.close.img" :alt="icons.close.name" />
    </div>
  </div>
</template>
<script>

import CloseIcon from './assets/close-icon.svg'
import robotIcon from './assets/robot.svg'
import store from "./store/"

export default {
  props: {
    icons:{
      type: Object,
      default: function () {
        return {
          close:{
            img: CloseIcon,
            name: 'default',
          },
        }
      }
    },
    imageUrl: {
      type: [String, Object],
      default: robotIcon
    },
    title: {
      type: String,
      default: 'Chat'
    },
    onClose: {
      type: Function,
      required: true
    },
    onSetting: {
      type: Function,
      default: () =>{}
    },
    colors: {
      type: Object,
      required: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showSetButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    curTitle() {
      return store.isTyping ? 'Typing...' : this.title
    },
  }
}
</script>
<style scoped>
.sc-header {
  min-height: 75px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
  position: relative;
  box-sizing: border-box;
  display: flex;
}

.sc-header--img {
  border-radius: 50%;
  align-self: center;
  height: 34px;
  width: 34px;
  padding: 10px;
}

.sc-header--title {
  align-self: center;
  padding: 10px;
  flex: 1;
  user-select: none;
  font-size: 16px;
  max-width: 216px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.sc-header--close-button {
  width: 40px;
  align-self: center;
  height: 40px;
  margin-right: 0;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  margin-left: auto;
}

.sc-header--close-button:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, .1);
}

.sc-header--close-button img {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

@media (max-width: 450px) {
  .sc-header {
    border-radius: 0px;
  }
}
</style>

<template>
  <div class="wrap" ref="wrap" @mousedown="mouseDown">
    <div class="sc-launcher" ref="launcher" :class="{opened: isOpen}" @click.prevent="isOpen ? onClose() : openAndFocus()" :style="{backgroundColor: colors.launcher.bg}">
      <div v-if="newMessagesCount > 0 && !isOpen" class="sc-new-messsages-count">
        {{newMessagesCount}}
      </div>
      <img v-if="isOpen" class="sc-closed-icon" :src="closeIcon" />
      <img v-else class="sc-open-icon" :src="openIcon" />
    </div>
    <ChatWindow
      :showCloseButton="showCloseButton"
      :showSetButton="showSetButton"
      :messageList="msgList"
      :onUserInputSubmit="sendMsg"
      :title="title"
      :userIcon="userIcon"
      :robotIcon="robotIcon"
      :onMsgWasSent="onMsgWasSent"
      :titleImageUrl="titleImageUrl"
      :isOpen="isOpen"
      :onSetting="onSetting"
      :onClose="close"
      :placeholder="placeholder"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="disableUserListToggle"
      @scrollToTop="$emit('scrollToTop')"
      @remove="$emit('remove', $event)"
    >
      <template v-slot:header>
        <slot name="header">
        </slot>
      </template>
      <template v-slot:user-avatar="scopedProps">
        <slot name="user-avatar" :user="scopedProps.user" :message="scopedProps.message">
        </slot>
      </template>
      <template v-slot:text-message-body="scopedProps">
        <slot name="text-message-body" :message="scopedProps.message" :messageText="scopedProps.messageText" :messageColors="scopedProps.messageColors" :me="scopedProps.me">
        </slot>
      </template>
      <template v-slot:text-message-toolbox="scopedProps">
        <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me">
        </slot>
      </template>
      <template v-slot:template-message="scopedProps">
        <slot name="template-message" :message="scopedProps.message">
        </slot>
      </template>
    </ChatWindow>
  </div>
</template>
<script>
import ChatWindow from './ChatWindow.vue'
import store from "./store/"

import closeIcon from './assets/close-icon.png'
import openIcon from './assets/chat.svg'

export default {
  props: {
    onSetting: {
      type: Function,
      default: () =>{}
    },
    onMsgWasSent: {
      type: Function,
      default: () =>{}
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showSetButton: {
      type: Boolean,
      default: true
    },
    openIcon: {
      type: [Object, String],
      default: openIcon
    },
    userIcon: {
      type: [Object, String],
      default: () =>{}
    },
    robotIcon: {
      type: [Object, String],
      default: () =>{}
    },
    title: {
      type: String,
      default: 'vue-chat-better 😋'
    },
    titleImageUrl: {
      type: [String, Object],
    },
    messageList: {
      type: Array,
      default: () => []
    },
    newMessagesCount: {
      type: Number,
      default: () => 0
    },
    placeholder: {
      type: String,
      default: 'Write a message...'
    },
    colors: {
      type: Object,
      required: false,
      validator: c =>
        'header' in c
        && 'bg' in c.header
        && 'text' in c.header
        && 'launcher' in c
        && 'bg' in c.launcher
        && 'messageList' in c
        && 'bg' in c.messageList
        && 'sentMessage' in c
        && 'bg' in c.sentMessage
        && 'text' in c.sentMessage
        && 'receivedMessage' in c
        && 'bg' in c.receivedMessage
        && 'text' in c.receivedMessage
        && 'userInput' in c
        && 'bg' in c.userInput
        && 'text' in c.userInput,
      default: function () {
        return {
          header: {
            bg: '#4e8cff',
            text: '#ffffff'
          },
          launcher: {
            bg: '#4e8cff'
          },
          messageList: {
            bg: '#ffffff'
          },
          sentMessage: {
            bg: '#4e8cff',
            text: '#ffffff'
          },
          receivedMessage: {
            bg: '#eaeaea',
            text: '#222222'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        }
      }
    },
    alwaysScrollToBottom: {
      type: Boolean,
      default: () => true
    },
    disableUserListToggle: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      closeIcon,
      firstTime: 0,
      lastTime: 0,
      isOpen: false,
      alreadyExist: false
    }
  },
  computed: {
    msgList() {
      if (!this.alreadyExist) {
        this.alreadyExist = true;
        return store.messageList = this.messageList.concat(store.messageList);
      }
      return store.messageList
    }
  },
  mounted() {
    this.$refs.launcher.onmousedown = () => {
      this.firstTime = new Date().getTime();
    };
    this.$refs.launcher.onmouseup = () => {
      this.lastTime = new Date().getTime();
    };
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    open() {
      this.isOpen = true;
    },
    sendMsg(message) {
      store.messageList = [...store.messageList, Object.assign({}, message, {id: Math.random()})]
    },
    onClose() {
      if ((this.lastTime - this.firstTime) > 200) return;
      this.close();
    },
    openAndFocus() {
      if ((this.lastTime - this.firstTime) > 200) return;
      this.open();
      this.$root.$emit('focusUserInput');
    },
    mouseDown(e) {
      const target = this.$refs.wrap;
      const currentX = e.clientX;
      const currentY = e.clientY
      const left = parseInt(this.getAttr(target, 'left'));
      const top = parseInt(this.getAttr(target, 'top'));
      document.onmousemove = (event) => {
        // 鼠标移动时计算每次移动的距离，并改变拖拽元素的定位
        const disX = event.clientX - currentX;
        const disY = event.clientY - currentY;
        target.style.left = `${left + disX}px`;
        target.style.top = `${top + disY}px`;
        // 阻止事件的默认行为，可以解决选中文本的时候拖不动
        return false;
      }
      // 鼠标松开时，拖拽结束
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    getAttr(obj, key) {
      return obj.currentStyle ? obj.currentStyle[key] : window.getComputedStyle(obj, false)[key]
    }
  },
  components: {
    ChatWindow
  }
}
</script>
<style scoped>
.wrap {
  position: fixed;
  width: 0;
  height: 0;
  right: 25px;
  bottom: 25px;
  z-index: 9999;
}

.sc-launcher {
  width: 70px;
  height: 70px;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  right: 25px;
  bottom: 25px;
  border-radius: 50%;
  box-shadow: none;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
  z-index: 9999;
}

.sc-launcher:before {
  content: '';
  position: relative;
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out;
}

.sc-launcher .sc-open-icon,
.sc-launcher .sc-closed-icon {
  width: 70px;
  height: 70px;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
}

.sc-launcher .sc-closed-icon {
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
  width: 70px;
  height: 70px;
}

.sc-launcher .sc-open-icon {
  padding: 20px;
  box-sizing: border-box;
  opacity: 1;
}

.sc-launcher.opened .sc-open-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened .sc-closed-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened:before {
  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
}

.sc-launcher:hover {
  box-shadow: 0 0px 27px 1.5px rgba(0,0,0,0.2);
}

.sc-new-messsages-count {
  position: absolute;
  top: -3px;
  left: 41px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
	width: 22px;
  height: 22px;
  background: #ff4646;
  color: white;
  text-align: center;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}
</style>

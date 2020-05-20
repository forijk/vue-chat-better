<template>
  <div class="sc-chat-window" :class="{opened: isOpen, closed: !isOpen}">
    <Header
      :showCloseButton="showCloseButton"
      :showSetButton="showSetButton"
      :title="title"
      :imageUrl="titleImageUrl"
      :onClose="onClose"
      :onSetting="onSetting"
      :colors="colors"
    >
      <template>
        <slot name="header">
        </slot>
      </template>
    </Header>
    <MessageList
      :messages="messages"
      :userIcon="userIcon"
      :robotIcon="robotIcon"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      @scrollToTop="$emit('scrollToTop')"
      @remove="$emit('remove', $event)"
    >
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
    </MessageList>
    <UserInput
      :onSubmit="onUserInputSubmit"
      :onMsgWasSent="onMsgWasSent"
      :suggestions="getSuggestions()"
      :placeholder="placeholder"
      :colors="colors" />
  </div>
</template>

<script>
import Header from './Header.vue'
import MessageList from './MessageList.vue'
import UserInput from './UserInput.vue'

export default {
  components: {
    Header,
    MessageList,
    UserInput
  },
  props: {
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showSetButton: {
      type: Boolean,
      default: true
    },
    userIcon: {
      type: [Object, String],
      default: () =>{}
    },
    robotIcon: {
      type: [Object, String],
      default: () =>{}
    },
    onMsgWasSent: {
      type: Function,
      default: () =>{}
    },
    title: {
      type: String
    },
    titleImageUrl: {
      type: [String, Object],
    },
    onUserInputSubmit: {
      type: Function,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    onSetting: {
      type: Function,
      default: () =>{}
    },
    messageList: {
      type: Array,
      default: () => []
    },
    isOpen: {
      type: Boolean,
      default: () => false
    },
    placeholder: {
      type: String,
      default: 'Write a message...'
    },
    colors: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    messages() {
      let messages = this.messageList
      return messages
    }
  },
  methods: {
    getSuggestions(){
      return this.messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
    }
  }
}
</script>
<style scoped>
.sc-chat-window {
  width: 370px;
  height: 590px;
  position: absolute;
  right: 25px;
  bottom: 100px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  animation: fadeIn;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  z-index: 9999;
}

.sc-chat-window.closed {
  opacity: 0;
  display: none;
  bottom: 90px;
}

@keyframes fadeIn {
  0% {
    display: none;
    opacity: 0;
  }

  100% {
    display: flex;
    opacity: 1;
  }
}

.sc-message--me {
  text-align: right;
}
.sc-message--them {
  text-align: left;
}

@media (max-width: 450px) {
  .sc-chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }
  .sc-chat-window {
    transition: 0.1s ease-in-out;
  }
  .sc-chat-window.closed {
    bottom: 0px;
  }
}
</style>

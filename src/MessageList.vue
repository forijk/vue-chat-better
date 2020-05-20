<template>
  <div class="sc-message-list" ref="scrollList" :style="{backgroundColor: colors.messageList.bg}" @scroll="handleScroll">
    <Message v-for="(message, idx) in messages" :message="message" :user="profile(message.author)" :key="idx" :colors="colors" @remove="$emit('remove', message)">
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
    </Message>
    <Message v-show="store.isTyping" :message="{author: 'system', type: 'typing'}" :user="{}" :colors="colors" />
  </div>
</template>
<script>
import Message from './Message.vue'
import store from "./store/"

export default {
  components: {
    Message
  },
  props: {
    userIcon: {
      type: [Object, String],
      default: () =>{}
    },
    robotIcon: {
      type: [Object, String],
      default: () =>{}
    },
    messages: {
      type: Array,
      required: true
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
  data () {
    return {
      store
    }
  },
  methods: {
    _scrollDown () {
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
    },
    handleScroll (e) {
        if (e.target.scrollTop === 0) {
            this.$emit('scrollToTop')
        }
    },
    shouldScrollToBottom() {
      return this.alwaysScrollToBottom || (this.$refs.scrollList.scrollTop > this.$refs.scrollList.scrollHeight - 600)
    },
    profile(author) {
      const profile = this.participants.find(profile => profile.id === author)

      return profile || {}
    }
  },
  mounted () {
    this.$nextTick(this._scrollDown())
  },
  computed: {
    participants() {
      return [
        {
          id: 'robot',
          name: 'Robot',
          imageUrl: this.robotIcon
        },
        {
          id: 'me',
          name: 'Me',
          imageUrl: this.userIcon
        }
      ]
    }
  },
  updated () {
    if (this.shouldScrollToBottom())
      this.$nextTick(this._scrollDown())
  }
}
</script>

<style scoped>
.sc-message-list {
  height: 80%;
  overflow-y: auto;
  background-size: 100%;
  padding: 40px 0px;
}
</style>

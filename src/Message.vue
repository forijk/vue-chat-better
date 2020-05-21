<template>
  <div class="sc-message">
    <div class="sc-message--content" :class="{
        sent: message.author === 'me',
        received: message.author !== 'me' && message.type !== 'system',
        system: message.type === 'system'
      }">
      <slot 
        name="user-avatar"
        :message="message" 
        :user="user">
          <div v-if="message.type !== 'system'" :title="authorName" class="sc-message--avatar" :style="{
            backgroundImage: `url(${robotChatImage})`
          }" v-tooltip="authorName"></div>
      </slot>

      <TextMessage 
        v-if="message.type === 'text'" 
        :message="message" 
        :messageColors="determineMessageColors()" 
        @remove="$emit('remove')">
          <template v-slot:default="scopedProps">
            <slot name="text-message-body" :message="scopedProps.message" :messageText="scopedProps.messageText" :messageColors="scopedProps.messageColors" :me="scopedProps.me">
            </slot>
          </template>
          <template v-slot:text-message-toolbox="scopedProps">
            <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me">
            </slot>
          </template>
      </TextMessage>
      <TypingMessage v-else-if="message.type === 'typing'" :messageColors="determineMessageColors()" />
      <TemplateMessage v-else-if="message.type === 'template'" :message="message" :messageColors="determineMessageColors()">
        <slot name="template-message" :message="message">
        </slot>
      </TemplateMessage>
      <SystemMessage v-else-if="message.type === 'system'" :data="message.data" :messageColors="determineMessageColors()" />
      <slot 
        name="user-avatar"
        :message="message" 
        :user="user">
          <div v-if="message.author === 'me'" :title="authorName" class="sc-message--avatar-me" :style="{
            backgroundImage: `url(${userChatImage})`
          }" v-tooltip="authorName"></div>
      </slot>
    </div>
  </div>
</template>

<script>
import TextMessage from './messages/TextMessage.vue'
import TemplateMessage from './messages/TemplateMessage.vue'
import TypingMessage from './messages/TypingMessage.vue'
import SystemMessage from './messages/SystemMessage.vue'
import robotIcon from './assets/robot.svg'
import userIcon from './assets/user.svg'

export default {
  components: {
    TextMessage,
    TemplateMessage,
    TypingMessage,
    SystemMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    sentColorsStyle() {
      return {
        color: this.colors.sentMessage.text,
        backgroundColor: this.colors.sentMessage.bg
      }
    },
    receivedColorsStyle() {
      return {
        color: this.colors.receivedMessage.text,
        backgroundColor: this.colors.receivedMessage.bg
      }
    },
    determineMessageColors() {
      return this.message.author === 'me' ? this.sentColorsStyle() : this.receivedColorsStyle()
    }
  },
  computed:{
    authorName(){
      return this.user && this.user.name;
    },
    userChatImage(){
      return (this.user && this.user.imageUrl) || userIcon;
    },
    robotChatImage(){
      return (this.user && this.user.imageUrl) || robotIcon;
    }
  }
}
</script>
<style>
.sc-message {
  word-break: break-word;
  width: 95%;
  margin: auto;
  padding-bottom: 10px;
  display: flex;
}
.sc-message .sc-message--edited {
  opacity: 0.7;
  word-wrap: normal;
  font-size: xx-small;
  text-align: center;
}

.sc-message--content {
  width: 100%;
  display: flex;
}

.sc-message--content.sent {
  justify-content: flex-end;
}

.sc-message--content.system {
  justify-content: center;
}

.sc-message--content.sent .sc-message--avatar {
  display: none;
}

.sc-message--avatar-me {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  align-self: center;
  margin-left: 10px;
}

.sc-message--avatar {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  align-self: center;
  margin-right: 10px;
}

@media (max-width: 450px) {
  .sc-message {
    width: 80%;
  }
}
.sc-message--text {
  padding: 5px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  -webkit-font-smoothing: subpixel-antialiased;
}
.sc-message--text .sc-message--text-body .sc-message--text-content {
  white-space: pre-wrap;
}
.sc-message--text:hover .sc-message--toolbox {
  left: -20px;
  opacity: 1;
}
.sc-message--text .sc-message--toolbox {
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  transition: left 0.2s ease-out 0s;
  white-space: normal;
  opacity: 0;
  position: absolute;
  left: 0px;
  width: 25px;
  top: 0;
}
.sc-message--text .sc-message--toolbox button {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.sc-message--text .sc-message--toolbox button:focus {
  outline: none;
}

.sc-message--content.sent .sc-message--text {
  color: white;
  background-color: #4e8cff;
  max-width: calc(100% - 120px);
  word-wrap: break-word;
}

.sc-message--text code {
  font-family: "Courier New", Courier, monospace !important;
}

.sc-message--content.received .sc-message--text {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.tooltip {
  display: block !important;
  z-index: 10000;
}
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}
.tooltip[x-placement^=top] {
  margin-bottom: 5px;
}
.tooltip[x-placement^=top] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^=bottom] {
  margin-top: 5px;
}
.tooltip[x-placement^=bottom] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^=right] {
  margin-left: 5px;
}
.tooltip[x-placement^=right] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[x-placement^=left] {
  margin-right: 5px;
}
.tooltip[x-placement^=left] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[aria-hidden=true] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}
.tooltip[aria-hidden=false] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
.tooltip.info .tooltip-inner {
  background: rgba(0, 68, 153, 0.9);
  color: white;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
}
.tooltip.info .tooltip-arrow {
  border-color: rgba(0, 68, 153, 0.9);
}
.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
}
.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}
</style>

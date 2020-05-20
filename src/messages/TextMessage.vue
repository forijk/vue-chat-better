<template>
  <div class="sc-message--text" :style="messageColors">
    <div class="arrow-right" v-if="me && message.id != null && message.id != undefined" :style="{'border-left-color': messageColors.backgroundColor}"></div>
    <div class="arrow-left" :style="{'border-right-color': messageColors.backgroundColor}" v-else></div>
    <template>
      <div class="sc-message--toolbox" :style="{background: messageColors.backgroundColor}">
        <button v-if="me && message.id != null && message.id != undefined" @click="edit" :disabled="isEditing">
          <icon-copy :color="isEditing? 'black': messageColors.color" width="12" icon-name="copy">
          </icon-copy>
        </button>
        <slot name="text-message-toolbox" :message="message" :me="me">
        </slot>
      </div>
    </template>
    <slot :message="message" :messageText="messageText" :messageColors="messageColors" :me="me">
      <p class="sc-message--text-content" v-html="messageText"></p>
    </slot>
  </div>
</template>

<script>
import IconCopy from './../components/IconCopy.vue'
import escapeGoat from 'escape-goat'
import Autolinker from 'autolinker'
import store from "./../store/"
const fmt = require('msgdown')

export default {
  data() {
    return {
      store,
      messageStyling: true
    }
  },
  props: {
    message:{
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    }
  },
  computed: {
    messageText() {
      const escaped = escapeGoat.escape(this.message.data.text)
      return Autolinker.link(this.messageStyling ? fmt(escaped) : escaped, {
        className: 'chatLink',
        truncate: { length: 50, location: 'smart' }
      })
    },
    me(){
      return this.message.author === 'me';
    },
    isEditing() {
      return (store.editMessage && store.editMessage.id) == this.message.id;
    }
  },
  methods:{
    edit() {
      this.store.editMessage = this.message;
    }
  },
  components:{
    IconCopy
  }
}
</script>

<style scoped>
a.chatLink {
  color: inherit !important;
}
.sc-message--text-content{
  white-space: pre-wrap;
  text-align: left;
  position: relative;
}
.arrow-right {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left-width: 5px;
  border-left-style: solid;
  border-bottom: 5px solid transparent;
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
}
.arrow-left {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-right-width: 5px;
  border-right-style: solid;
  border-bottom: 5px solid transparent;
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
}
</style>

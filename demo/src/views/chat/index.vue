<template>
  <div :style="{background: backgroundColor}">
    <Header
      :chosenColor="chosenColor"
      :colors="colors"
    />
    <vue-chat 
      :onSetting="onSetting"
      :colors="colors"
      :title="title"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :onMsgWasSent="onMsgWasSent"
      ref="chat"
    >
      <template v-slot:text-message-toolbox="scopedProps">
        <button v-if="!scopedProps.me && scopedProps.message.type==='text'" @click.prevent="like(scopedProps.message.id)">
          👍
        </button>
      </template>
      <template v-slot:text-message-body="scopedProps"> 
        <p class="sc-message--text-content" v-html="scopedProps.messageText"></p>
        <p v-if="scopedProps.message.liked" class='sc-message--edited'>
          <template v-if="scopedProps.message.liked">👍</template>
        </p>
      </template>
      <template v-slot:template-message="scopedProps">
        <div>自定义回复消息模板</div>
        <p style="color: red;">欢迎使用</p>
        <p style="color: red;">vue-chat-better</p>
        <p>
          <input type="button" value="示例按钮" @click="testClick" />
        </p>
        <div>回传消息：{{ scopedProps.message.data.text }}</div>
      </template>
    </vue-chat>
    <p class="text-center toggle">
      <a
        :style="{color: linkColor}"
        @click.prevent="openChat()"
        href="#"
        v-if="!isChatOpen"
      >Open the chat window</a>
      <a
        :style="{color: linkColor}"
        @click.prevent="closeChat()"
        href="#"
        v-else
      >Close the chat window</a>
    </p>
    <p class="text-center colors">
      <a
        :style="{background: availableColors.blue.launcher.bg}"
        @click.prevent="setColor('blue')"
        href="#"
      >Blue</a>
      <a
        :style="{background: availableColors.red.launcher.bg}"
        @click.prevent="setColor('red')"
        href="#"
      >Red</a>
      <a
        :style="{background: availableColors.green.launcher.bg}"
        @click.prevent="setColor('green')"
        href="#"
      >Green</a>
      <a
        :style="{background: availableColors.dark.launcher.bg}"
        @click.prevent="setColor('dark')"
        href="#"
      >Dark</a>
    </p>
    <TestArea
      :chosenColor="chosenColor"
      :colors="colors"
      :onMessage="sendMessage"
    />
  </div>
</template>

<script>
import messageHistory from './messageHistory'
import TestArea from './TestArea.vue'
import Header from './Header.vue'
import availableColors from './colors'

export default {
  name: 'app',
  components: {
    TestArea,
    Header
  },
  data() {
    return {
      messageList: messageHistory,
      newMessagesCount: 0,
      isChatOpen: false,
      title: '测试标题如果过长会显示省略号',
      colors: null,
      availableColors,
      chosenColor: null
    }
  },
  created() {
    this.setColor('blue')
  },
  methods: {
    onMsgWasSent(msg) {
      // 试试调用 API 吧
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(msg)
          resolve()
        }, 2000)
      })
    },
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1
        this.$refs.chat.sendMsg({
          author: 'robot',
          type: 'text',
          id: Math.random(),
          data: { text }
        })
      }
    },
    openChat() {
      this.$refs.chat.open()
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat() {
      this.$refs.chat.close()
      this.isChatOpen = false
    },
    onSetting() {
      alert('Test Setting ~~~');
    },
    setColor(color) {
      this.colors = this.availableColors[color]
      this.chosenColor = color
    },
    testClick() {
      alert('Test click ~~~');
    },
    like(id){
      alert('Test like ~~~');
    }
  },
  computed: {
    linkColor() {
      return this.chosenColor === 'dark'
        ? this.colors.sentMessage.text
        : this.colors.launcher.bg
    },
    backgroundColor() {
      return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
    }
  }
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}

* {
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
}

.demo-description {
  max-width: 500px;
}

.demo-description img {
  max-width: 500px;
}

.demo-test-area {
  width: 300px;
  box-sizing: border-box;
}

.demo-test-area--text {
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  padding: 0px;
  resize: none;
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
  background: #fafbfc;
  color: #8da2b5;
  border: 1px solid #dde5ed;
  font-size: 16px;
  padding: 16px 15px 14px;
  margin: 0;
  border-radius: 6px;
  outline: none;
  height: 150px;
  margin-bottom: 10px;
}

.demo-monster-img {
  width: 400px;
  display: block;
  margin: 60px auto;
}

.text-center {
  text-align: center;
}

.colors a {
  color: #fff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 10px;
}

.toggle a {
  text-decoration: none;
}
</style>

# vue-chat-better

vue、chat、draggable、async message.

`vue-chat-better` is a simple and beautiful Vue chat component that allows you to build and add custom live chat to your sites. It includes only the vue chat widget and the view component. There is no backend, and no communication system baked in.

Features: Custom message templates, draggable window, async messages and so on.

[Online Demo](https://forijk.github.io/)

## Installation

```shell
$ yarn add vue-chat-better
```

## Example

```javascript
import Chat from 'vue-chat-better'
Vue.use(Chat)
```

```html
<template>
  <div>
    <vue-chat 
      :onSetting="onSetting"
      :title="title"
      :onMsgWasSent="onMsgWasSent"
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
  </div>
</template>
```

```javascript

export default {
  data() {
    return {
      title: '测试标题如果过长会显示省略号',
    }
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
    onSetting() {
      alert('Test Setting ~~~');
    },
    testClick() {
      alert('Test click ~~~');
    },
    like(id) {
      alert('Test like ~~~');
    }
  }
}
```

For more detailed examples see the demo folder.

## Acknowledgements

[vue-beautiful-chat](https://github.com/mattmezza/vue-beautiful-chat)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

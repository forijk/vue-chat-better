<template>
  <div>
    <Suggestions :suggestions="suggestions" v-on:sendSuggestion="_submitSuggestion" :colors="colors"/>
    <form class="sc-user-input" :class="{active: inputActive}" :style="{background: colors.userInput.bg}">
      <div
        role="button"
        tabIndex="0"
        @focus="setInputActive(true)"
        @blur="setInputActive(false)"
        @keydown="handleKey"
        contentEditable="true"
        :placeholder="placeholder"
        class="sc-user-input--text"
        ref="userInput"
        :style="{color: colors.userInput.text}"
        @focusUserInput="focusUserInput()"
      >
      </div>
      <div class="sc-user-input--buttons">
        <div v-if="isEditing" class="sc-user-input--button">
          <user-input-button @click.native.prevent="_editFinish" :color="colors.userInput.text" tooltip="cancel">
            <icon-cross />
          </user-input-button>
        </div>
        <div class="sc-user-input--button">
          <user-input-button @click.native.prevent="_editText" v-if="isEditing" :color="colors.userInput.text" tooltip="Edit">
            <icon-ok />
          </user-input-button>
          <user-input-button @click.native.prevent="_submitText" v-else :color="colors.sentMessage.bg" tooltip="Send">
            <icon-send />
          </user-input-button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import UserInputButton from './UserInputButton.vue'
import Suggestions from './Suggestions.vue'
import store from "./store/"
import IconCross from "./components/icons/IconCross.vue";
import IconOk from "./components/icons/IconOk.vue";
import IconSend from "./components/icons/IconSend.vue";

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds(),
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};

export default {
  components: {
    UserInputButton,
    Suggestions,
    IconCross,
    IconOk,
    IconSend
  },
  props: {
    suggestions: {
      type: Array,
      default: () => []
    },
    onMsgWasSent: {
      type: Function,
      default: () =>{}
    },
    onSubmit: {
      type: Function,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Write something...'
    },
    colors: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      inputActive: false,
      store
    }
  },
  methods: {
    preSubmit(fn, msg) {
      fn(msg)
      this.store.isTyping = true;
      try {
        this.onMsgWasSent(msg.data.text).then(() => {
          this.robotSend(fn, msg.data.text)
          this.store.isTyping = false;
        })
      } catch (error) {
        this.store.isTyping = false;
        this.onMsgWasSent(msg.data.text)
        this.robotSend(fn, msg.data.text)
      }
    },
    robotSend(fn, text) {
      fn({
        type: 'system',
        data: { text: new Date().format('yyyy-MM-dd hh:mm:ss') }
      })
      fn({
        author: 'robot',
        type: 'template',
        data: { text }
      })
    },
    setInputActive (onoff) {
      this.inputActive = onoff
    },
    handleKey (event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        if (!this.isEditing){
          this._submitText(event);
        }
        else{
          this._editText(event);
        }
        this._editFinish();
        event.preventDefault()
      }
      else if (event.keyCode === 27) {
        this._editFinish();
        event.preventDefault();
      }
    },
    focusUserInput() {
      this.$nextTick(() => {
        this.$refs.userInput && this.$refs.userInput.focus();
      })
    },
    _submitSuggestion(suggestion) {
      this.preSubmit(this.onSubmit, {author: 'me', type: 'text', data: { text: suggestion }})
    },
    _submitText (event) {
      const text = this.$refs.userInput.textContent
      if (text && text.length > 0) {
        this.preSubmit(this.onSubmit, {
          author: 'me',
          type: 'text',
          data: { text }
        });
        this.$refs.userInput.innerHTML = ''
      }
    },
    _editText (event) {
      const text = this.$refs.userInput.textContent;
      if (text && text.length) {
        this.preSubmit(this.onSubmit, {
          author: 'me',
          type: 'text',
          data: { text }
        });
        this._editFinish();
      }
    },
    _editFinish(){
      this.store.editMessage = null;
    }
  },
  watch: {
    editMessageId(m){
      if (store.editMessage != null && store.editMessage != undefined){
        this.$refs.userInput.focus();
        this.$refs.userInput.textContent = store.editMessage.data.text;
      } else {
        this.$refs.userInput.textContent = '';
      }
    }
  },
  computed: {
    editMessageId() {
      return this.isEditing && store.editMessage.id;
    },
    isEditing() {
      return store.editMessage
    }
  },
  mounted() {
    this.$root.$on('focusUserInput', () => {
      this.focusUserInput()
    })
  }
}
</script>

<style>
.sc-user-input {
  text-align: left;
  min-height: 55px;
  margin: 0px;
  position: relative;
  bottom: 0;
  display: flex;
  background-color: #f4f7f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.sc-user-input--text {
  width: 100%;
  margin-right: 32px;
  resize: none;
  border: none;
  outline: none;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  padding: 18px;
  padding-right: 0;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  max-height: 200px;
  overflow: scroll;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.sc-user-input--text:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  /* color: rgba(86, 88, 103, 0.3); */
  filter: contrast(15%);
  outline: none;
  cursor: text;
}

.sc-user-input--buttons {
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sc-user-input--button {
  width: 22px;
  height: 55px;
  margin-left: 2px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sc-user-input.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
}

.sc-user-input--button label {
  position: relative;
  height: 24px;
  padding-left: 3px;
  cursor: pointer;
}

.sc-user-input--button label:hover path {
  fill: rgba(86, 88, 103, 1);
}

.sc-user-input--button input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99999;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
}
</style>

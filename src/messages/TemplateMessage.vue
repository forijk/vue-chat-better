<template>
  <div class="sc-message--text template" :style="messageColors">
    <div class="arrow-left"></div>
    <slot :message="message" :messageColors="messageColors" :me="me">
      <p>Default message.</p>
    </slot>
  </div>
</template>

<script>

export default {
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
    me(){
      return this.message.author === 'me';
    }
  }
}
</script>

<style scoped>
.template {
  text-align: left;
}

.arrow-left {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-right: 5px solid rgb(234, 234, 234);
  border-bottom: 5px solid transparent;
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
}
</style>

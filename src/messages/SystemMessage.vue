<template>
  <div class="sc-message--system" :style="messageColors">
    <slot :message="data">
      <p v-if="data.text" class='sc-message--meta' :style="{color: messageColors.color}">{{data.text}}</p>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.sc-message--system {
  padding: 4px;
  border-radius: 4px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.2;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;
  opacity: .55;
}

.sc-message--meta {
  font-size: xx-small;
  margin-bottom: 0px;
  margin-top: 0;
  opacity: .5;
  text-align: center;
}
</style>

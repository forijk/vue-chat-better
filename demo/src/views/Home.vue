<template>
  <div class="home">
    <chat />
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from './chat/index.vue'

export default {
  name: 'Home',
  components: {
    Chat
  }
}
</script>

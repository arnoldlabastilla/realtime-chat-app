<template>
  <div id="app">
    <Chat msg="Real-time Chat"/>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    Chat
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 18px;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

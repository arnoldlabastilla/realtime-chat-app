<template>
  <div>
    <h1>{{ msg }}</h1>

    <input type="text" v-model="content" v-on:keyup.enter="send" />

    <template v-if="messages.length">
      <div v-for="message in messages" :key="`message-${message.id}`">
        <div class="message">
          <div class="sender">{{ message.sender.name }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Chat',

  props: {
    msg: String
  },

  data() {
    return {
      messages: [],
      content: ''
    }
  },

  created() {
    this.load()
  },

  mounted() {
    window.Echo.channel('conversations')
      .listen('MessageSent', (message) => {
        this.messages = [message, ...this.messages]
      })
  },

  methods: {
    load() {
      window.axios.get('/messages', { params: { conversation_id: 1 } })
        .then((response) => {
          this.messages = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    send() {
      window.axios.post('/messages', { conversation_id: 1, content: this.content })
        .then((response) => {
          this.content = ''
          console.log(`Message API: ${response.data.success}`)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

input {
  margin: 0 0 0.5rem 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  border-color: #6b7280;
  border-width: 1px;
  border-radius: 10px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.message {
  padding: 1rem;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-bottom: 0.5rem;
}
.message .sender {
  font-weight: bold;
}
.message .content {

}
</style>

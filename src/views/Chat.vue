<template>
  <div>
    <h1>Real-time Chat</h1>

    <div class="input-container">
      <input type="text" v-model="content" v-on:keyup.enter="send" />
    </div>

    <template v-if="messages.length">
      <div v-for="message in messages" :key="`message-${message.id}`">
        <div class="message">
          <div class="sender">{{ message.sender.email == email ? 'Me' : message.sender.name }}:</div>
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
      content: '',
      email: ''
    }
  },

  created() {
    this.email = localStorage.getItem('email')
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

<style scoped>
h1 {
  text-align: center;
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

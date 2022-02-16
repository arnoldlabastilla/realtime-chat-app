<template>
  <div class="home">
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button type="button" v-on:click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login() {
      window.axios.post('/auth/login', { email: this.email, password: this.password })
        .then((response) => {
          localStorage.setItem('token', response.data.access_token)
          localStorage.setItem('email', response.data.user.email)
          this.$router.push('/chat')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>

</style>

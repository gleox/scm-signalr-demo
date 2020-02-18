<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  </div>
</template>

<script>
import { hubConnection } from 'signalr-no-jquery';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  methods: {
    async getUser() {
      const res = await fetch(
        'api/User/GetCurrent', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({})
        })
      if (res.status === 204) {
        return null
      }

      const user = await res.json()
      return user
    },

    async login() {
      await fetch('api/User/SignIn', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            UserName: 'root',
            Password: 'znl2233'
          })
      })
    },

    async runSignalR() {
      const connection = hubConnection()
      const chatHub = connection.createHubProxy('ChatHub')

      chatHub.on('sendText', text => {
        console.log('sendText', text)
      })

      const connect = connection.start({
        transport: 'longPolling'
      })


      async function sendText() {
        await chatHub.invoke('sendText', 'hello')
      }

      await connect
      console.log('Connection started!')
      sendText()
    }
  },

  async created() {
    const user = await this.getUser()
    if (!user) {
      await this.login()
    }

    this.runSignalR()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

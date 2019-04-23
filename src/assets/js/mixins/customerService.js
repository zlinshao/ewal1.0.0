const customerService = {
  data() {
    return {
      market_server: globalConfig.market_server
    }
  },
  methods: {
    getTodoList() {
      // this.$http
      //   .get(`${this.market_server}v1.0/market/contract/`)
      //   .then(res => {
      //   })
    },
    handleCreateTodo() {}
  }
}

export default customerService

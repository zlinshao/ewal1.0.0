<template>
  <div id="login">
    <div>
      登录
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {}
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/login/index.scss";

  #theme_name {
    #login {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $color2F2;
      z-index: 42;
    }
  }

  #theme_name.theme1 {
    #login {

    }
  }

  #theme_name.theme2 {
    #login {

    }
  }

  #theme_name.theme3 {
    #login {

    }
  }

  #theme_name.theme4 {
    #login {

    }
  }
</style>

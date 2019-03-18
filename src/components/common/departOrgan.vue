<template>
  <div id="departOrgan">
    <lj-dialog
      :visible="depart_visible"
      :size="depart_size"
      @close="handleCloseLjDialog">

    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from './lj-dialog.vue';

  export default {
    name: "depart-organ",
    components: {ljDialog},
    props: ['module', 'organData'],
    data() {
      return {
        depart_visible: false,
        depart_size: {},
        departList: [],
        configure: {}
      }
    },
    mounted() {
      this.getList();
    },
    activated() {
    },
    watch: {
      module(val) {
        this.depart_visible = val;
        this.depart_size = {
          width: '600px',
          height: '800px'
        }
      },
      organData: {
        handler(val, oldVal) {
          this.configure.num = val ? (val.num ? val.num : '') : '';
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      handleCloseLjDialog() {
        this.$emit('close', 'close');
      },
      getList(org = 1) {
        this.departList = [];
        this.fullLoading = true;
        this.$http.getOrganization(org).then(res => {
          if (res.code === '20000') {
            this.departList = res.data.data;
          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common/departOrgan.scss";

  @mixin organImg($m, $n) {
    $url: '../../assets/image/departOrgan/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #departOrgan {

    }
  }

  #theme_name.theme2 {
    #departOrgan {

    }
  }

  #theme_name.theme3 {
    #departOrgan {

    }
  }

  #theme_name.theme4 {
    #departOrgan {

    }
  }
</style>

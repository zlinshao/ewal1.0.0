<template>
  <LjDialog :visible="add_visible" :size="{width: 480 + 'px',height: 310 + 'px'}" @close="handleCloseAdd" id='add_dailog'>
    <div class='dialog_container'>
      <div class="dialog_main">
        <div class='img_box'></div>
        <p class='words'>添加</p>
        <p class='notice'>确定要添加吗?</p>
      </div>
      <div class="dialog_footer">
        <el-button type="danger" size="small" @click="handleCloseAddOrder">新增</el-button>
        <el-button type="info" size="small" @click="handleCloseAdd">取消</el-button>
      </div>
    </div>
  </LjDialog>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
export default {
  components: { LjDialog },
  props: ['add_visible'],
  methods: {
    handleCloseAdd () {
      this.$emit('close', false)
    },
    handleCloseAddOrder () {
      this.$emit('close', true)
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/common.scss";

@mixin backgroundImg($m, $n) {
  $url: "../../../assets/image/customService/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name {
  #add_dailog {
    .dialog_main {
      @include flex("items-column");
      .img_box {
        width: 60px;
        height: 60px;
      }
      .words {
        font-size: 22px;
        text-align: center;
        margin-top: 7px;
      }
      .notice {
        font-size: 18px;
        margin-top: 15px;
      }
    }
  }
}

#theme_name.theme1 {
  #add_dailog {
    .img_box {
      @include backgroundImg("add.png", "theme1");
    }
    .words {
      color: #2ecf74;
    }
    .notice {
      color: #686874;
    }
  }
}

#theme_name.theme2 {
  #delete_dailog {
  }
}

#theme_name.theme3 {
  #delete_dailog {
  }
}

#theme_name.theme4 {
  #delete_dailog {
  }
}
</style>



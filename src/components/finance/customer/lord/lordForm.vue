<template>
  <el-form :model="form" size="mini" ref="formData">
    <el-row type="flex" class="row-bg" justify="space-between" style="flex-wrap: wrap">

        <el-form-item v-for="(item,index) in lordForm" :key="index" :prop="item.prop">
          <div class="form_item_container">
            <div class="item_label">
              <b class="item_icons">
                <i class="icon_account"></i>
              </b>
              <span>{{item.label}}</span>
            </div>
            <div class="item_content">
              <el-input  :placeholder="item.placeholder"></el-input>
            </div>
          </div>
        </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
    export default {
      name: "lordForm",
      data(){
          return{
            form:{

            },
            lordForm:[
              {
                label:"签约人",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"所属部门",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"负责人",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"签约人",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"客户姓名",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"房屋地址",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"签约人",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"收房月数",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"月单价",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"押金",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"中介费",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"月单价",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"保修期",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"待签约日期",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"第一次打房租日期",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"第二次打房租日期",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"押金科目",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"房租科目",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"账户类型",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"收款人",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"开户银行",
                prop:"",
                type:"",
                placeholder:"请输入"
              },
              {
                label:"支行",
                prop:"",
                type:"",
                placeholder:"请输入"
              },

            ]
          }
      }
    }
</script>

<style scoped>

</style>

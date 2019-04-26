<template>
  <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_container'>
        <div class='dialog_header'>
          <h3>house_name</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width='120px' v-for='(title,index) in showTitle' :key='index' v-if='type == 1'>
            <div class='dialog_tit' v-if='index != 0'>
              <div class='dialog_tit_img'></div>
              <p>{{title}}</p>
            </div>

            <div class='seeRecord' v-if='index== 0'>
              <el-button type="primary" plain @click='handleRecord'>查看审核记录</el-button>
            </div>

            <el-row :gutter='10' v-if='title == "相关信息"' class='message_box'>
              <el-col :span='8'>
                <el-form-item v-for='i in 5' :key='i' label=" " class='message_form'>
                  <span>同类型房源市场均价2500-3000元同类型房源市场均价2500-3000元同类型房源市场均价2500-3000元</span>
                </el-form-item>
              </el-col>
              <el-col :span='7' :offset="3" class='message_con'>
                <p>其中:</p>
                <div v-for='i in 3' :key='i'>{{i+1}}.公司</div>
              </el-col>
              <el-col :span='3' class='message_price'>
                <p>收房价:</p>
                <div v-for='i in 3' :key='i'>{{i+1}}.公司</div>
              </el-col>
            </el-row>

            <el-row :gutter="10" v-else-if='title == "收款信息"'>
              <el-col :span='8'>
                <el-form-item v-for='(cell,idx) in Object.keys(collection_show)' :key='cell' :label="collection_show[cell]">
                  <span>{{idx}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" v-else-if='title == "客户信息"'>
              <el-col :span='8'>
                <el-form-item v-for='(cell,idx) in Object.keys(customer_show)' :key='cell' :label="customer_show[cell]">
                  <span>{{idx}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter='10' v-else>
              <el-col :span='8' v-for='(row,idex) in showDetail[index]' :key='"row"+idex'>
                <el-form-item v-for='(cell,idx) in Object.keys(row)' :key='cell' :label="row[cell]" :class='[cell== 55 ? "house_video":""]'>
                  <!-- 房屋影像 -->
                  <img v-if='cell == 55'></img>
                  <span v-else>{{idx}}</span>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>

          <template v-if='type == 2'>
            <el-form label-width="80px" readonly style='marginBottom:20px'>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="处理人" style="text-align: left;width: 100%">
                    <div style="word-break: break-all">第三方</div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" style="text-align: left;width: 100%">
                    <div style="word-break: break-all">第三方</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <VillageContainer village="基本信息">
              <el-form label-width="80px" class="borderNone" readonly>
                <el-row>
                  <el-col :span="8" v-for="(item,idx) in village_detail_form" :key="idx">
                    <el-form-item :label="item.label" style="text-align: left;width: 100%">
                      <div style="word-break: break-all">{{ item.val }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="小区照片">
                  <div class="flex">
                    <LjUpload v-model="village_pic" :disabled="true" :download="false"></LjUpload>
                  </div>
                </el-form-item>
                <el-form-item label="房屋照片">
                  <LjUpload v-model="house_pic" :disabled="true" :download="false"></LjUpload>
                </el-form-item>
                <el-form-item label="调研报告">
                  <LjUpload v-model="files" :disabled="true" :download="false"></LjUpload>
                </el-form-item>
              </el-form>
            </VillageContainer>
            <VillageContainer village="全站大数据房源匹配">
              <div id="village-detail" style="min-height: 400px"></div>
            </VillageContainer>
            <VillageContainer village="房型价格-区块链推荐">
              <el-table :data="outer_net_data" @row-click="handleClickRow">
                <el-table-column label="房型" prop="house_type" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
                <el-table-column align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="handleOpenOuterHouse(scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </VillageContainer>
            <VillageContainer village="自适应聚类房型图">
              <div style="text-align: left" v-if="outer_house_pic.length > 0">
                <img :src="url" alt="" style="width: 60px;height: 60px;margin-right: 15px;cursor: pointer;border-radius: 4px"
                  v-for="url in outer_house_pic" data-magnify="" data-caption="图片查看器" :data-src="url">
              </div>
              <div style="text-align: center" v-else>暂无数据</div>
            </VillageContainer>
            <VillageContainer village="所属部门">
              <div v-if="current_village_detail.org && current_village_detail.org.length > 0" style="text-align: left"
                class="flex">
                <p v-for="(item,idx) in current_village_detail.org">{{ item.name }}<a v-if="idx !== current_village_detail.org.length - 1">、</a></p>
              </div>
            </VillageContainer>
          </template>

          <div class='float-btns'>
            <div class="float_box float_box_active" @click='changeBtns_type'>
              <div class='float_box_img float_box_con'></div>
              <p>评论信息</p>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="info" size="small" @click='handleBuff' v-if='type == 1'>暂缓</el-button>
          <el-button type="info" size="small" @click='handleRecord'>修改</el-button>
          <el-button type="info" size="small">拒绝</el-button>
          <el-button type="danger" size="small">同意</el-button>
        </div>
      </div>

      <!-- 评论 -->
      <div :class='["comments_box",comment_show_visible?"comments_box_active":""]'>
        <div class='comments_list'>
          <div class='comment_cell'>
            <div class='comment_cell_header'>
              <span class='span1'>撒旦飞洒地方</span>
              <span class='span2'>2019-01-22 10:00:00</span>
            </div>
            <div class='comment_cell_words'>sdfasfasfdsdfasfdd</div>
            <div class='comment_border'></div>
          </div>
        </div>
        <div class='comments_footer'>
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="comment_words">
          </el-input>
          <div class='post'>
            <i class='post_icons'></i>
            发送
          </div>
        </div>
      </div>
    </LjDialog>

</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';

export default{
  components:{
    LjDialog
  },
  data(){
    return{}
  }
}
</script>
<template>
  <div>
    <OrderDialog :visible='order_visible' :moduleData="detail_info" @close='handleCloseDetail' />
  </div>
</template>

<script>
import OrderDialog from "@/components/customService/components/order-detail";
export default {
  components: {
    OrderDetail,
  },
  data () {
    return {
      detail_info: {
        currentId: null, // 工单id
        chosenTag: null, // 收房 租房
        currentRow: null
      }
    }
  },
  methods: {
    handleCloseDetail () {

    }
  }
}
</script>


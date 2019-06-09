<!--中介费审核-->
<template>
  <div id="agency_check">
    <contract-detail
      :visible="contract_detail_visible"
      :module-data="currentRow"
      :show-check="false"
      :todo-footer="true"
      :chooseTab='contract_type'
      :showRelated='false'
      @close="handleCloseDetail"
    ></contract-detail>
  </div>
</template>

<script>
  import ContractDetail from '../../../customService/components/contract_detail';

export default {
  components: {ContractDetail},
  data () {
    return {
      currentRow: {
        contract_id:null,
        type:null,
      },
      contract_type:1,
    }
  },
  watch: {
    contract_detail_visible: {
      handler(val,oldVal) {
        if(val) {
            this.$nextTick(()=> {
              let current_selection = this.$todo_list_current_selection;
              let contract_id = _.find(current_selection.variables,{name:'contract_id'}).value;
              let contract_type = _.find(current_selection.variables,{name:'contract_type'}).value;
              this.currentRow.contract_id = contract_id;
              this.contract_type = contract_type;
            });
        }
      },
    },
  },
  computed: {
    contract_detail_visible() {
      return this.$store.state.todo.customerService_agency_check_visible;
    },
  },
  methods: {

    // 关闭详情
    handleCloseDetail () {
      this.$store.dispatch('change_customerService_agency_check_visible');
      this.currentRow = null;
      this.contract_type = 10086;
    },

  },
}
</script>


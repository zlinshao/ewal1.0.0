import Vue from "vue";

import Confirm from "./Confirm.vue";

const ConfirmBox = Vue.extend(Confirm);

Confirm.install = (options) => {
  let instance = new ConfirmBox({
    data: options
  }).$mount();
  document.body.querySelector('#app').appendChild(instance.$el);
  return instance.confirm();
};

export default Confirm;

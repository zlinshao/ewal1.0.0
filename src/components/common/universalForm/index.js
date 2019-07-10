import Vue from "vue";
import SForm from "./SForm";

export default {
  install() {
    Vue.component(SForm.name, SForm);
  }
};

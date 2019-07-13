import Vue from "vue";

import Loading from "./Loading.vue";

const LoadingBox = Vue.extend(Loading);

Loading.install = (options) => {
  let instance = new LoadingBox({
    data: options
  }).$mount();
  if(options.loading) {
    let parent = document.body.querySelector(options.el);
    if(!parent?.style.display) {
      parent.style.display = 'relative';
    }
    parent.appendChild(instance.$el);
  }else {
    document.body.querySelector(options.el).removeChild(document.querySelector('#lj_loading'));
  }
  return instance.load();
};

export default Loading;

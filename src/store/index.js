import Vue from 'vue';
import Vuex from 'vuex';
import app from './module/app.js';
import customer from './module/customer';
import todo from './module/todo.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight,
  },
  modules: {
    app,
    customer,
    todo
  },
});

export default store

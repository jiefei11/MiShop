import Vue from 'vue'
import Vuex from 'vuex'
import state from "@/store/state";
import mutations from "@/store/mutations";
import * as getters from './getter'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val){
      return {
          userInfo : val.userInfo
      }
    }
  })]
})

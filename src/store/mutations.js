import * as types from './mutation-types'

const mutations = {
    [types.SET_USERINFO](state , obj){
        state.userInfo =  obj
    },
    [types.SET_CART](state, obj){
        state.cart = obj
    },
    [types.SET_CARTNUMBER](state,obj) {
        state.cartNumber = obj
    },
    resetVuex(state){
        state.searchObj ={}
    }
}

export default mutations
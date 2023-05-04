
import Vue  from "vue";

import Vuex from "vuex"
Vue.use(Vuex)

let actions = {}


let mutations={
    User(state,value){
        state.user=value
    },
    handleUserName:(state,User_name)=>{
        state.username=User_name
        localStorage.setItem("username",User_name)
    }
}
let state ={
    user:{}
}

let store = new Vuex.Store({
    actions,
    mutations,
    state,
})
export default store
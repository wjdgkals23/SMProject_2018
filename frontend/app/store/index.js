import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import state from './state'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex);


const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters: {

    },
    plugins: []
});

export default store;

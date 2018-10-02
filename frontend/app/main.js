import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import store from './store'

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    'fa': './assets/css/font-awesome.min.css',
    'ion': './assets/css/ionicons.min.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

if(TNS_ENV !== 'production') {
    Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
    store,
    render: h => h('frame', [h(App)])
}).$start()

import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
Vue.config.productionTip = false;

Vue.filter('formateTime', (timeStamp) => {
    if (!timeStamp) return '';
    return moment(timeStamp).format('LLL');
});

new Vue({
    render: (h) => h(App),
}).$mount('#app');

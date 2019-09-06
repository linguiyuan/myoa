import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
// import  './assets/icon/iconfont.css';
import echarts from 'echarts';
import qs from 'qs'
import "babel-polyfill";
import i18n from './i18n/i18n';
import vfilters from './components/common/vfilters'
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$echarts = echarts
//http请求配置
// Vue.use(VueBaiduMap.default, {
//     ak: 'YOUR_APP_KEY'
// });
axios.defaults.withCredentials=false;
axios.defaults.headers={
    'Content-Type': 'application/x-www-form-urlencoded'
}
// axios.defaults.transformRequest = [function(data) {
//     data = JSON.stringify(data)
//     return data
// }]
axios.interceptors.request.use(
    function (config) {
        if(config.method === 'post') {
            if(config.url != window.$g_Api1 + '/api/login'){
                config.url = config.url+'?userid='+ sessionStorage.getItem('userid') + '&accesstoken=' + sessionStorage.getItem('accesstoken')
            }
            config.data = qs.stringify( {
                ...config.data
            })

        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
)
axios.interceptors.response.use(

)
//封装请求api
const ajax = function (url,data={},type='post',so=false) {
    if(!so){
        url = window.$g_Api + url;
    }
    return new Promise((resolve,reject)=>{
        let promise;
        if(type === 'get' && Object.keys(data).length >0){
            let str = ''
                Object.keys(data).forEach(key => {
                    str += key + '=' + data[key] + '&';
                })
                url = url + '?' + str;
            promise = axios.get(url);
        }else {
            // console.log(qs.stringify(data));
            promise = axios.post(url,data);
        }
        promise.then(function (res) {
            resolve(res.data);
        }).catch(function (error) {
            reject(error);
        })
    })
}
Vue.prototype.$ajax = ajax;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
for(let key in vfilters){
    Vue.filter(key,vfilters[key]);
}
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     let token = sessionStorage.getItem('token');
//     if(!token && to.path !== '/login'){
//         next('/login');
//     }else {
//         next();
//     }
// })

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');

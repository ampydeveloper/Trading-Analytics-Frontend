const vue_fb = {}
vue_fb.install = function install(Vue, options) {
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {return}
        js = d.createElement(s)
        js.id = id
        js.src = "//connect.facebook.net/en_US/sdk.js"
        fjs.parentNode.insertBefore(js, fjs)
        console.log('setting fb sdk')
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function onSDKInit() {
        FB.init(options)
        FB.AppEvents.logPageView()
        Vue.FB = FB
        window.dispatchEvent(new Event('fb-sdk-ready'))
    }
    Vue.FB = undefined
}

import Vue from 'vue'
import { FACEBOOK_APP_ID_DEV, FACEBOOK_APP_ID_PROD } from '../constants/keys'
Vue.use(vue_fb, {
    appId: (process.env.NODE_ENV == 'production') ? FACEBOOK_APP_ID_PROD : FACEBOOK_APP_ID_DEV,
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v8.0'
})
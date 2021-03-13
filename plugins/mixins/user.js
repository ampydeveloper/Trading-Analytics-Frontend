import Vue from 'vue';

import { mapGetters } from 'vuex';

import VueMeta from 'vue-meta'
// Vue.use(VueMeta)
Vue.use(VueMeta, {
    metaInfo: {},
})

const User = {
    install(Vue, option) {
        Vue.mixin({
            data() {
                return {
                    appLoaded: false,
                    user_fullname: null,
                    showloader: true,
                }
            },
            computed: {
                ...mapGetters({
                    user: 'loggedInUser',
                    authenticated: 'isAuthenticated',
                    watchListIds: 'watchlist/ids'
                }),
            },
            mounted() {
                this.appLoaded = true;
                this.showloader = false;
                if (this.user) {
                    this.user_fullname = this.user.first_name
                }
            },
            methods: {
                showLoader() {
                    document.getElementById('spinner-holder').style.display = "block";
                },
                hideLoader() {
                    document.getElementById('spinner-holder').style.display = "none";
                },
                authAdminMiddleware() {
                    if (!this.authenticated) {
                        window.localStorage.clear()
                        this.$router.push('/')
                    } else {
                        if (this.user) {
                            console.log(this.user);
                            if (this.user.roles[0].name != 'administrator') {
                                this.$router.push('/dashboard')
                            } else {
                                this.$router.push('/admin')
                            }
                        }
                    }
                },
                authMiddleware() {
                    if (!this.authenticated) {
                        window.localStorage.clear()
                        this.$router.push('/')
                    } else {
                        if (this.user) {
                            if (this.user.roles[0].name != 'user') {
                                this.$router.push('/admin')
                            }
                        }
                    }
                },
                guestMiddleware() {
                    console.log(this.$route.path);

                    if (this.user) {
                        if (this.user.roles && this.user.roles[0].name != 'user') {
                            this.$router.push('/admin')
                        } else {
                            this.$router.push(this.$route.path)
                        }
                    } else {
                        if (this.$route.path == '/') {
                        this.$router.push('/dashboard')
                        } else if (this.$route.path != '/register') {
                            this.$router.push('/dashboard')
                        }
                        else if (this.$route.path != '/login') {
                            this.$router.push('/')
                        }
                    }
                },
                addToCart(data) {
                    try {
                        this.$store.dispatch('cart/addToCart', data)
                    } catch (error) {
                        console.log(error)
                    }
                },
                removeFromCart(idex) {
                    try {
                        this.$store.dispatch('cart/removeFromCart', idex)
                    } catch (error) {
                        console.log(error)
                    }
                },
                buyNow(data) {
                    try {
                        this.$store.dispatch('cart/addToCart', data);
                        this.$router.push('/cart')
                    } catch (error) {
                        console.log(error)
                    }
                },
                isInWatchList(id) {
                    if (this.watchListIds) {
                        return (this.watchListIds.indexOf(parseInt(id)) != -1);
                    }
                    return false;
                }
            }
        })
    }
}

Vue.use(User)

import Vue from 'vue';

import { mapGetters } from 'vuex';

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
                    console.log('user');
                    if (!this.authenticated) {
                        window.localStorage.clear()
                        this.$router.push('/')
                    } else {
                        if (this.user) {
                            if (this.user.roles[0].name != 'administrator') {
                                this.$router.push('/dashboard')
                            }
                        }
                    }
                },
                authMiddleware() {
                    console.log('admin');
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
                    if (this.authenticated) {
                    //     // console.log(this.$route.path);
                    //     // console.log(this.$auth.loggedIn);
                            this.$router.push('/dashboard')
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
                        return (this.watchListIds.indexOf(id) != -1);
                    }
                    return false;
                }
            }
        })
    }
}

Vue.use(User)

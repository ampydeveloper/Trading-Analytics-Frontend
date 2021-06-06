import Vue from 'vue';

import { mapGetters } from 'vuex';

import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue';
Vue.use(OverlayScrollbarsPlugin);
import "overlayscrollbars/css/OverlayScrollbars.css";

const User = {
    install(Vue, option) {
        Vue.mixin({
            data() {
                return {
                    appLoaded: false,
                    user_fullname: null,
                    showloader: true,
                    isAdmin: false,
                    isModerator: false,
                    isDataEntry: false,
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
                    if (this.user.roles.length > 0) {
                        if ((this.user.roles[0].name).toLowerCase() == 'administrator') this.isAdmin = true
                        if ((this.user.roles[0].name).toLowerCase() == 'moderator') this.isModerator = true
                        if ((this.user.roles[0].name).toLowerCase() == 'data entry') this.isDataEntry = true
                    }
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
                        this.$router.push('/dashboard')
                    } else {
                        if (this.user) {
                            if (this.user.roles[0].name != 'administrator' && (this.user.roles[0].name).toLowerCase() != 'moderator' && (this.user.roles[0].name).toLowerCase() != 'data entry') {
                                this.$router.push('/dashboard')
                            } else {
                                //Let user open all page 
                                // this.$router.push('/admin')
                                // this.$router.push(this.$route.path)
                            }
                        }
                    }
                },
                authMiddleware() {
                    if (!this.authenticated) {
                        window.localStorage.clear()
                        this.$router.push('/dashboard')
                    } else {
                        if (this.user.roles && this.user.roles[0].name != 'user') {
                            // this.$router.push('/admin')
                            //Let user open all page 
                            // this.$router.push(this.$route.path)
                        } else {
                            if (this.$route.path.indexOf('admin') !== -1) {
                                this.$router.push('/dashboard')
                            } else {
                                //Let user open all page 
                                // this.$router.push(this.$route.path)
                            }

                        }
                    }
                },
                guestMiddleware() {
                    if (this.user) {
                        if (this.$route.path.indexOf('login') !== -1 || this.$route.path.indexOf('register') !== -1 || this.$route.path.indexOf('forgot-password') !== -1) {
                            //user is trying to open login page 
                            this.$router.push('/dashboard')
                        }
                        else if (this.user.roles && this.user.roles[0].name != 'user') {
                            // this.$router.push('/admin')
                            //user is admin allow all pages
                            // this.$router.push(this.$route.path)
                        } else {
                            if (this.$route.path.indexOf('admin') !== -1) {
                                //user is trying to open admin 
                                this.$router.push('/dashboard')
                            } else {
                                //user is simple user allow all pages
                                // this.$router.push(this.$route.path)
                            }
                        }
                    } else {
                        //Let user open guest pages
                        if (!this.$route.path.indexOf('dashboard') !== -1) {
                            window.localStorage.setItem('OpenUrl', this.$route.fullPath)
                            setTimeout(() => {
                                //   console.log(window.localStorage.getItem('OpenUrl'))
                                this.$router.push(window.localStorage.getItem('OpenUrl'))
                            }, 1300)
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

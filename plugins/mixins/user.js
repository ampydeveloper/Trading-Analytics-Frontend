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

                // window.localStorage.setItem('OpenFirstTime', true);
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
                                // this.$router.push('/admin')
                                this.$router.push(this.$route.path)
                            }
                        }
                    }
                },
                authMiddleware() {
                    // console.log('authMiddleware');
                    if (!this.authenticated) {
                        window.localStorage.clear()
                        this.$router.push('/dashboard')
                    } else {
                        // if (this.user) {
                        //     if (this.user.roles[0].name != 'user') {
                        //         this.$router.push('/admin')
                        //     }
                        // }

                        if (this.user.roles && this.user.roles[0].name != 'user') {
                            // this.$router.push('/admin')
                            this.$router.push(this.$route.path)
                        } else {
                            if (this.$route.path.indexOf('admin')!== -1) {
                                this.$router.push('/dashboard')
                            }else{
                                this.$router.push(this.$route.path)
                            }
                            
                        }
                    }
                },
                guestMiddleware() {
                    // console.log('guestMiddleware');
                    // console.log(window.localStorage.getItem('OpenFirstTime'));
                    if (this.user) {
                        console.log('guestMiddleware user');
                        if (this.user.roles && this.user.roles[0].name != 'user') {
                            // this.$router.push('/admin')
                            this.$router.push(this.$route.path)
                        } else {
                            if (this.$route.path.indexOf('admin')!== -1) {
                                this.$router.push('/dashboard')
                            }else{
                                this.$router.push(this.$route.path)
                            }
                        }
                    } else {
                        // console.log('guestMiddleware not user');
// console.log(this.$route.path);
this.$router.push(this.$route.path)
                        // console.log(window.localStorage.getItem('OpenFirstTime'));
                        // var openFirstTime = window.localStorage.getItem('OpenFirstTime');
                        // if (openFirstTime == 'First' || openFirstTime == null) {
                        //     console.log('OpenFirstTime');
                        //     window.localStorage.setItem('OpenFirstTime', 'Not First');
                        //     // this.$router.push('/dashboard')
                        //     if (this.$route.path == '/') {
                        //         this.$router.push('/dashboard')
                        //     } else {
                        //         this.$router.push(this.$route.path)
                        //     }
                        // } else {
                        //     console.log('Not OpenFirstTime');
                        //     this.$router.push(this.$route.path)
                        // }

                        // if (this.$route.path == '/') {
                        //     this.$router.push('/dashboard')
                        // } else if (this.$route.path != '/register') {
                        //     this.$router.push('/dashboard')
                        // }
                        // else if (this.$route.path != '/login') {
                        //     this.$router.push('/')
                        // }
                        // else if (this.$route.path != '/reset-password') {
                        //     this.$router.push('/reset-password')
                        // }
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

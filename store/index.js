export const getters = {
    isAuthenticated(state) {
        // return true
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        // return []
        return state.auth.user
    }
}
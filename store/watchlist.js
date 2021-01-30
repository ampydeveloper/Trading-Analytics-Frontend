export const state = () => ({
    ids: []
})

export const getters = {
    ids(state) {
        return state.ids;
    }
}

export const mutations = {
    SET_IDS(state, data) {
        state.ids = data; 
    },
}

export const actions = {
    fetchIds({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/watchlist/id-list').then(res => {
                if (res.status == 200) {
                    commit('SET_IDS',res.data.data);
                }
              })
            .catch((error) => {
                console.log(error.statusText);
            });
        });
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
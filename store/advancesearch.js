import { FILTERS } from '../constants/advance_search_filter';
export const state = () => ({
    show: false,
    searchBtnClick: false,
    keyword: '',
    card_id: null,
    filters: {...FILTERS},
    attributes: []
})

export const getters = {
    show(state) {
        return state.show;
    },
    searchBtnClick(state) {
        return state.searchBtnClick;
    },
    keyword(state) {
        return state.keyword;
    },
    cardid(state) {
        return state.card_id;
    },
    filters(state) {
        return state.filters;
    },
    attributes(state) {
        return state.attributes;
    }
}

export const mutations = {
    TOGGLE(state) {
        state.show = !state.show
    },
    HIDE(state) {
        state.show = false
    },
    UPDATE_KEYWORD(state, keyword) {
        state.searchBtnClick = !state.searchBtnClick
        state.keyword = keyword
        state.card_id = null
    },
    UPDATE_CARD_ID(state, id) {
        state.card_id = id
        state.keyword = ''
    },
    UPDATE_FILTERS(state, filters) {
        state.filters = { ...filters }
    },
    RESET_FILTERS(state) {
        state.filters = {...FILTERS}
    },
    SET_ATTRIBUTES(state, data) {
        state.attributes = data;
    },
}

export const actions = {
    toggle({ commit }) {
        commit('RESET_FILTERS');
        commit('TOGGLE');
    },
    hide({ commit }) {
        commit('HIDE');
    },
    update_keyword({ commit }, keyword) {
        return new Promise((resolve, reject) => {
            commit('UPDATE_KEYWORD', keyword);
            setTimeout(() => resolve(keyword), 100);
        });
    },
    update_search_card_id({ commit }, id) {
        return new Promise((resolve, reject) => {
            commit('UPDATE_CARD_ID', id);
            setTimeout(() => resolve("done"), 100);
        });
    },
    update_filters({ commit }, filters) {
        commit('UPDATE_FILTERS', filters);
    },
    reset_filter({ commit }) {
        commit('RESET_FILTERS');
    },
    fetchAttributes({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/get-advance-search-attributes').then(res => {
                if (res.status == 200) {
                    commit('SET_ATTRIBUTES', res.data.data);
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
export const state = () => ({
    items: {},
    itemsCount: 0
})

export const getters = {
    items(state) {
        return state.items;
    },
    itemsCount(state) {
        return state.itemsCount;
    }
}

export const mutations = {
    ADD_TO_CART(state, item) {
        if (!state.items.hasOwnProperty(item.itemId)) {
            state.items[item.itemId] = {
                qty: 1,
                details: item,
                title: item.title,
                price: item.selling_status.currentPrice
            }
        } else {
            state.items[item.itemId].qty = state.items[item.itemId].qty + 1;
        }
        state.itemsCount = state.itemsCount + 1;
    },
    REMOVE_FROM_CART(state, index) {
        const data = { ...state.items };
        const count = state.itemsCount - state.items[index].qty;
        delete data[index];
        state.items = data;
        state.itemsCount = count;

    },
    CLEAR_CART(state) {
        state.items = {};
        state.itemsCount = 0;
    },
    INCREMENT_QTY(state, index) {
        if (state.items.hasOwnProperty(index)) {
            state.items[index].qty = state.items[index].qty + 1;
        }
    },
    DECREMENT_QTY(state, index) {
        if (state.items.hasOwnProperty(index)) {
            if (state.items[index].qty > 1) {
                state.items[index].qty = state.items[index].qty - 1;
            } else {
                const data = { ...state.items };
                const count = state.itemsCount - state.items[index].qty;
                delete data[index];
                state.items = data;
                state.itemsCount = count;
            }
        }
    }
}

export const actions = {
    addToCart({ commit }, item) {
        return new Promise((resolve, reject) => {
            commit('ADD_TO_CART', item)
            resolve();
        });
    },
    removeFromCart({ commit }, index) {
        return new Promise((resolve, reject) => {
            commit('REMOVE_FROM_CART', index)
            resolve();
        });
    },
    clearCart({ commit }) {
        return new Promise((resolve, reject) => {
            commit('CLEAR_CART')
            resolve();
        });
    },
    incrementQty({ commit }, index) {
        return new Promise((resolve, reject) => {
            commit('INCREMENT_QTY', index)
            resolve();
        });
    },
    decrementQty({ commit }, index) {
        return new Promise((resolve, reject) => {
            commit('DECREMENT_QTY', index)
            resolve();
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
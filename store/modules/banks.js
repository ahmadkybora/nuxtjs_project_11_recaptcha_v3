import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    getBanks: {},
    allBanks: {},
    isBank: {},
});

const getters = {
    getBanks(state) {
        return state.getUsers
    },
    isBank(state) {
        return state.isUser
    },
};

const actions = {

    /*
    |--------------------------------------------------------------------------
    | Panel Part
    |--------------------------------------------------------------------------
    */
    /**
     *
     * @param context
     * @param all
     * @returns {Promise<void>}
     */
    async allBanks(context, all = 'all') {
        await this.$axios.get(`panel/banks?page=${all}`)
            .then(res => {
                const allBanks = res.data.data;
                context.commit('allBanks', allBanks);
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async getBanks(context, page = 1) {
        await this.$axios.get(`panel/banks?page=${page}`)
            .then(res => {
                const getBanks = res.data.data;
                context.commit('getBanks', getBanks);
            }).catch(err => {
                console.log(err)
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    showBank(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        console.log(users[3].id);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    },

    /**
     *
     * @param context
     * @param payload
     */
    editBank(context, payload) {
        const userId = payload.id;
        const users = context.state.getUsers;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                const isUser = users[i];
                context.commit('isUser', isUser);
            }
        }
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isBankRegister(context, payload) {
        let formData = new FormData();

        formData.append('title', payload.id);
        formData.append('account_number', payload.account_number);

        await this.$axios.post('panel/banks/store', formData)
            .then(res => {
                const getBanks = res.data.data;
                context.commit('getBanks', getBanks);
                //this.$router.push('/panel/users');
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isBankUpdate(context, payload) {
        let formData = new FormData();

        formData.append('title', payload.id);
        formData.append('account_number', payload.account_number);

        await this.$axios.post('panel/banks/' + payload.id, formData)
            .then(res => {
                const getBanks = res.data.data;
                context.commit('getBanks', getBanks);
            }).catch(err => {
                success(err)
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    async deleteBank(context, payload) {
        state.isUser = payload.id;
        const id = payload.id;
        await this.$axios.delete('panel/users/' + id)
            .then(() => {
                /*let idx = user.indexOf(id)
                const getUsers = state.getUsers.splice(idx,1)*/
                //context.commit('deleteUser', getUsers);
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async searchBank(context, payload) {
        const full_text_search = {
            full_text_search: payload.full_text_search
        };

        await this.$axios.post('panel/users/search', full_text_search)
            .then(res => {
                const getUsers = res.data.data;
                context.commit('getUsers', getUsers);
            }).catch(err => {
                error(err);
            })
    },
};

const mutations = {
    myBank(state, payload) {
        state.myBank = payload
    },
    isUser(state, payload) {
        state.isUser = payload
    },
    allBanks(state, payload) {
        state.allBanks = payload
    },
    getBanks(state, payload) {
        state.getBanks = payload
    },
    showBank(state, payload) {
        state.isBank = payload
    },
    editBank(state, payload) {
        state.isBank = payload
    },
    deleteBank(state, payload) {
        state.getBanks = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

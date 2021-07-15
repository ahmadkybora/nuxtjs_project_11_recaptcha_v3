import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    getTransactions: {},
    isTransaction: {},
    myTransactions: {},
});

const getters = {
    getTransactions(state) {
        return state.getUsers
    },
    isTransaction(state) {
        return state.isUser
    },
};

const actions = {

    // panel
    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async getTransactions(context, page = 1) {
        await this.$axios.get(`panel/users?page=${page}`)
            .then(res => {
                const getUsers = res.data.data;
                context.commit('getUsers', getUsers);
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    showTransaction(context, payload) {
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
    editTransaction(context, payload) {
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
    async isTransactionRegister(context, payload) {
        let formData = new FormData();

        formData.append('transaction_code', payload.transaction_code);
        formData.append('amount', payload.amount);
        formData.append('username', payload.username);
        formData.append('email', payload.email);
        formData.append('mobile', payload.mobile);
        formData.append('home_phone', payload.home_phone);
        formData.append('zip_code', payload.zip_code);
        formData.append('password', payload.password);
        formData.append('confirmation_password', payload.confirmation_password);
        formData.append('home_address', payload.home_address);
        formData.append('work_address', payload.work_address);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await this.$axios.post('panel/users/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(res => {
                const getUsers = res.data.data;
                context.commit('getUsers', getUsers);
                //this.$router.push('/panel/users');
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isTransactionUpdate(context, payload) {
        const isUpdate = {
            id: payload.id,
            first_name: payload.first_name,
            last_name: payload.last_name,
            username: payload.username,
            email: payload.email,
            mobile: payload.mobile,
            home_phone: payload.home_phone,
            zip_code: payload.zip_code,
            password: payload.password,
            confirmation_password: payload.confirmation_password,
            home_address: payload.home_address,
            work_address: payload.work_address,
        };
        await this.$axios.patch(`panel/users/${payload.id}`, isUpdate)
            .then(res => {
                const getUsers = res.data.data;
                context.commit('getUsers', getUsers);
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     */
    async deleteTransaction(context, payload) {
        state.isUser = payload.id;
        const id = payload.id;
        await this.$axios.delete(`panel/users/${id}`)
            .then(() => {
                /*let idx = user.indexOf(id)
                const getUsers = state.getUsers.splice(idx,1)*/
                //context.commit('deleteUser', getUsers);
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async searchTransaction(context, payload) {
        const full_text_search = {
            full_text_search: payload.full_text_search
        };

        await this.$axios.post('panel/users/search', full_text_search)
            .then(res => {
                const getUsers = res.data.data;
                context.commit('getUsers', getUsers);
            }).catch(err => {
                error(err)
            })
    },

    // profile
    /**
     *
     * @param context
     * @param page
     * @returns {Promise<void>}
     */
    async myTransactions(context, page = 1) {
        this.$axios.get(`profile/my-transactions?page=${page}`)
            .then(res => {
                const myTransactions = res.data.data;
                context.commit('myTransactions', myTransactions);
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async myTransactionRegister(context, payload) {
        let formData = new FormData();

        formData.append("transaction_code", payload.transaction_code);
        formData.append("bankId", payload.bankId);
        formData.append("amount", payload.amount);
        formData.append("image", payload.image);

        this.$axios.post('profile/my-transactions/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                const myTransaction = res.data.data;
                context.commit('myTransaction', myTransaction);
            })
            .catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async myTransactionUpdate(context, payload) {
        let formData = new FormData();

        formData.append("first_name", payload.first_name);
        formData.append("last_name", payload.last_name);
        formData.append("username", payload.username);
        formData.append("email", payload.email);
        formData.append("mobile", payload.mobile);
        formData.append("home_phone", payload.home_phone);
        formData.append("zip_code", payload.zip_code);
        formData.append("password", payload.password);
        formData.append("confirmation_password", payload.confirmation_password);
        formData.append("home_address", payload.home_address);
        formData.append("work_address", payload.work_address);
        formData.append("image", payload.image);

        this.$axios.post('profile/my-profile/update/' + payload.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                const myUser = res.data.data;
                context.commit('myUser', myUser);
            })
            .catch(err => {
                error(err);
            })
    },
};

const mutations = {
    myTransactions(state, payload) {
        state.myTransactions = payload
    },
    isTransaction(state, payload) {
        state.isUser = payload
    },
    getTransactions(state, payload) {
        state.getUsers = payload
    },
    showTransaction(state, payload) {
        state.isUser = payload
    },
    editTransaction(state, payload) {
        state.isUser = payload
    },
    deleteTransaction(state, payload) {
        state.getUsers = payload
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

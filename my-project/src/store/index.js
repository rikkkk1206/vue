import Vue from 'vue'
import Vuex from 'vuex'
/* import createPersistedState from "vuex-persistedstate"; */
Vue.use(Vuex)

// ストアの定義
const store = new Vuex.Store({
    // ステート、ミューテーションなどをここに記載
    state: {
        user: {},
        status: false
    },
    mutations: {
        onAuthStateChanged(state, user) {
            state.user = user; //firebaseが返したユーザー情報
        },
        onUserStatusChanged(state, status) {
            state.status = status; //ログインしてるかどうか true or false
        }
    },
    getters: {
        getUserEmail(state) {
            return state.user;
        },
        isSignedIn(state) {
            return state.status;
        }
    },
    /*   plugins: [createPersistedState()] // この行でvuexに「vuex-persistedstate」を追加 */
})

// ストアをエクスポート
export default store

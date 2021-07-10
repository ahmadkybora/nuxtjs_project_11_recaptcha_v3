import  en from './en.json';
import fa from './fa.json';
export const state = {
  language: en,
};

export const actions = {
   setLocalLanguage({commit},language) {
    commit('setLanguage', language);
  }
}

export const mutations = {
  setLanguage(state, language) {
    if (language==="en"){
      state.language=en
    }
    if (language==="fa"){
      state.language=fa
    }
  },
};


export default {
  state,
  actions,
  mutations
};

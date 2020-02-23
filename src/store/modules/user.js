import { getToken, setToken, removeToken } from "@/utils/auth";
const state = { // 存储用户令牌和角色信息
  token: getToken(),
  roles: []
  // 其他用户信息
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};
const actions = {
  login({ commit }, userInfo) { // 用户登录动作 user/login  dispatch('user/login')
    const { username } = userInfo;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" || username === "jerry") {
          commit("SET_TOKEN", username); // 保存状态
          setToken(username); // 写入cookie
          resolve();
        } else {
          reject("用户名、密码错误");
        }
      }, 1000);
    });
  },
  getInfo({ commit, state }) {  // 获取用户角色等信息
    return new Promise((resolve) => {
      setTimeout(() => {
        const roles = state.token === 'admin' ? ['admin'] : ['editor']
        commit("SET_ROLES", roles);
        resolve({ roles });
      }, 1000);
    });
  },
  resetToken({ commit }) {   // 重置令牌
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

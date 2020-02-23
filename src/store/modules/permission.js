import { asyncRoutes, constRoutes } from "@/router";

/**
 * 根据路由meta.role确定是否当前用户拥有访问权限
 * @roles 用户拥有角色
 * @route 待判定路由
 */
function hasPermission(roles, route) { 
  if (route.meta && route.meta.roles) { // 如果当前路由有roles字段则需判断用户访问权限
    return roles.some(role => route.meta.roles.includes(role)); // 若用户拥有的角色中有被包含在待判定路由角色表中的则拥有访问权
  } else {
    return true;  // 没有设置roles则无需判定即可访问
  }
}

/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，首次传入的就是AsyncRoutes
 * @roles 用户拥有角色
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route }; // 复制一份
    if (hasPermission(roles, tmp)) { // 如果用户有访问权则加入结果路由表
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles); // 如果存在子路由则递归过滤之
      }
      res.push(tmp);
    }
  });
  return res;
}

const state = {
  routes: [], // 完整路由表
  addRoutes: [] // 用户可访问路由表
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;  // addRoutes是用户可以访问的权限页面
    state.routes = constRoutes.concat(routes); // routes是完整的路由表
  }
};

const actions = {
  // 动态路由生成：在得到用户角色后会第一时间调用
  generateRoutes({ commit }, roles) {  // roles: admin|editor (角色)
    return new Promise(resolve => {
      let accessedRoutes;
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes || []; // 用户是管理员则拥有完整访问权限
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles); // 否则需要根据角色做过滤处理
      }
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
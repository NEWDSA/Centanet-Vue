/**
  *@Description:菜单功能权限控制
*/

import { asyncRoutes, constantRoutes } from '@/router'
import path, { resolve } from 'path'
import store from '..'


//过滤获取有权限的路由
function filterAsyncRoutes(routes, userRouters, basePath = '/') {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        const routePath = path.resolve(basePath, tmp.path)
        if (tmp.children && tmp.children.length >= 1) {
            const result = filterAsyncRoutes(tmp.children, userRouters, routePath)
            if (result && result.length > 0) {
                tmp.children = result
                res.push(tmp)
            }
        } else {
            if (route.hidden) {
                res.push(tmp)
            }
            const authActions = filterActions(tmp.actions, userRouters, routePath)
            //路由名称与后端后去的路由名称匹配，则显示该路由
            if ((userRouters.some(x => x.Name == route.name) && !route.hidden) || authActions.length > 0) {
                tmp.actions = authActions
                res.push(tmp)
            }
        }
    })
    return res
}

//过滤获取有权限的操作
function filterActions(actionList, userActions, routePath) {
    const actions = []
    if (actionList && actionList.length > 0) {
        for (const action of actionList) {
            const actionPath = path.resolve(routePath, action.name)
            if (userActions.some(x => x == actionPath)) {
                actions.push(action)
            }
        }
    }
    return actions
}

//过滤菜单，去除隐藏不显示的菜单节点
function filterMenu(menus) {
    const data = []
    menus.forEach(item => {
        const tmp = JSON.parse(JSON.stringify(item))
        if (tmp.children && tmp.children.length >= 1) {
            const result = filterMenu(tmp.children)
            if (result && result.length > 0) {
                tmp.children = result
                data.push(tmp)
            }
        }
        else {
            if (!tmp.hidden) {
                data.push(tmp)
            }
        }
    })
    return data
}


const state = {
    menus: [],
    authRoutes: [],
}

const mutations = {
    SET_MENUS: (state, menus) => {
        state.menus = constantRoutes.concat(menus)
    },
    SET_AUTH_ROUTES: (state, authRoutes) => {
        state.authRoutes = authRoutes
    }
}

const actions = {
    generateRoutes({ commit }) {
        return new Promise((resolve, reject) => {
            const data = store.getters.loginUser.Menus;
            const accessedRoutes = filterAsyncRoutes(asyncRoutes, data)
            const menus = filterMenu(accessedRoutes)
            commit('SET_MENUS', menus)
            commit('SET_AUTH_ROUTES', data)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
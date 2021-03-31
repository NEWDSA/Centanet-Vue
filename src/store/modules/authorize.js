/**
  *@Description:授权token管理,用户信息管理
  */
import { getToken, setToken, removeToken } from '@/utils/auth'
import * as auth from '@/api/authentication'
import defaultSettings from '@/settings'

const state = {
    token: getToken(),
    loginUser:null,
}

const mutations = {
    SET_TOKEN: (state,token)=>{
        state.token = token
        setToken(token)
    },
    REMOVE_TOKEN: (state)=>{
        state.token = null
        removeToken()
    },
    SET_USER:(state,user)=>{
        state.loginUser = user
    },
    REMOVE_USER:(state)=>{
        state.loginUser = null
    }
}

const actions = {
    async gettoken({commit}){
        if(!state.token && state.token == null){
            const  token = await auth.getToken()
            commit('SET_TOKEN',token)
        }
        if(state.token && !state.loginUser){
            try{
                const user = await auth.getUserInfo()
                commit('SET_USER',user)
            }catch(err){
                // 本地Cookies有效但服务器无登录信息时，则清空Cookies并跳转至重新登录
                commit('REMOVE_TOKEN')
                commit('REMOVE_USER')
                console.log(err);
                // Setting配置文件中，得到SSO登录页面URL
                const currUrl = encodeURI(window.location.href)
                window.location.href = `${defaultSettings.ssoLoginUrl}?ReturnUrl=${currUrl}`
            }
        }
        return state.token
    },
    async logout({commit}){
        try{
            await auth.logout()
        }catch(err){
        }
        commit('REMOVE_TOKEN')
        commit('REMOVE_USER')
        return true
    },
    goToLoginPage({commit}){
        // Setting配置文件中，得到SSO登录页面URL
        const currUrl = encodeURI(window.location.href)
        window.location.href = `${defaultSettings.ssoLoginUrl}?ReturnUrl=${currUrl}`
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
}
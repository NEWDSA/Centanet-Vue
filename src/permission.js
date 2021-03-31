import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
  const token = await store.dispatch('authorize/gettoken')
  if(token){
       const hasGenerateMenus =  store.getters.menus && store.getters.menus.length > 0
       if(!hasGenerateMenus){
           const accessRoutes = await store.dispatch('permission/generateRoutes')
           router.addRoutes(accessRoutes)
           next({ ...to, replace: true })
       }else{
           next()
       }
  }else{
      store.dispatch('authorize/goToLoginPage')
  }
})
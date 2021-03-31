const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.authorize.token,
  loginUser:state=>state.authorize.loginUser,
  menus: state => state.permission.menus,
}
export default getters

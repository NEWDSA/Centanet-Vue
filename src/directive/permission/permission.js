import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding

  const Privileges = store.getters.loginUser.Privileges;

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissions = value
     
      // 判断当前登录用户是否有权限
      const hasPermission = Privileges.some(item => {
        return permissions.includes(item)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`控制权限如： v-permission="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}

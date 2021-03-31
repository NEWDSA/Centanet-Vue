import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  const token = Cookies.get(TokenKey) && 
                Cookies.get(TokenKey) != 'null' ? Cookies.get(TokenKey) : null
  return token
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

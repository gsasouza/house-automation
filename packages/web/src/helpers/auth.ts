import { navigate } from '@reach/router'

export const ACCESS_TOKEN = 'GSASOUZA_HOUSE_AUTOMATION'

export const login = (accessToken, remember) => remember ?
  localStorage.setItem(ACCESS_TOKEN, accessToken) :
  sessionStorage.setItem(ACCESS_TOKEN, accessToken);


export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  sessionStorage.removeItem(ACCESS_TOKEN)
  navigate('/');
}

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN)

export const isLoggedIn = () => {
  const token = getAccessToken()
  return token !== 'null' && !!token
}

import { navigate } from '@reach/router'

export const ACCESS_TOKEN = 'go-backlog-login-storage'

export const login = async (accessToken, remember) => remember ?
  await localStorage.setItem(ACCESS_TOKEN, accessToken) :
  sessionStorage.setItem(ACCESS_TOKEN, accessToken);


export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  sessionStorage.removeItem(ACCESS_TOKEN)
  navigate('/');
}

export const getAccessToken = async () => await localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN)

export const isLoggedIn = async () => {
  const token = await getAccessToken()
  return token !== 'null' && !!token
}

import * as fetchApi from './utils/fetchApi';


const urls = {
    login: '/users/login',
    logout: '/users/logout',
    register: '/users/register',
    profile: '/users/me',
}

export const login = (username, password) => {
    return fetchApi.post(urls.login, {username, password})
}

export const logout = (user) => {
    return fetchApi.get(urls.logout, undefined, user);
}

export const register = (userData) => {
    return fetchApi.post(urls.register, userData)
}

export const profile = () => {
    return fetchApi.get(urls.profile);
}

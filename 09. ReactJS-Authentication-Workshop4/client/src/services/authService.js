import * as fetchApi from './utils/fetchApi';

export const login = (email, password) => {
    return fetchApi.post('/users/login', { email, password})
}

export const logout = (user) => {
    return fetchApi.get('/users/logout', undefined, user);
}

export const register = (email, password) => {
    return fetchApi.post('/users/register', { email, password})
}
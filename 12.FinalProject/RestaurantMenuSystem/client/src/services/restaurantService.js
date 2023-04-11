import * as fetchApi from './utils/fetchApi';

const urls = {
    getAll: '/data/restaurants',
    getById: (id) => `/data/restaurants/${id}`,
    getAllByQuery: (query) => `/data/restaurants?${query}`,
    create: '/data/restaurants',
    update: (restaurantId) => `/data/restaurants/${restaurantId}`,
    delete: (restaurantId) => `/data/restaurants/${restaurantId}`,
}

export const getAll = () => {
    return fetchApi.get(urls.getAll);
}

export const getById = (id) => {
    return fetchApi.get(urls.getById(id));
}

export const getAllByUser = (user) => {
    const parameter = encodeURIComponent(`_ownerId="${user._id}"`);
    return fetchApi.get(urls.getAllByQuery(`where=${parameter}`));
}

export const create = (restaurant) => {
    return fetchApi.post(urls.create, restaurant);
}

export const update = (restaurant) => {
    return fetchApi.put(urls.update(restaurant._id), restaurant);
}

export const del = (restaurantId) => {
    return fetchApi.del(urls.delete(restaurantId));
}




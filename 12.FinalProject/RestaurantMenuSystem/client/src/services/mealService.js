import * as fetchApi from './utils/fetchApi';

const urls = {
    getAll: '/data/meals',
    getAllByRestaurantIdAndMealType: (restaurantId, mealType, product, offset, pageSize) => `${urls.getAll}?${createQueryString(restaurantId, mealType, product)}&offset=${offset}&pageSize=${pageSize}`,
    countByRestaurantIdAndMealType: (restaurantId, mealType, product) => `${urls.getAll}?${createQueryString(restaurantId, mealType, product)}&count`,
    create: '/data/meals',
    delete: (mealId) => `/data/meals/${mealId}`,
    update: (mealId) => `/data/meals/${mealId}`,
}

export const getAll = () => {
    return fetchApi.get(urls.getAll);
}

export const getAllByRestaurantIdAndMealTypePaged = (restaurantId, mealType, product, offset, pageSize) => {
    return fetchApi.get(urls.getAllByRestaurantIdAndMealType(restaurantId, mealType, product, offset, pageSize));
}

export const getAllByRestaurantIdAndMealTypeCount = (restaurantId, mealType, product) => {
    return fetchApi.get(urls.countByRestaurantIdAndMealType(restaurantId, mealType, product));
}

export const create = (meal) => {
    return fetchApi.post(urls.create, meal);
}

export const update = (meal) => {
    return fetchApi.put(urls.update(meal._id), meal);
}

export const del = (mealId) => {
    return fetchApi.del(urls.delete(mealId));
}

const createQueryString = (restaurantId, mealType, product) => {
    const queryString = encodeURIComponent(`restaurantId="${restaurantId}" and mealType="${mealType}"${product ? ` and ingredients LIKE "${product}"` : ''}`);
    return `where=${queryString}`
}

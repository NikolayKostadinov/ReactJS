import * as fetchApi from './utils/fetchApi'

const urls = {
    all: '/data/games?sortBy=_createdOn%20desc',
    details: (gameId) => `/data/games/${gameId}`,
    create:'/data/games',
    update: (gameId) => `/data/games/${gameId}`,
    delete: (gameId) => `/data/games/${gameId}`
}

export const getAll = () => {
    return fetchApi.get(urls.all);
}

export const getDetails = (gameId) => {
    return fetchApi.get(urls.details(gameId));
}

export const createGame = (game) => {
    return fetchApi.post(urls.create, game);
}

export const updateGame = (game) => {
    return fetchApi.put(urls.update(game._id), game);
}

export const deleteGame = (gameId) => {
    return fetchApi.del(urls.delete(gameId));
}

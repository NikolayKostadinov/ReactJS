import * as fetchApi from './utils/fetchApi'

const urls = {
    all: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    details: (gameId) => `/data/games/${gameId}`,
    create:'/data/games'
}

export const getAll = async () => {
    return await fetchApi.get(urls.all);
}

export const getDetails = async (gameId) => {
    return await fetchApi.get(urls.details(gameId));
}

export const createGame = async (game) => {
    return await fetchApi.post(urls.create, game);
}


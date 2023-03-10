import * as fetchApi from './utils/fetchApi'

const urls = {
    create: '/data/comments',
    get: '/data/comments',
    update: (gameId) => `/data/comments/${gameId}`,
    delete: (gameId) => `/data/comments/${gameId}`
}

export const createComment = (gameId, comment) => {
    return fetchApi.post(urls.create, { gameId, comment });
}


export const getByGameId = (gameId) => {
    const search = encodeURIComponent(`gameId="${gameId}"`);
    const relations = encodeURIComponent(`user=_ownerId:users`);
    return fetchApi.get(`${urls.get}?where=${search}&load=${relations}`);
}




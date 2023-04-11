import * as fetchApi from './utils/fetchApi';

const urls = {
    getAll: '/jsonstore/reservations',
    create: '/jsonstore/reservations',
    delete: (reservationId) => `/jsonstore/reservations/${reservationId}`,
    update: (reservationId) => `/jsonstore/reservations/${reservationId}`,
}

export const getAll = () => {
    return fetchApi.get(urls.getAll);
}

export const create = (reservation) => {
    return fetchApi.post(urls.create, reservation);
}

export const update = (reservation) => {
    return fetchApi.put(urls.update(reservation._id), reservation);
}

export const del = (reservationId) => {
    return fetchApi.del(urls.delete(reservationId));
}

export const confirm = (reservationId, stat) => {
    return fetchApi.patch(urls.update(reservationId), { confirmed:  stat});
}

export const finish = (reservationId, stat) => {
    return fetchApi.patch(urls.update(reservationId), {finished: stat });
}


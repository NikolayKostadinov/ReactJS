import { clearUserData, getUserData } from "./users_store.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const userData = getUserData();
    const options = {
        method: method,
        headers: {},
    };

    if (data !== undefined) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(data)
    }

    if (userData?.accessToken) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status === 204) {
            return response;
        }

        if (window.location.pathname !== '/login' && (response.status === 401 || response.status === 403)) {
            clearUserData();
            window.location.replace('/');
        }

        if (!response.ok) {
            const err = new Error();
            err.message = response.message;

            if (response.status === 409) {
                const resData = await response.json();
                err.message = resData.message;
            }

            err.code = response.status;
            throw err;
        }

        const responseData = await response.json();

        return responseData;
    } catch (err) {
        throw err;
    }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const patch = request.bind(null, 'PATCH');
const del = request.bind(null, 'DELETE');

export { get, post, put, del, patch }

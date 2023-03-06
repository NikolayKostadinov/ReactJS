const baseUrl = 'http://localhost:3030';

export const  getAll = ()=>{
    const url = `${baseUrl}/data/games?sortBy=_createdOn%20desc&distinct=category`;
    return fetch(url)
    .then(res => res.json());
}

export const  getDetails = (gameId)=>{
    const url = `${baseUrl}/data/games/${gameId}`;
    return fetch(url)
    .then(res => res.json());
}
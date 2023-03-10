import { useEffect, useReducer } from 'react';

import * as gameService from '../services/gameService';

export const action = {
    ADD_GAMES: (games) => [...games],
    GAME_ADD: (game, games) => [...games, game],
    GAME_UPDATE: (game, games) => games.map(g => g._id === game._id ? game : g),
    FETCH_GAME_DETAILS: (game, games) => games.map(g => g._id === game._id ? game : g),
    GAME_DELETE: (gameId, games) => games.filter(g => g._id !== gameId),
    ADD_COMMENT: ({ gameId, comment }, games) => games.map(g => g._id !== gameId ? g : { ...g, comments: [...(g.comments || []), comment] })
}

const useGames = () => {
    const gameReducer = (state, action) => {
        return action.type(action.payload, state);
    }

    const [games, dispatcher] = useReducer(gameReducer, []);

    useEffect(() => {
        gameService.getAll()
            .then(data => {
                dispatcher({
                    type: action.ADD_GAMES,
                    payload: Object.values(data)
                })
            });
    }, []);

    return [games, dispatcher];
}

export default useGames;
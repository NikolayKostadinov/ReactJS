import { createContext, useContext } from "react";
import useGames from "../hooks/useGames";
import { action } from "../hooks/useGames";


export const GameContext = createContext({
    games: [],
    addGame: {},
    updateGame: {},
    deleteGame: {},
    addComment: {},
    fetchGameDetails: {},
    selectGame: {}
});

export const useGameContext = () => {
    const context = useContext(GameContext);
    return context;
}

export const GameProvider = ({
    children
}) => {
    const [games, dispatcher] = useGames();

    const addComment = (gameId, comment) => {
        dispatcher({
            type: action.ADD_COMMENT,
            payload: { gameId, comment }
        });
    }

    const addGame = (game) => {
        dispatcher({
            type: action.GAME_ADD,
            payload: game
        });
    }

    const updateGame = (game) => {
        dispatcher({
            type: action.GAME_UPDATE,
            payload: game
        });
    }

    const fetchGameDetails = (game) => {
        dispatcher({
            type: action.FETCH_GAME_DETAILS,
            payload: game
        });
    }

    const deleteGame = (gameId) => {
        dispatcher({
            type: action.GAME_DELETE,
            payload: gameId
        });
    }

    const selectGame = (gameId) => games.find(g => g._id === gameId);

    return (
        <GameContext.Provider
            value={{
                games,
                addGame,
                updateGame,
                deleteGame,
                addComment,
                fetchGameDetails,
                selectGame
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
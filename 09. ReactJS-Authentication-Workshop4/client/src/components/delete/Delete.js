import { useParams, useNavigate } from "react-router-dom";
import { useContext } from 'react';

import * as gameService from '../../services/gameService';
import { GameContext } from '../../contexts/GameComtext';

const Delete = () => {
    const { gameId } = useParams();
    const { deleteGame } = useContext(GameContext);
    const navigator = useNavigate();

    gameService.deleteGame(gameId)
        .then(() => {
            deleteGame(gameId);
            navigator('/catalog');
        });

    return null;
}
export default Delete;

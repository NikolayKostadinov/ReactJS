import { Outlet, Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGameContext } from "../../contexts/GameContext";

const OwnerGuard = ({ children }) => {
    const { gameId } = useParams();
    const { fetchGameDetails } = useGameContext();
    const { user } = useAuthContext();

    const currentGame = fetchGameDetails({_id:gameId});

    if (user._id !== currentGame._ownerId) {
        return <Navigate to="/catalog" replace />
    }

    return children ? children : <Outlet />;
}

export default OwnerGuard;
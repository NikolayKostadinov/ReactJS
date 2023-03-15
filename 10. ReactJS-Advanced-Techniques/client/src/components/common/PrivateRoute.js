import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticate } = useAuthContext();
    if (!isAuthenticate) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            children
        </>
    )
}
export default PrivateRoute;
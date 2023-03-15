import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const RouteConstraint = () => {
    const { isAuthenticate } = useAuthContext();
    if (!isAuthenticate) {
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}
export default RouteConstraint;
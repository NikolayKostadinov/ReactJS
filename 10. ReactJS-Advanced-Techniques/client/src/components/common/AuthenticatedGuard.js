import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const AuthenticatedGuard = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
    console.log(`isAuthenticated: ${isAuthenticated}`);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />
}
export default AuthenticatedGuard;
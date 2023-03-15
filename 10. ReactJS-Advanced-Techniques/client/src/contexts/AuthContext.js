import { createContext, useContext } from "react";
import useSessionPersister from '../hooks/useSessionPersister';

// Initialize create context to have intelisense where you use it
export const AuthContext = createContext({ user: {}, userLogin:{}, userLogout:{}});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}

// With HOC
// export const withAuth = (Component) => {
//     const Wrapper = (props) =>{
//         const context = useContext(AuthContext);
//         return(<Component {...props} auth={context}/>);
//     }
//     return Wrapper;
// }

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useSessionPersister({});

    const userLogin = (authData) => {
        setAuth(authData);
    }

    const userLogout = () => {
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout, isAuthenticated: auth !== {} }}>
            {children}
        </AuthContext.Provider>
    )
}

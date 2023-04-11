import {createContext, useContext} from "react";
import useSessionPersister from '../hooks/useSessionPersister';

// Initialize create context to have intellisense where you use it
export const AuthContext = createContext(
    {
        user: {},
        isAuthenticated: false,
        userLogin: () => {
        },
        userLogout: () => {
        }
    });

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider =
    ({
         children
     }) => {
        const [user, setUser, isAuthenticated] = useSessionPersister({});

        const userLogin = (authData) => {
            if (!authData.fullname) {
                authData.fullname = `${authData.firstname} ${authData.lastname}`;
            }
            setUser(authData);
        }

        const userLogout = () => {
            setUser({});
        }

        return (
            <AuthContext.Provider value={{
                user,
                isAuthenticated,
                userLogin,
                userLogout
            }}>
                {children}
            </AuthContext.Provider>
        )
    }

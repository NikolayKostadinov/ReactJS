import { useState } from "react";
import * as userStore from "../services/utils/users_store";

const useSessionPersister = (defaultValue) => {
    const [user, setUser] = useState(() => userStore.getUserData() || defaultValue);

    const persistUser = (newUser) => {
        userStore.setUserData(newUser);
        setUser(newUser);
    }

    return [user, persistUser, userStore.isAuthenticated()]
}
export default useSessionPersister;

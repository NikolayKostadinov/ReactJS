import { useNavigate } from "react-router-dom";
import {useAuthContext} from "../../contexts/AuthContext";

import * as authService from "../../services/authService";

const Logout = () => {
    const navigate = useNavigate();
    const {user, userLogout} = useAuthContext();
    authService.logout(user)
    .then(()=>{
        userLogout();
        navigate('/', {replace:true})
    })
    .catch(()=>{
        navigate('/', {replace:true});
    })

    return null;
}

export default Logout;

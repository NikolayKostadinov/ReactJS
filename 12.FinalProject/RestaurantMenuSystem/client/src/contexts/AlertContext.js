import {createContext, useContext, useState} from "react";
import {delay} from "../components/common/utils/utils.js";

// Initialize create context to have intellisense where you use it
export const AlertContext = createContext({
    show: false,
    fade: false,
    type: 'success',
    message: '',
    showAlert: () => {
    },
    hideAlert: () => {
    },
    showLoading: () => {
    },
    hideLoading: () => {
    }
});

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider =
    ({
         children
     }) => {
        const [show, setShow] = useState(false);
        const [fade, setFade] = useState(false);
        const [loading, setLoading] = useState(false);
        const [type, setType] = useState('success');
        const [message, setMessage] = useState('');

        const showAlert = (message, type, isAutohide = false) => {
            setMessage(message);
            setType(type || 'success');
            setShow(true);
            if (isAutohide) {
                Promise.resolve()
                    .then(() => delay(3000))
                    .then(fadeoutAlert)
                    .then(() => delay(250))
                    .then(hideAlert);
            }
        }


        const fadeoutAlert = () => {
            setFade(true);
        }

        const hideAlert = () => {
            setFade(false);
            setShow(false);
        }

        const showLoading = () => {
            setLoading(true);
        }

        const hideLoading = () => {
            setLoading(false);
        }

        return (
            <AlertContext.Provider value={{
                show,
                fade,
                loading,
                type,
                message,
                showAlert,
                hideAlert,
                showLoading,
                hideLoading
            }}>
                {children}
            </AlertContext.Provider>
        )
    }

const STORE_KEY = 'userData';
const getUserData = () => JSON.parse(localStorage.getItem(STORE_KEY));
const setUserData = (userData) => localStorage.setItem(
    STORE_KEY,
    JSON.stringify(
        {
            _id: userData._id,
            accessToken: userData.accessToken,
            email: userData.email
        }));
const clearUserData = () => localStorage.removeItem(STORE_KEY);
const isAuthenticated = () => getUserData() !== null;

export { clearUserData, getUserData, setUserData, isAuthenticated }

// User session data operations
const STORE_KEY = 'userData';
const getUserData = () => JSON.parse(localStorage.getItem(STORE_KEY));
const setUserData = (userData) => localStorage.setItem( STORE_KEY, JSON.stringify(userData));
const clearUserData = () => localStorage.removeItem(STORE_KEY);
const isAuthenticated = () => !!getUserData()?.username;

export { clearUserData, getUserData, setUserData, isAuthenticated }

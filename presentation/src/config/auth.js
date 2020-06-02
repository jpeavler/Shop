// Returns token if it exists 
export const isLoggedIn = () => {
    const token = localStorage.getItem('auth');
    return token;
}
// Removes token from LocalStorage
export const logout = () => {
    localStorage.removeItem('auth');
}
// Stores the Auth Token in LocalStorage
export const setToken = (token) => {
    localStorage.setItem('auth', token);
}
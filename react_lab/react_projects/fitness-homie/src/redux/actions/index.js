export const authenticateUserLoggedIn = (uid) => {
    return {
        type: 'LOG_IN_SUCCESS',
        payload: uid
    };
};

export const userLoggedOut = () => {
    return {
        type:'LOG_OUT_SUCCESS'
    }
}
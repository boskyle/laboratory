export const authenticateUserLoggedIn = (uid,username) => {
    return {
        type: 'LOG_IN_SUCCESS',
        payload: [uid,username]
    };
};

export const userLoggedOut = () => {
    return {
        type:'LOG_OUT_SUCCESS'
    }
}
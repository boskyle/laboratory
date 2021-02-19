export const loggedInReducer = (state = [], action) => {

    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return [true,action.payload];
        case 'LOG_OUT_SUCCESS':
            return false;
        default:
            return state;
    }
}


export const editBasicReducer = (state =[],action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return [true,action.payload];
        default:
            return state;
    }

}


// as default I can name it any name i want when exporting this function

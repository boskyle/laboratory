const loggedInReducer = (state = false, action) => {

    switch (action.type) {
        case 'LOG_IN_SUCCESS':
            return true;
        case 'LOG_OUT_SUCCESS':
            return false;
        default:
            return state;
    }
}

// as default I can name it any name i want when exporting this function
export  default loggedInReducer;

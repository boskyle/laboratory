export const  saveToLocalStorage = (state,itemName) => {
    try {
        const stringyState = JSON.stringify(state);
        localStorage.setItem(itemName,stringyState);
    } catch (e) {console.log("error")}
}
export const saveToLocalStorageTwo = (uname,itemName) => {
    try {
        const username = JSON.stringify(uname);
        localStorage.setItem(itemName,username);
    }  catch (e) {console.log("error")}
}
 export const loadFromLocalStorage = (itemName) => {
    try {
        const data = localStorage.getItem(itemName);
            if (data === null) return undefined;
            return JSON.parse(data);
    } catch (e) {console.log("error")}
}

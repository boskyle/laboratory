export const  saveToLocalStorage = (state,itemName) => {
    try {
        const stringyState = JSON.stringify(state);
        localStorage.setItem(itemName,stringyState);
    } catch (e) {console.log("error")}
}
 export const loadFromLocalStorage = (itemName) => {
    try {
        const data = localStorage.getItem(itemName);
            if (data === null) return undefined;
            return JSON.parse(data);
    } catch (e) {console.log("error")}
}

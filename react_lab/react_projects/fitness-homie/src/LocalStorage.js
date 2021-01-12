export const  saveToLocalStorage = (state) => {
    try {
        const stringyState = JSON.stringify(state);
        localStorage.setItem('isLogged',stringyState);
    } catch (e) {console.log(e)}
}
 export const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('isLogged');
            if (data === null) return undefined;
            return JSON.parse(data);
    } catch (e) {console.log(e)}
}

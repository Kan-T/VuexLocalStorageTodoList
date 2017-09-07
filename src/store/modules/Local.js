// const Local = function(key){
//     this.get = function () {
//         return JSON.parse(localStorage.getItem(key));
//     }
//     this.set = function (obj) {
//         localStorage.setItem(key,JSON.stringify(obj));
//     }
//     this.clear = function () {
//         localStorage.removeItem(key);
//     }
// }
// export default Local
export default class Local {
    constructor(key) {
        this.name  = key
    };
    get() {
        JSON.parse(localStorage.getItem(this.name));
    };
    set(obj) {
        localStorage.setItem(this.name,JSON.stringify(obj));
    };
    clear() {
        localStorage.removeItem(this.name);
    };
}
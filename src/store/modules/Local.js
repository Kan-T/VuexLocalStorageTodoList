const Local = function(key){
    this.get = function () {
        return JSON.parse(localStorage.getItem(key));
    }
    this.set = function (obj) {
        localStorage.setItem(key,JSON.stringify(obj));
    }
    this.clear = function () {
        localStorage.removeItem(key);
    }
}
export default Local
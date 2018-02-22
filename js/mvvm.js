
class MVVM {
    constructor(options){
        this.options = options || {}
        this.data = this.options.data
        Object.keys(this.data).forEach(key => this._proxy(key))
        this.compile = new Compile(options.el, this)
    }
    _proxy(key){
        let _this = this
        Object.defineProperty(_this, key, {
            get(){
                return _this.data[key]
            },
            set(newVal){
                _this.data[key] = newVal
            }
        })
    }
}


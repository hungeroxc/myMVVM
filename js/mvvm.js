
class MVVM {
    constructor(options){
        this.$options = options || {}
        let data = this._data = this.$options.data
        let me = this

        Object.keys(data).forEach(key => {
            me._proxyData(key)
        })
        this.$compile = new Compile(options.el || document.body, this)
    }
    _proxyData(key){
        let me = this
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get(){
                return me._data[key]
            },
            set(newVal){
                me._data[key] = newVal
            }
        })
    }
}


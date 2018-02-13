
class MVVM {
    constructor(options = {}){
        this.options = options
        this._data = this.options.data
        this.observerable(this._data)
        this.setProxy()
    }
    observerable(value){
        Object.keys(value).forEach(key => 
            this.defineReactive(value, key, value[key])
        )
    }
    defineReactive(obj, key, value){
        let _this = this
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get(){
                return _this._data[key]
            },
            set(newVal){
                
            }
        })
    }
    setProxy(){
        let _this = this
        Object.keys(this._data).forEach(e => {
            Object.defineProperty(_this, e, {
                configurable: false,
                enumerable: true,
                get(){
                    console.log(667)
                    return _this._data[e]
                },
                set(newVal){
                    _this._data[e] = newVale
                }
            })
        })
    }
}



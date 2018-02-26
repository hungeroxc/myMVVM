import Compiler from './Compiler'
import observer from './Observer'

class MVVM {
    constructor(options){
        this.el = options.el
        this.data = options.data

        Object.keys(this.data).forEach(key => {
            this.setProxy(key)
        })

        observer(this.data)
        
        
        new Compiler(this.el, this)
    }
    /** 
     * @param {key}: data对象中的每一个key
     * 
     * @desc: 针对data对象中的每个元素设置代理,
     * 达成目标：vm.data.xxx => vm.xxx
    */
    setProxy(key){
        let _this = this
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get(){
                return _this.data[key]
            },
            set(newVal){
                _this.data[key] = newVal
            }
        })
    }
}

window.MVVM = MVVM
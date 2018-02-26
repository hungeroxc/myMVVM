

/** 
 * @param {data}: vm实例上的data对象
 * 
 * @desc: 
 * 判定data是否存在并且为对象，如果是则进行观测
*/
function observer(data){
    if(!data || typeof data !== 'object'){
        return
    }
    return new Observer(data)
}

/* 观察器 */

class Observer {
    constructor(data){
        this.data = data
        this.walk(data)
    }
    walk(data){
        Object.keys(data).forEach(key => {
            this.bindDescriptor(data, key, data[key])
        })
    }
    /** 
     * @param {data}: data对象;
     * @param {key}: 键;
     * @param {value}: 值;
     * 
     * @desc:
     * ①：获取data对象中的属性，然后放入observer中判定
     *    是否为对象，如果是对象则将该对象作为data放入一个新的
     *    观察器中;
     * ②：为属性设定descriptor，并且检测到设定的新值如果是对象，
     *    则放入一个新观测器中进行观测;
    */
    bindDescriptor(data, key, value){
        let childObj = observer(value)
        Object.defineProperty(data, key, {
            configurable: false,
            enumerable: true,
            get(){
                return value
            },
            set(newVal){
                if(newVal !== value){
                    value = newVal
                    childObj = observer(newVal)
                }
                
            }
        })
    }
}



export default observer
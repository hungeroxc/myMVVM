


function observer(data){
    if(!data || typeof data !== 'object'){
        return
    }
    return new Observer(data)
}

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
    bindDescriptor(data, key, value){
        Object.defineProperty(data, key, {
            configurable: false,
            enumerable: true,
            get(){
                return value
            },
            set(newVal){
                value = newVal
            }
        })
    }
}



export default observer
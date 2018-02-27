import Dep from './Dep'

class Watcher {
    constructor(vm, exp, cb){
        this.vm = vm
        this.exp = exp
        this.cb = cb
        // 设定dep存储器
        this.depIds = {}
        // 保存旧值
        this.oldVal = this.get()
    }
    /** 
     * @desc:
     * ①：设置Dep的标的为该watcher;
     * ②：读取该需要watch的这个属性：比如监听msg就watch msg；
     * ③：
    */
    get(){
        Dep.target = this
        
        let value = this.getVMData()
        Dep.target = null
        return value
    }
    /** 
     * @desc:
     * ①：这一步为重要步骤,首先获取需要读取的属性名；
     * ②：读取该属性，并且触发该属性的getter，触发该属性getter时
     *    跳转到observer中;
     * 
     * 
     * ③：该步骤完结后，vm.data的每个属性都被绑定到了一个watcher实例中，
     *    然后该watcher实例又被放进了一个dep实例中;
    */
    getVMData(){
        let expArr = this.exp.split('.'),
            val = this.vm;
        expArr.forEach(key => {
            val = val[key]
        })
        return val
    }
    /** 
     * 
     * @param {dep}: 在observer中new出来的dep实例
     * 
     * @desc: (由dep实例跳转过来)
     * ①: 将当前dep实例的id作为键，当前dep作为值放入
     *     当前watcher的depIds中
     * ②：执行dep实例中的addSub，也就是将当前watcher添加进
     *    dep实例的subs中
    */
    addDep(dep){
        if(!this.depIds.hasOwnProperty(dep.id)){
            this.depIds[dep.id] = dep
            dep.addSub(this)
        }
    }
    /** 
     * @desc:
     * ①：获取该属性新的值，然后赋值给旧值，再对旧值进行保存；
     * ②：执行更新回调
    */
    update(){
        let newVal = this.get(),
            oldVal = this.oldVal;
        this.oldVal = newVal
        this.cb.call(this.vm, newVal, oldVal)
    }
}

export default Watcher
import Watcher from './Watcher'

/* 一个发布订阅器 */
let uid = 0
class Dep {
    constructor(){
        this.id = uid++
        this.subs = []
    }
    /** 
     * @param {sub}: 当前属性的watcher实例
     * 
     * 
     * @desc 
     * 将当前watcher添加进subs中
    */
    addSub(sub){
        this.subs.push(sub)
    }
    removeSub(sub){
        let index = this.subs.indexOf(sub)
        if (index !== -1) {
            this.subs.splice(index, 1)
        }
    }
    notify(){
        this.subs.forEach(sub => sub.update())
    }
    /** 
     * @desc:(由observer中跳转过来)
     * 在该函数中因为此时的Dep类中的标的为
     * 当前监听属性的watcher，所以可以在该watcher中添加当前的dep
     * 实例当做参数执行addDep
    */
    depend(){
        Dep.target.addDep(this)
    }
}

Dep.target = null

export default Dep
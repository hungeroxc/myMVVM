class Compile {
    constructor(el, vm){
        this.$vm = vm
        this.$el = document.querySelector(el)
        this.$fragment = this.nodeToFragment(this.$el)
        this.compileElement(this.$fragment)
        this.$el.appendChild(this.$fragment)
    }
    nodeToFragment(el){
        
    }
}
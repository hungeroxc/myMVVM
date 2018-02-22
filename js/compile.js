


class Compile {
    constructor(el, vm){
        this.vm = vm
        this.el = document.querySelector(el)
        this.fragment = this.nodeToElement(this.el)
        this.compileElement(this.fragment)
        this.el.appendChild(this.fragment)
    }
    nodeToElement(el){
        let fragment = document.createDocumentFragment(),
            child = el.firstChild
        fragment.appendChild(child)
        return fragment
    }
    compileElement(fragment){
        let text = fragment.textContent,
            reg = /\{\{(.*?)\}\}/g,
            leftRe = /\{\{/,
            rightRe = /\}\}/,
            match = text.match(reg),
            el
        fragment.textContent = ''
        match.forEach(e => {
            text = text.replace(e, () => {
                let str = e.replace(leftRe, '').replace(rightRe, '').trim(),
                
                    result = this._getVMData(this.vm, str)
                return result
            })
        })
        el = document.createTextNode(text)
        fragment.appendChild(el)
        
    }
    _getVMData(vm, exp){
        let expArr = exp.split('.'),
            val = vm
        expArr.forEach(k => {
            val = val[k]
        })
        return val
    }
}
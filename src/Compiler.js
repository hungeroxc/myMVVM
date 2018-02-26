

class Compiler {
    constructor(el, vm){
        this.el = document.querySelector(el)
        this.vm = vm

        /** 真实节点转为假节点 */
        this.fragment = this.nodeToFragment(this.el)
        /** 对假节点进行编译*/
        this.compileElement(this.fragment)
        this.el.appendChild(this.fragment)

    }   
    /** 
     * @param {el}: 获取到页面中的真实节点
     * 
     * @desc: 
     * ①：创建一个假节点;
     * ②：遍历真实节点中的每个子节点：包括文字和元素节点;
     * ③：循环子节点集合并放入假节点中;
     * 
     * @return {fragment}: 包含真实节点内部所有子节点的假节点
    */
    nodeToFragment(el){
        let fragment = document.createDocumentFragment(),
            children = el.childNodes
        Array.from(children).forEach(node => {
            fragment.appendChild(node)
        })
        return fragment
    }
    /** 
     * @param {fragment}: 假节点
     * 
     * @desc: 
     * ①：获取假节点的所有子节点集合;
     * ②：遍历子节点集合并对节点的类型进行判断: 1 => 元素节点 3 => 文本节点
     *    然后针对不同类型的节点选择性编译
     * ③(文本节点): 设定RegExp，如果文本节点中的元素带有mustache语法的双花
     *             括号，则进行文本编译;
     * ③(元素节点): 执行元素节点编译;
    */
    compileElement(fragment){
        let children = fragment.childNodes,
            reg = /\{\{(.*)\}\}/g
        Array.from(children).forEach(node => {
            let text = node.textContent
            if(node.nodeType === 1){
                this.compileNodeElement(node)
            }else if(node.nodeType === 3 && reg.test(text)){
                this.compileTextNode(node)
            }
        })
    }
    /** 
     * @param {textNode}: 文本节点
     * 
     * @desc:
     * ①：获取到文字节点的父元素和文本，创建一个假元素备用，
     *    创建过滤左和右双花括号的正则，获取得到文本中的所有符合mustache语法的文本
     *    数组match;
     * ②：遍历match并用正则过滤其中元素的左右双花括号得到需要查找的键,
     *    获得在data对象中对应该键的值getVMData
     *    把文本中的所有mustache语法进行替换，并赋值给text
     * ③：用text创建一个文本节点，将该文本节点作为子节点放入假节点中
     *    然后在父节点上进行替换
    */
    compileTextNode(textNode){
        let parent = textNode.parentNode,
            fragment = document.createDocumentFragment(),
            text = textNode.textContent,
            reg = /\{\{(.*?)\}\}/g,
            leftReg = /\{\{/,
            rightReg = /\}\}/,
            match = text.match(reg)
        match.forEach(e => {
            let tag = e.replace(leftReg, '').replace(rightReg, '').trim()
            text = text.replace(e, () => {
                let str = this.getVMData(this.vm, tag);
                return str
            })
        })
        let el = document.createTextNode(text)
        fragment.appendChild(el)
        parent.replaceChild(fragment, textNode)
    }
    compileNodeElement(node){
        let children = node.childNodes
        if(children && children.length > 0){
            this.compileElement(node)
        }
        
    }
    /** 
     * @param {vm}: MVVM的实例
     * @param {tag}: 过滤得出的键名
     * 
     * @desc:
     * ①：查找在vm的data对象上符合键名的值，然后返回
     * ②：要注意message.msg这种情况
    */
    getVMData(vm, tag){
        let tagArr = tag.split('.'),
            value = vm
        tagArr.forEach(key => {
            value = value[key]
        })
        return value
    }
}

const directive = {

}

const updater = {

}



export default Compiler
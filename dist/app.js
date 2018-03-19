/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(1);


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
        __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target = this
        
        let value = this.getVMData()
        __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target = null
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

/* harmony default export */ __webpack_exports__["a"] = (Watcher);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Watcher__ = __webpack_require__(0);


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
        if(!this.subs.length > 0){
            this.subs.push(sub)
        }
        
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

/* harmony default export */ __webpack_exports__["a"] = (Dep);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compiler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observer__ = __webpack_require__(4);


class MVVM {
    constructor(options){
        this.el = options.el
        this.data = options.data
        this.computed = options.computed
        this.watch = options.watch
        this.methods = options.methods
        

        Object.keys(this.data).forEach(key => {
            this.setProxy(key)
        })

        

        Object(__WEBPACK_IMPORTED_MODULE_1__Observer__["a" /* default */])(this.data, this)
        
        new __WEBPACK_IMPORTED_MODULE_0__Compiler__["a" /* default */](this.el, this)
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Watcher__ = __webpack_require__(0);



class Compiler {
    constructor(el, vm){
        this.el = document.querySelector(el)
        this.vm = vm


        this.cache = []

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
     * ③-1(文本节点): 设定RegExp，如果文本节点中的元素带有mustache语法的双花
     *             括号，则进行文本编译;
     * ③-2(元素节点): 执行元素节点编译;
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
     * ①：创建标的tokens(标的是一个数组，内部为文本切割后的结果)，假元素，获取文本节点父元素；
     * ②：遍历tokens，若不是tag则以此创建一个文本节点，
     *    如为tag则创建一个空的文本节点并放入指令集中
     *    依据tag进行填充；
     * ③：将文本节点放入假节点中并替换原先的文本节点
     *    
    */
    compileTextNode(textNode){
        let tokens = this.compileText(textNode.textContent),
            fragment = document.createDocumentFragment(),
            parent = textNode.parentNode
        tokens.forEach(token => {
            let el
            if(token.tag){
                el = document.createTextNode("")
                directive.text(el, this.vm, token.value)
            }else{
                el = document.createTextNode(token.value)
            }
            fragment.appendChild(el)
        })
        parent.replaceChild(fragment, textNode)
    }
    /** 
     * @param {text}: 文本节点内文字
     * 
     * @desc: 
     * ①：主要内容为对文本进行切割，切割格式如下:
     *    普通文本|mustache语法文本|普通文本
     * ②：切割完毕后符合mustche语法的文本则为tag；
     * ③：将所有切割后的文本放入tokens中
     * 
     * @return {tokens}
    */
    compileText(text){
        let mustacheRe = /\{\{(.*?)\}\}/g,
            lastIndex = 0,
            tokens = [],
            match, index, value;
        
        while(match = mustacheRe.exec(text)){
            index = match.index
            if(index > lastIndex){
                tokens.push({
                    value: text.slice(lastIndex, index)
                })
            }

            value = match[1]
            tokens.push({
                value,
                tag: true
            })
            lastIndex = index + match[0].length
        }
        if(lastIndex < text.length){
            tokens.push({
                value: text.slice(lastIndex)
            })
        }
        return tokens
    }
    /** 
     * @param {node}: 元素节点
     * 
     * @desc:
     * ①：获取该元素节点的子节点和它的属性;
     * ②：遍历属性列表然后判断属性中是否存在指令病过滤出该指令，
     *    代入指令集中进行处理
    */
    compileNodeElement(node){
        let children = node.childNodes,
            attrs = node.attributes
        Array.from(attrs).forEach(attr => {
            let name = attr.name,
                reg = /:/
            if(this.isDirective(name)){
                let value = attr.value,
                    type = name.substring(2),
                    index, eventType
                if(reg.test(type)){
                    index = reg.exec(type).index,
                    eventType = type.substring(index + 1),
                    type = type.substring(0, index)
                }
                directive[type](node, this.vm, value, type, eventType)
            }
        })
        if(children && children.length > 0){
            this.compileElement(node)
        }
    }
    isDirective(name){
        return name.indexOf('v-') > -1
    }

}

/* 指令集: 包含model, for等常用指令 */
const directive = {
    
    model(node, vm, exp, type){
        this.bindData(node, vm, exp, type)
    },
    text(node, vm, exp, type){
        this.bindData(node, vm, exp, 'text')
    },
    on(node, vm, exp, type, event){
        node.addEventListener(event, vm.methods[exp].bind(vm))
    },
    show(node, vm, exp, type){
        this.bindData(node, vm, exp, type)
    },
    /** 
     * @param {node}: 元素节点
     * @param {vm}: MVVM实例：用于拿data对象中的数据
     * @param {value}: 指令绑定的data中的键
     * @param {type}: 指令类型
     * 
     * 
     * @desc:
     * ①：通过value获取到data中相应的值；
     * ②：执行更新器updater中对应指令的函数进行更新；
     * ③：新建一个watcher实例对该属性进行监听，
     *    传入当前vm，该属性名称，以及触发更新时的回调函数;       
    */
    bindData(node, vm, exp, type, compiler){
        let newVal = this.getVMData(vm, exp),
            updaterView = updater[type]
        updaterView(node, exp, newVal, compiler)

        new __WEBPACK_IMPORTED_MODULE_0__Watcher__["a" /* default */](vm, exp, newVal => {
            updaterView(node, exp, newVal, compiler)
            Object.keys(vm.watch).forEach(key => {
                if(key === exp){
                    vm.watch[key](newVal)
                }
            })
        })
    },
    /** 
     * @param {vm}: MVVM的实例
     * @param {tag}: 过滤得出的键名
     * 
     * @desc:
     * ①：查找在vm的data对象上符合键名的值，然后返回
     * ②：要注意message.msg这种情况
    */
    getVMData(vm, tag){
        let tagArr = tag.trim().split('.'),
            val = vm
        tagArr.forEach(key => {
            val = val[key]
        })
        return val
    }
}


/* 更新器 */
const updater = { 
    model(node, exp, newVal){
        node.value = newVal
        /** 
         * @desc:
         * 当输入新内容时对vm.data的相应属性旧值进行设置
        */
        node.addEventListener('input', e => {
            updater.setVMData(vm, exp, e.target.value)
        })
    },
    text(node, exp, newVal){
        node.textContent = newVal
    },
    show(node, exp, newVal){
        if(!newVal){
            node.style.display = 'none'
        }else{
            node.style.display = 'block'
        }
    },
    /** 
     * 该处触发相应属性的setter
    */
    setVMData(vm, exp, newVal){
        let expArr = exp.split('.'),
            val = vm.data
        expArr.forEach((key, i) => {
            if(i === expArr.length - 1){
                val[key] = newVal
            }else{
                val = val[key]
            }
        })
    }
}



/* harmony default export */ __webpack_exports__["a"] = (Compiler);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(1);


/** 
 * @param {data}: vm实例上的data对象
 * 
 * @desc: 
 * 判定data是否存在并且为对象，如果是则进行观测
*/
function observer(data, vm){
    if(!data || typeof data !== 'object'){
        return
    }
    return new Observer(data, vm)
}

/* 观察器 */

class Observer {
    constructor(data, vm){
        this.data = data
        this.vm = vm
        this.walk(data)
    }
    walk(data){
        Object.keys(data).forEach(key => {
            this.bindDescriptor(data, key, data[key], this.vm)
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
     * ③：new一个Dep实例，在属性的getter和setter中备用
    */
    bindDescriptor(data, key, value, vm){
        let childObj = observer(value),
            dep = new __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */]();
        Object.defineProperty(data, key, {
            configurable: false,
            enumerable: true,
            /** 
             * @desc: (由watcher中跳转过来)
             * 在watcher的getVMData中读取了该属性，触发get函数，
             * 然后因为此时Dep类的标的不为空(此时标的为该属性的watcher),
             * 然后执行依赖注入，此处跳转到new出来的Dep实例
            */
            get(){
                if(__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target){
                    dep.depend()
                }
                return value
            },
            /** 
             * @desc
             * 触发setter，并且将该属性的dep实例里的subs里面的watcher
             * 全部拉出来执行其中的update回调
            */
            set(newVal){
                if(newVal !== value){
                    value = newVal
                    childObj = observer(newVal)
                    dep.notify()
                }
                
            }
        })
    }
}



/* harmony default export */ __webpack_exports__["a"] = (observer);

/***/ })
/******/ ]);
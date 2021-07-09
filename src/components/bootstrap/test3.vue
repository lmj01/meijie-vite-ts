<template>
    <div class="container d-flex">
        <svg id="idSvgGraph" xmlns="http://www.w3.org/2000/svg" width="800pt" height="500pt" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" style="max-width: 100%; height: auto;">
            <circle id="mycircle" cx="400" cy="300" r="50" />
        </svg>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
export default defineComponent({
    name: 'bootstrap.test3',
    setup() {
        const d1 = {
            name: 'root1',
            role: 'role0',
            children: [
                {
                    name: 'level1',
                    role: 'role1',
                    children: [
                        {
                            name: 'level1-1',
                            role: 'role2',
                            children: [],
                        },
                        {
                            name: 'level1-2',
                            role: 'role2',
                            children: [],
                        },
                    ],
                },
                {
                    name: 'level2',
                    role: 'role1',
                    children: [
                        // {
                        //     name: 'level2-1',
                        //     children: [],
                        // },
                        // {
                        //     name: 'level2-2',
                        //     children: [],
                        // },
                        {
                            name: 'level2-3',
                            role: 'role2',
                            children: [
                                {
                                    name: 'level2-3-1',
                                    role: 'role3',
                                    children: [],
                                },
                                {
                                    name: 'level2-3-2',
                                    role: 'role3',
                                    children: [],
                                },
                                {
                                    name: 'level2-3-3',
                                    role: 'role3',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'level3',
                    role: 'role1',
                    children: [
                        {
                            name: 'level3-1',
                            role: 'role2',
                            children: [],
                        },
                        {
                            name: 'level3-2',
                            role: 'role2',
                            children: [],
                        },
                    ],
                },
                {
                    name: 'level4',
                    role: 'role1',
                    children: [
                        {
                            name: 'level4-1',
                            role: 'role2',
                            children: [],
                        },
                        {
                            name: 'level4-2',
                            role: 'role2',
                            children: [],
                        },
                    ],
                },
                {
                    name: 'level5',
                    role: 'role1',
                    children: [
                        {
                            name: 'level5-1',
                            role: 'role2',
                            children: [],
                        },
                        {
                            name: 'level5-2',
                            role: 'role2',
                            children: [],
                        },
                    ],
                },
            ]
        }
        const addChildGraph = (elParent, childData, options) => {
            let el = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            el.classList.add('children')
            if (options.parent) {
                let offset = 0
                if (childData.countParent > 2) {
                    let middle = Math.ceil(childData.countParent / 2)                    
                    if (childData.indexParent < middle) {
                        offset = (childData.indexParent - middle) * options.width
                    } else if (childData.indexParent > middle) {
                        offset = (childData.indexParent - middle) * options.width
                    }
                    console.log(childData.name, middle, offset, childData.countParent, childData.indexParent)
                    // el.style.left = `${offset}px`
                } else if (childData.countParent == 2) {
                    let offset = 0
                    if (childData.indexParent < 2) {
                        offset = -options.width / 2
                    } else {
                        offset = options.width / 2
                    }
                    // el.style.left = `${offset}px`
                } else {
                    // el.style.left = `${0}px`
                }
                let elDiv = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                elDiv.classList.add('bone-lower')
                elDiv.setAttribute('width', '50')
                elDiv.setAttribute('height', '30')
                elDiv.setAttribute('style', 'fill:rgb(0,0,255);stroke-width:1; stroke:rgb(0,0,0);')
                // elDiv.appendChild(document.createElement('div'))
                el.setAttribute('transform', `translate(${100},${options.height})`)
                el.appendChild(elDiv)
            } else {
                el.classList.add('root')
                el.setAttribute('width', '100%')
                el.setAttribute('height', '100%')
                el.setAttribute('x', '50%')
                el.setAttribute('y', '0%')
                let elRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                elRect.setAttribute('width', '96%')
                elRect.setAttribute('height', '96%')
                elRect.setAttribute('style', 'fill:#ffffff;stroke:transparent;')
                elRect.setAttribute('transform', `translate(${-2}%,${-2}%)`)
                // elRect.setAttribute('style', 'fill:#ffffff;')
                el.appendChild(elRect)
            }
            let elChild = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            elChild.classList.add('graph-item')
            switch(childData.role) {
                case 'role0':
                    elChild.classList.add('role0')
                    break
                case 'role1':
                    elChild.classList.add('role1')
                    break
                case 'role2':
                    elChild.classList.add('role2')
                    break
                case 'role3':
                    elChild.classList.add('role3')
                    break
            }
            let p = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            p.setAttribute('x', '0')
            p.setAttribute('y', '20')
            p.textContent = childData.name
            elChild.appendChild(p)
            let elDocked = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            elDocked.classList.add('docked-item')
            elDocked.setAttribute('transform', `translate(${50},${0})`)
            elDocked.appendChild(elChild)

            if (options.child) {
                // let elDiv = document.createElementNS('http://www.w3.org/2000/svg', 'g')
                // elDiv.classList.add('bone-upper')                
                // elDiv.setAttribute('width', '200')
                // elDiv.setAttribute('height', '200')
                // elDiv.setAttribute('style', 'fill:rgb(0,255,255);')
                // elDocked.appendChild(elDiv)
            }
            el.appendChild(elDocked)
            elParent.appendChild(el)
            return elDocked
        }
        const visitGraph = (elParent, graphData, options) => {
            let elNewParent = addChildGraph(elParent, graphData, options)
            options.height += 10
            for (let i = 0; i < graphData.children.length; i++) {
                let child = graphData.children[i]
                options.parent = true
                options.child = child.children.length > 0
                options.indexChild = i+1
                options.countChild = child.children.length
                child.countParent = graphData.children.length
                child.indexParent = i + 1
                visitGraph(elNewParent, child, options)
            }
        }
        // z-index自定义属性，z-index越大层级越高
        const svgZIndex = (elRoot) => {
            let elList = []
            for (let i = 0; i < elRoot.length; i++) {
                let el = elRoot[i]
                // 可能某些元素没有getAttribute
                if (!el.getAttribute) continue
                // 递归子节点
                if (el.childNodes) {
                    svgZIndex(el.childNodes)
                }
                // 默认都是第1级
                if (!el.getAttribute('z-index')) {
                    el.setAttribute('z-index', 1)
                }
                elList.push(el)
            }
            elList.sort(function(e1, e2) {
                let z1 = e1.getAttribute('z-index')
                let z2 = e2.getAttribute('z-index')
                if (z1 === z2) {
                    return 0
                } else if (z1 < z2) {
                    return -1
                }
                return 1
            })
            let elParent = elList[0] && elList[0].parentNode
            for (let i = 0; i < elList.length; i++) {
                let el = elList[i]
                // 如果el在页面中存在，会自动移动到末尾追加，不是新建
                elParent.appendChild(el)
            }
        }
        const drawGraph = () => {
            let elSvg = document.getElementById('idSvgGraph')
            let options = {
                child: true, 
                parent: false,
                indexChild: 1,
                countChild: d1.children.length,
                width: 200,
                height: 0,
            }
            d1.countParent = 1
            d1.indexParent = 1
            visitGraph(elSvg, d1, options)
        }
        onMounted(() => {
            drawGraph()
        })
        return {

        }
    }
})
</script>
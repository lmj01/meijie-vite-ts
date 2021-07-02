<template>
    <div class="container d-flex">
        <div style="width: 300px">
            <img src="/images/animate.svg" />
            <img src="/images/spheres.svg" />
        </div>
        <div id="idGraph" class="graph-organization">
            
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
export default defineComponent({
    name: 'bootstrap.test2',
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
            let el = document.createElement('div')
            el.classList.add('children')
            if (options.parent) {
                if (childData.countParent > 2) {
                    let middle = Math.ceil(childData.countParent / 2)
                    let offset = 0
                    if (childData.indexParent < middle) {
                        offset = (childData.indexParent - middle) * options.width
                    } else if (childData.indexParent > middle) {
                        offset = (childData.indexParent - middle) * options.width
                    }
                    console.log(childData.name, middle, offset, childData.countParent, childData.indexParent)
                    el.style.left = `${offset}px`
                } else if (childData.countParent == 2) {
                    let offset = 0
                    if (childData.indexParent < 2) {
                        offset = -options.width / 2
                    } else {
                        offset = options.width / 2
                    }
                    el.style.left = `${offset}px`
                } else {
                    el.style.left = `${0}px`
                }
                let elDiv = document.createElement('div')
                elDiv.classList.add('bone-lower')
                elDiv.appendChild(document.createElement('div'))
                el.appendChild(elDiv)
            } else {
                el.classList.add('root')
            }
            let elWrapper = document.createElement('div')
            elWrapper.classList.add('graph-item-wrapper')
            let elChild = document.createElement('div')
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
            let p = document.createElement('p')
            p.textContent = childData.name
            elChild.appendChild(p)
            if (options.child && options.countChild > 1) {
                let input = document.createElement('input')
                input.setAttribute('type', 'checkbox')                
                input.addEventListener('change', (event) => {
                    console.log('-checkbox--', event, event.target.checked)
                    let forefathers = input.parentElement.parentElement.parentElement
                    let isRoot = forefathers.children.length == 3
                    if (event.target.checked) {
                        forefathers.children[isRoot?1:2].style.display = 'none'
                        forefathers.children[isRoot?2:3].style.display = 'none'
                    } else {
                        forefathers.children[isRoot?1:2].style.display = 'block'
                        forefathers.children[isRoot?2:3].style.display = 'block'
                    }
                }, false)
                elChild.appendChild(input)
            }
            elWrapper.appendChild(elChild)
            let elDocked = document.createElement('div')
            elDocked.classList.add('docked-item')
            el.appendChild(elWrapper)

            if (options.child) {
                let elDiv = document.createElement('div')
                elDiv.classList.add('bone-upper')
                elDiv.appendChild(document.createElement('div'))
                if (options.countChild > 1) {
                    let child2 = document.createElement('div')
                    let widthAll = options.width
                    let left = 0 
                    if (options.countChild > 2) {
                        widthAll = (options.countChild - 1) * options.width                            
                        let halfWidth = Math.ceil(options.width / 2)
                        if (options.countChild % 2 == 1) {
                            // 奇数
                            left = Math.ceil(widthAll / 2) - halfWidth
                        } else {
                            // 偶数
                            left = halfWidth
                        }
                    } else {

                    }
                    child2.style.width = `${widthAll}px`
                    if (Math.abs(left) > 10) child2.style.left = `-${left}px`
                    elDiv.appendChild(child2)
                }
                el.appendChild(elDiv)
            }
            el.appendChild(elDocked)
            elParent.appendChild(el)
            return elDocked
        }
        const visitGraph = (elParent, graphData, options) => {
            let elNewParent = addChildGraph(elParent, graphData, options)
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
        const drawGraph = () => {
            let elDiv = document.getElementById('idGraph')
            let options = {
                child: true, 
                parent: false,
                indexChild: 1,
                countChild: d1.children.length,
                width: 200,
            }
            elDiv.style.setProperty('--item-unit-width', `${options.width}px`)
            elDiv.style.setProperty('--item-all-width', `${1400}px`)
            d1.countParent = 1
            d1.indexParent = 1
            visitGraph(elDiv, d1, options)
        }
        onMounted(() => {
            drawGraph()
        })
        return {

        }
    }
})
</script>
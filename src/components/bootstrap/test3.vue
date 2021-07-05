<template>
    <div class="container d-flex">
        <svg id="idSvgGraph" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
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
                let elDiv = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                elDiv.classList.add('bone-lower')
                elDiv.setAttribute('width', '100')
                elDiv.setAttribute('height', '30')
                elDiv.setAttribute('style', 'fill:rgb(0,0,255);stroke-width:1; stroke:rgb(0,0,0);')
                elDiv.appendChild(document.createElement('div'))
                el.setAttribute('transform', `translate(${offset},${options.height})`)
                el.appendChild(elDiv)
            } else {
                el.classList.add('root')
                el.setAttribute('width', '100%')
                el.setAttribute('height', '100%')
                el.setAttribute('x', '50%')
                el.setAttribute('y', '0%')
            }
            let elWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            elWrapper.classList.add('graph-item-wrapper')
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
            p.setAttribute('x', '25')
            p.setAttribute('y', '50')
            p.textContent = childData.name
            elChild.appendChild(p)
            elWrapper.appendChild(elChild)
            let elDocked = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            elDocked.classList.add('docked-item')
            el.appendChild(elWrapper)

            if (options.child) {
                let elDiv = document.createElementNS('http://www.w3.org/2000/svg', 'g')
                elDiv.classList.add('bone-upper')                
                elDiv.setAttribute('width', '200')
                elDiv.setAttribute('height', '200')
                elDiv.setAttribute('style', 'fill:rgb(0,255,255);')
                el.appendChild(elDiv)
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
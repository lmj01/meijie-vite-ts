import * as d3 from 'd3'

export function d3Tree(vWidth, vHeight, treeData) {

    const ud = {
        id: 0,
        mt: 20, // margin-top
        mr: 90,
        mb: 30, 
        ml: 90,
        width: 0,
        height: 0,
        svg: null,
        g: null,
        gTx: 0, // g element translate x
        gTy: 0, 
        oPosX: -1, // old position x
        oPosY: -1,
        scale: 1, //
        duration: 750, //         
    }
    ud.gTx = ud.ml
    ud.gTy = ud.mt
    ud.width = vWidth - ud.ml - ud.mr
    ud.height = vHeight - ud.mt - ud.mb
    const rc = { // rectangle
        width: 200,
        height: 100,
        titleWidth: 80,
        titleHeight: 40,
    }
    const roleList = ['销售经理', '大区经理', '省区经理', '城市经理', '经销商']

    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([ud.width, ud.width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(treeData, d => d.children);
    console.log('-nodes hierarchy-', nodes)
    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // Normalize for fixed-depth.
    const dInfo = {
        h: 0,
        idx: 0,
        oldParent: null,
    }
    nodes.each(function(node, index){
        node.id = index
        node.y = node.depth * (rc.width * 2)
        let countBrother = 0
        if (node.parent) {
            if (node.parent.children) {
                countBrother = node.parent.children.length
            }
            if (node.parent != dInfo.oldParent) {
                dInfo.oldParent = node.parent
                node.idx = 0
            }
        }
        if (node.depth == 1) {
            dInfo.h = 1
            dInfo.idx++
        } else if (node.depth == 2) {
            if (dInfo.h == 1) dInfo.idx = 0
            dInfo.h = 2
            dInfo.idx++
        } else if (node.depth == 3) {
            if (dInfo.h == 2) dInfo.idx = 0
            dInfo.h = 3
            dInfo.idx++
        }
        if (countBrother > 0) {
            if (dInfo.h == 1) {
                let mid = countBrother / 2
                console.log(index, '-change', dInfo.idx, countBrother, mid, mid - dInfo.idx)
                if (mid >= dInfo.idx) {
                    node.x += (rc.width * 2.5) * (Math.floor(mid) - dInfo.idx + 1)
                    node.part = 'right'    
                } else {
                    node.x += (rc.width * 2.5) * (Math.floor(mid) - dInfo.idx)
                    node.x -= rc.width / 4
                    node.part = 'left'
                }    
            } else if (dInfo.h == 2) {
                let mid = countBrother / 2
                let parentX = node.parent.x
                console.log(index, '-change', dInfo.idx, countBrother, mid, mid - dInfo.idx)
                if (mid >= dInfo.idx) {
                    // node.x += (rc.width * 2.5) * (Math.floor(mid) - dInfo.idx + 1)
                    // node.part = 'right'    
                    node.x = parentX + (rc.width * 2.5)
                } else {
                    // node.x += (rc.width * 2.5) * (Math.floor(mid) - dInfo.idx)
                    // node.x -= rc.width / 4
                    // node.part = 'left'
                    node.x = parentX - (rc.width * 2.5)
                }
            } else {
                let mid = countBrother / 2
                console.log(index, '-change', dInfo.idx, countBrother, mid, mid - dInfo.idx)
                if (mid >= dInfo.idx) {
                    node.x += (rc.width * 2.5) * (Math.floor(mid) - dInfo.idx + 1)
                    node.part = 'right'    
                } else {
                    node.x += (rc.width * 2.5) * (Math.floor(mid) - dInfo.idx)
                    node.x -= rc.width / 4
                    node.part = 'left'
                }
            }
        }
        // if (dInfo.h >= 1 && countBrother > 0) {
        //     let mid = countBrother / 2
        //     console.log(index, '-change', dInfo.idx, countBrother, mid, mid - dInfo.idx)
        //     if (mid >= dInfo.idx) {
        //         node.x += (rc.width * 2.5) * (Math.floor(mid) - dInfo.idx + 1)
        //         node.part = 'right'    
        //     } else {
        //         node.x += (rc.width * 2.5) * (Math.floor(mid) - dInfo.idx)
        //         node.x -= rc.width / 4
        //         node.part = 'left'
        //     }
        // } else if (dInfo.h == 2 && countBrother > 0)
        console.log(index, `node name ${node.name}, ${node.x}, ${node.y}`, node)
    })
    const clickNode = (event, node) => {
        const [[x0, y0], [x1, y1]] = d3.geoPath().bounds(node);
        console.log('-clieckd-', x0, x1, y0, y1)
        console.log('-click node-', node)
        // if (node.children) {
        //     node._children = node.children;
        //     node.children = null;
        // } else {
        //     node.children = node._children;
        //     node._children = null;
        // }
        updateAll(node)
    }
    const collapse = (node: any) => {
        if (node.children) {
            node._children = node.children;
            node._children.forEach(collapse);
            node.children = null;
        }
    }
    // treeData.children.forEach(collapse);

    // d3的缩放时，是有一个缩放中心点的，就是鼠标所在位置，        
    const zoom = d3.zoom()
        .extent([0, 0,], [vWidth, vHeight])
        .scaleExtent([0.1, 4])
        .on('zoom', ({sourceEvent, transform}) => {
            let offsetX = sourceEvent.clientX - ud.oPosX
            let offsetY = sourceEvent.clientY - ud.oPosY
            ud.gTx += offsetX
            ud.gTy += offsetY
            ud.oPosX = sourceEvent.clientX
            ud.oPosY = sourceEvent.clientY
            ud.scale = transform.k
            ud.g.attr("transform", `translate(${ud.gTx},${ud.gTy})  scale(${ud.scale})`);
        })
        .on('start', ({sourceEvent})=>{
            ud.oPosX = sourceEvent.clientX
            ud.oPosY = sourceEvent.clientY
        })

    const updateAll = (source) => {
        if (!ud.g) return
        // adds the links between the nodes
        const link = ud.g.selectAll('.link')
            .data(nodes.descendants().slice(1))
            .enter()
            .append('path')
            .attr('class', 'link')
            // .style('stroke', d => d.data.level)
            .style('stroke', 'purple')
            // .attr('d', d => `M ${d.x},${d.y} C ${(d.y + d.parent.y) / 2},${d.x} ${(d.y + d.parent.y) / 2},${d.parent.x} ${d.parent.x},${d.parent.y}`)
            .attr('d', d => {
                // console.log('-link-', d)
                if (d.depth == 1) {
                    let cx1 = d.x + rc.width
                    let cy1 = d.y + rc.height + rc.height * 0.5
                    let cx2 = d.parent.x + rc.width
                    let cy2 = d.parent.y + rc.height + rc.height * 0.5
                    let cx3 = cx1
                    let cy3 = cy1 + (cy2 - cy1) * 0.8
                    let cx4 = cx2
                    let cy4 = cy1 + (cy2 - cy1) * 0.8
                    return `M ${cx1},${cy1} L ${cx3},${cy3} L ${cx4},${cy4} L ${cx2},${cy2}`
                } else {
                    let cx1 = d.x + rc.width
                    let cy1 = d.y + rc.height + rc.height * 0.5
                    let cx2 = d.parent.x + rc.width
                    let cy2 = d.parent.y + rc.height + rc.height * 0.5
                    return `M ${cx1},${cy1} L ${cx2},${cy2}`
                }
            })
            // .attr('d', linkFunc)

        // adds each node as a group
        const node = ud.g.selectAll('.node')
            .data(nodes.descendants())
            .enter()
            .append("g")
            .attr('class', d => `node ${d.children ? 'node--internal':'node--leaf'}`)
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .on('click', clickNode)
        
        // node size
        node.append('rect')
            .attr('width', rc.width*2)
            .attr('height', rc.height*2)
            // .style('stroke', 'purple')
            .style("fill", 'transparent')

        // body group
        const bodyGroup = node.append('g')
            .attr('class', 'body-group')
            .attr('transform', `translate(${rc.width/2},${rc.height/2})`)

        bodyGroup.append('rect')
            .attr('class', 'body-box')
            .attr('width', rc.width)
            .attr('height', rc.height)
            .style("fill", d => d.children ? "lightsteelblue" : "yellow")
        
        bodyGroup.append('text')
            .attr('transform', `translate(${rc.width/4},${rc.height*0.2})`)
            .attr('dy', '.35em')
            .text(d => '姓名'+ d.data.name)
            .style("fill-opacity", 0.5);
        
        bodyGroup.append('text')
            .attr('transform', `translate(${rc.width/4},${rc.height*0.4})`)
            .attr('dy', '.35em')
            .text(d => '电话' + d.data.name)
            .style("fill-opacity", 0.5);
        
        bodyGroup.append('text')
            .attr('transform', `translate(${rc.width/4},${rc.height*0.6})`)
            .attr('dy', '.35em')
            .text(d => '邮件' + d.data.name)
            .style("fill-opacity", 0.5);
        

        // title group
        const titleGroup = node.append('g')
            .attr('class', 'title-group')
            .attr('transform', `translate(${rc.width/2-rc.titleWidth*0.5},${rc.height/2-rc.titleHeight*0.5})`)

        titleGroup.append('rect')
            .attr('class', 'title-box')
            .attr('width', rc.titleWidth)
            .attr('height', rc.titleHeight)
            .style("fill", d => d.children ? "lightsteelblue" : "yellow")

        titleGroup.append('text')
            .attr('transform', `translate(${rc.titleWidth/6},${rc.titleHeight*0.5})`)
            .attr('dy', '.35em')
            .text(d => `${roleList[d.depth]}-${d.id}`)
            .style("fill-opacity", 0.5);
    }
    
    const drawGraph = (elId: string) => {
        let elRoot = document.getElementById(elId)
        ud.svg = d3.select(`#${elId}`)
            .append('svg')
            .attr('viewBox', [0, 0, vWidth, vHeight])
            .attr('width', vWidth)
            .attr('height', vHeight)
        
        ud.g = ud.svg.append('g')
            .attr('transform', `translate(${ud.gTx},${ud.gTy}) scale(${ud.scale})`)

        ud.svg.call(zoom)

        updateAll(nodes)        
    }   

    return {
        drawGraph,
    }
}

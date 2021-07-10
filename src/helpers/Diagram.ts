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

    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([ud.width, ud.width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(treeData, d => d.children);
    console.log('-nodes hierarchy-', nodes)
    // maps the node data to the tree layout
    nodes = treemap(nodes);
    nodes.x0 = ud.height / 2;
    nodes.y0 = 0;

    // Normalize for fixed-depth.
    nodes.each(function(node){ 
        node.y = node.depth * 180
        // add margin for each node
        node.x += node.depth * (rc.width + rc.titleWidth)
        node.y += node.depth * (rc.height + rc.titleHeight) 
    })

    const mouseMoved = (item) => {        
        const {sourceEvent, transform} = item
        // console.log('-zoom-', sourceEvent, sourceEvent.type, transform)
        if (ud.oPosX < 0) ud.oPosX = sourceEvent.clientX
        if (ud.oPosY < 0) ud.oPosY = sourceEvent.clientY
        let offsetX = sourceEvent.clientX - ud.oPosX
        let offsetY = sourceEvent.clientY - ud.oPosY
        if (Number.isNaN(transform.x)) {
            transform.x = 0
        }
        if (Number.isNaN(transform.y)) {
            transform.y = 0
        }
        ud.gTx += offsetX
        ud.gTy += offsetY

        ud.oPosX = sourceEvent.clientX
        ud.oPosY = sourceEvent.clientY
        ud.g.attr("transform", `translate(${ud.gTx},${ud.gTy})  scale(${ud.scale})`);
        // console.log('zoom', offsetX, offsetY, ud.gTx, ud.gTy, sourceEvent.clientX, sourceEvent.clientY)
    }
    const clickNode = (event, node) => {
        const [[x0, y0], [x1, y1]] = d3.geoPath().bounds(node);
        console.log('-clieckd-', x0, x1, y0, y1)
        console.log('-click node-', node)
        if (node.children) {
            node._children = node.children;
            node.children = null;
        } else {
            node.children = node._children;
            node._children = null;
        }
        updateAll(node)
    }
    const collapse = (node: any) => {
        if (node.children) {
            node._children = node.children;
            node._children.forEach(collapse);
            node.children = null;
        }
    }
    treeData.children.forEach(collapse);

    const linkFunc = 
        // d3.linkVertical()
        //     .x(d => d.x)
        //     .y(d => d.y)
        d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x)

    // d3的缩放时，是有一个缩放中心点的，就是鼠标所在位置，        
    const zoom = d3.zoom()
        .extent([0, 0,], [vWidth, vHeight])
        .scaleExtent([1, 8])
        .on('zoom', mouseMoved)
        // .on('zoom', function({transform, sourceEvent}){
        //     console.log('--', transform, sourceEvent.target, sourceEvent, this)
        //     // ud.g.attr("transform", transform);
        //     // ud.g.attr("stroke-width", 1 / transform.k);
        //     // nodes.each(function(node){
        //     //     console.log('-on zoom nodeaa-', node)
        //     //     // node.attr("transform", d => `translate(${d.y},${d.x})`)
        //     //  })
        // })

    const updateAll = (source) => {
        if (!ud.g) return
        // adds the links between the nodes
        const link = ud.g.selectAll('.link')
            .data(nodes.descendants().slice(1))
            .enter()
            .append('path')
            .attr('class', 'link')
            .style('stroke', d => d.data.level)
            .attr('d', d => `M ${d.y+200},${d.x} C ${(d.y + d.parent.y) / 2},${d.x} ${(d.y + d.parent.y) / 2},${d.parent.x} ${d.parent.y},${d.parent.x}`)
            // .attr('d', linkFunc)

        // adds each node as a group
        const node = ud.g.selectAll('.node')
            .data(nodes.descendants())
            .enter()
            .append("g")
                .attr('class', d => `node ${d.children ? 'node--internal':'node--leaf'}`)
                .attr('transform', d => `translate(${d.y},${d.x})`)
                .on('click', clickNode)
                
        // body group
        const bodyGroup = node.append('g').attr('class', 'body-group')

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
            .attr('transform', `translate(${-rc.titleWidth*0.5},${-rc.titleHeight*0.5})`)

        titleGroup.append('rect')
            .attr('class', 'title-box')
            .attr('width', rc.titleWidth)
            .attr('height', rc.titleHeight)
            .style("fill", d => d.children ? "lightsteelblue" : "yellow")

        titleGroup.append('text')
            .attr('transform', `translate(${rc.titleWidth/6},${rc.titleHeight*0.5})`)
            .attr('dy', '.35em')
            .text(d => '角色' + d.data.name)
            .style("fill-opacity", 0.5);
    }
    
    const drawGraph = (elId: string) => {
        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
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

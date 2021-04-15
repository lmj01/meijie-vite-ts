export default {
    install: (app) => {        
        app.directive('drag', {
            mounted(el, binding, vnode, oldVnode) {
                let oldEl = el;
                let elParent = el.parentNode;
                document.onselect = function() {
                    return false;
                };
                oldEl.onmousedown = function(event) {
                    let offsetX = event.clientX - oldEl.offsetLeft;
                    let offsetY = event.clientY - oldEl.offsetTop;
                    const rect = elParent.getBoundingClientRect();
                    document.onmousemove = function(e) {
                        const rc = oldEl.getBoundingClientRect();
                        let left = Math.max(e.clientX - offsetX, 0);
                        let top = Math.max(e.clientY - offsetY, 0);                        
                        left = Math.min(left, rect.right - rect.left - rc.width);
                        top = Math.min(top, rect.bottom - rect.top - rc.height);
                        oldEl.style.left = `${left}px`;
                        oldEl.style.top = `${top}px`;
                        console.log(left, top, rect, rc);
                    }
                    document.onmouseup = function(e) {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }
                    return false;
                }
            }
        })

        app.directive('resize', {
            mounted(el, binding, vnode, oldVnode) {
                console.log(binding.arg);
                const minPaneSize = 150;
                const maxPaneSize = document.body.clientWidth * 0.8;
                let elParent = el.parentNode;
                let elUncle = elParent.nextElementSibling;
                let elGrandFather = elParent.parentNode;
                const setPaneWidth = (width) => {
                    elParent.style.setProperty('--resizeable-width', `${width}px`);
                    elUncle.style.setProperty('--resizeable-width', `${width}px`);
                    vnode.el.click()
                }
                const setPaneWidth2 = (width) => {
                    elParent.style.setProperty('--resizeable-width', `${width}%`);
                    elUncle.style.setProperty('--resizeable-width', `${width}%`);
                    vnode.el.click()
                }
                const toNumber = (str) => {
                    return parseInt(str, 10);
                }
                const getPaneWidth = () => {
                    const pxWidth = getComputedStyle(elParent).getPropertyValue('--resizeable-width');
                    return parseInt(pxWidth, 10);
                }
                const getPaneWidth2 = () => {
                    let style1 = getComputedStyle(elGrandFather);
                    let style2 = getComputedStyle(elParent);
                    let w1 = toNumber(style1.width);
                    let w2 = toNumber(style2.width);
                    let res = parseInt(w2 / w1 * 100)
                    console.log('--pane', w1, w2, res);
                    return {
                        widthTotal: w1,
                        width: w2,
                        per: res,
                    }
                }
                const startDragging = (event) => {
                    console.log('start draging--', event);
                    event.preventDefault();
                    const startingPaneWidth = getPaneWidth();
                    const xOffset = event.pageX;
                    const mouseDragHandle = (moveEvent) => {
                        moveEvent.preventDefault();
                        const primaryButtonPressed = moveEvent.buttons === 1;
                        if (!primaryButtonPressed) {
                            setPaneWidth(Math.min(Math.max(getPaneWidth(), minPaneSize), maxPaneSize));
                            // setPaneWidth2(getPaneWidth2());
                            document.body.removeEventListener('pointermove', mouseDragHandle);
                            return;
                        }
                        // const paneOriginAdjustment = 'left' === 'right' ? 1 : -1;
                        const paneOriginAdjustment = binding.arg === 'right' ? 1 : -1;
                        // console.log('--', paneOriginAdjustment);
                        setPaneWidth((xOffset - moveEvent.pageX) * paneOriginAdjustment + startingPaneWidth);                        
                        // let varWidth = (xOffset - moveEvent.pageX) * paneOriginAdjustment;                        
                        // setPaneWidth2(parseInt((startingPaneWidth.width + varWidth) / startingPaneWidth.widthTotal * 100))
                    };
                    document.body.addEventListener('pointermove', mouseDragHandle);
                }
                el.addEventListener('mousedown', startDragging);
            }
        })

        app.directive('resizev', {
            mounted(el, binding, vnode, oldVnode) {
                console.log(binding.arg);
                const minPaneSize = 150;
                const maxPaneSize = document.body.clientHeight * 0.8;
                let elEldest = el.previousElementSibling;
                let elYounger = el.nextElementSibling;
                const setPaneHeight = (height) => {
                    elEldest.style.setProperty('--resizeable-height', `${height}px`);
                    elYounger.style.setProperty('--resizeable-height', `${height}px`);
                    vnode.el.click()
                }
                const getPaneHeight = () => {
                    const pxHeight = getComputedStyle(elEldest).getPropertyValue('--resizeable-height');
                    return parseInt(pxHeight, 10);
                }
                const startDragging = (event) => {
                    event.preventDefault();
                    const startingPaneWidth = getPaneHeight();
                    const yOffset = event.pageY;
                    const mouseDragHandle = (moveEvent) => {
                        moveEvent.preventDefault();
                        const primaryButtonPressed = moveEvent.buttons === 1;
                        if (!primaryButtonPressed) {
                            setPaneHeight(Math.min(Math.max(getPaneHeight(), minPaneSize), maxPaneSize));
                            document.body.removeEventListener('pointermove', mouseDragHandle);
                            return;
                        }
                        const paneOriginAdjustment = binding.arg === 'up' ? -1 : 1;
                        setPaneHeight((yOffset - moveEvent.pageY) * paneOriginAdjustment + startingPaneWidth);                        
                    };
                    document.body.addEventListener('pointermove', mouseDragHandle);
                }
                el.addEventListener('mousedown', startDragging);
            }
        })

        app.mixin({
            created() {
                // some login
            }
            //...
        })
    }
}
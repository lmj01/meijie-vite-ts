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
                // elParent.style.setProperty('--max-width', `${maxPaneSize}px`);
                // elParent.style.setProperty('--min-width', `${minPaneSize}px`);
                const setPaneWidth = (width) => {
                    elParent.style.setProperty('--resizeable-width', `${width}px`);
                    elUncle.style.setProperty('--resizeable-width', `${width}px`);
                    // if (binding.arg == 'fResize') {
                        // console.log(binding.arg, vnode);
                        vnode.el.click()
                        // binding.arg()
                        // vnode.context.$emit('click');
                    // }
                }
                const getPaneWidth = () => {
                    const pxWidth = getComputedStyle(elParent).getPropertyValue('--resizeable-width');
                    return parseInt(pxWidth, 10);
                }
                const startDragging = (event) => {
                    // console.log('start draging--');
                    event.preventDefault();
                    const startingPaneWidth = getPaneWidth();
                    const xOffset = event.pageX;
                    const mouseDragHandle = (moveEvent) => {
                        moveEvent.preventDefault();
                        const primaryButtonPressed = moveEvent.buttons === 1;
                        if (!primaryButtonPressed) {
                            setPaneWidth(Math.min(Math.max(getPaneWidth(), minPaneSize), maxPaneSize));
                            document.body.removeEventListener('pointermove', mouseDragHandle);
                            return;
                        }
                        // const paneOriginAdjustment = 'left' === 'right' ? 1 : -1;
                        const paneOriginAdjustment = binding.arg === 'right' ? 1 : -1;
                        // console.log('--', paneOriginAdjustment);
                        setPaneWidth((xOffset - moveEvent.pageX) * paneOriginAdjustment + startingPaneWidth);                        
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
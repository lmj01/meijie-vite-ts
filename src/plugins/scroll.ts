export default {
    install: (app: any) => {        
        app.directive('scroll', {
            updated(el: Element, binding: any) {
                if (el.parentElement) {
                    const style = getComputedStyle(el.parentElement);
                    if (el.clientHeight > parseInt(style.height || '', 10)) {
                        binding.instance.ud.scroll = true;
                    } else {
                        binding.instance.ud.scroll = false;
                    }
                }
            }
        })
    }
}
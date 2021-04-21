import {AppEngine} from './App'
import {AppEngine2} from './App2'
export interface AppOptions {
    canvas: HTMLCanvasElement | HTMLElement;
    width: number,
    height: number,
    showAxes?: boolean | null,
    axesSize?: number | null,
}

export function initEngineByCanvas(idCanvas: string, engine: AppEngine | AppEngine2) {
    let canvas = document.getElementById(idCanvas)
    if (canvas) {
        let elParent = canvas.parentElement;
        if (elParent) {
            let style = getComputedStyle(elParent);
            let width = parseInt(style.width || '200px');
            let height = parseInt(style.height || '300px');
            const appOptions: AppOptions = {
                canvas: canvas,
                width: width,
                height: height,
                showAxes: true,     
                axesSize: 5,   
            };
            engine.initial(appOptions);      
            engine.loop();
        }
    }
}
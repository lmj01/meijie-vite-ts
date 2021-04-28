import {
    Texture,
} from 'three/build/three.module'
import {canvas2png} from '@/helpers/MjCanvas'

export interface TextParameter {
    text: string,
    fontsize: number,
    rotate45: boolean,
}

export function createTextTexture(tPara: TextParameter) {
    return new Promise((resolve)=>{
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 256;
        const borderThickness = 1;
        // const bg = { r: 1, g: 1, b: 1, a: 1};
        canvas.width = canvas.height = size;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        if (ctx) {
            ctx.font = `${tPara.fontsize}px serif`;        
            let metrics = ctx.measureText(tPara.text);
            console.log('--', metrics)
            // ctx.strokeStyle = `rgba(${bg.r},${bg.g},${bg.b},${bg.a})`;
            // ctx.lineWidth = borderThickness / 4;
            ctx.save();
            // ctx.fillStyle = `rgba(${bg.r*255},${bg.g*255},${bg.b*255},${bg.a})`;
            ctx.fillStyle = `red`;
            ctx.fillRect(0, 0, size, size);
            if (tPara.rotate45) {
                ctx.rotate(45 * Math.PI / 180);
                ctx.translate(size/16, -size/8);
            }
            // 字体颜色
            // ctx.fillStyle = `rgba(255,255,255,1)`;
            ctx.fillStyle = `blue`;
            // ctx.fillText(tPara.text, 50, tPara.fontsize + borderThickness + 20);
            ctx.fillText(tPara.text, 0, metrics.width);
            ctx.restore();
        }
        // canvas2png(canvas)
        resolve(new Texture(canvas));
    })
}
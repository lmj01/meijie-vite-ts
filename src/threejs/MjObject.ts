import {
    Line,
    LineBasicMaterial,
    Texture,
    SpriteMaterial,
} from 'three/build/three.module'
import { Sprite } from 'babylonjs';

export class MjLine extends Line {
    constructor() {
        super()
        let material = new LineBasicMaterial({
            color: 0x0000ff
        })
    }
}

export class MjSprite extends Sprite {
    constructor(material?: SpriteMaterial) {
        super(material);
    }
    create() {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        const size = 256;
        const fontSize = 18;
        const text = '0.4/0.4';
        const bk = {r:1,g:1,b:1,a:1}
        canvas.width = canvas.height = size;
        canvas.style.width = canvas.style.height = `${size}`;
        if (ctx) {
            ctx.font = `${fontSize}px serif`;
            ctx.fillStyle = `rgba(${bk.r*255},${bk.g*255},${bk.b*255},${bk.a})`
            ctx.strokeStyle = `rgba(${bk.r},${bk.g},${bk.b},${bk.a})`
            ctx.lineWidth = 1/4;
            ctx.save();
            ctx.fillRect(0, 0, size/4, size/4);
            ctx.fillText(text, 0, 0);
            ctx.restore();            
        }
        let mapTex = new Texture(canvas);
        let material = new SpriteMaterial({
            map: mapTex
        })
        return new MjSprite(material);
    }
}
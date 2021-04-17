export enum ExtType {
    DRC = '.drc'
}
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import { 
    MeshStandardMaterial,
    MeshPhongMaterial,
    MeshBasicMaterial,
    DoubleSide,
    Color,
    Mesh,
    BufferGeometry,
    Float32BufferAttribute
} from 'three';
export interface LoadOption {
    color?: number,
}
// 参考文档
// https://sbcode.net/threejs/loaders-draco/
export class ModelLoader {
    loader: DRACOLoader
    constructor(ext: ExtType) {
        if (ext == ExtType.DRC) {
            this.loader = new DRACOLoader();
            this.loader.setDecoderPath('/libs/draco/');
            this.loader.setDecoderConfig({type: 'js'});
        } else {
            throw 'unkown ext file type'
        }
    }
    load(url: string, opt: LoadOption) {
        const {loader} = this;
        return new Promise((resolve)=>{
            return loader.load(url, (geo:BufferGeometry)=>{
                // const material = new MeshStandardMaterial({
                const material = new MeshBasicMaterial({
                // const material = new MeshPhongMaterial({
                    side: DoubleSide, 
                    color: 0x727d82, 
                    vertexColors: true,
                });
                const positionAttribute = geo.attributes.position;
                let colors = [];
                const color = new Color();
                for (let i=0, total = positionAttribute.count; i<total; i++) {
                    color.setHSL(i/total * Math.random(), 0.5, 0.5);
                    colors.push(color.r, color.g, color.b);
                }
                geo.setAttribute('color', new Float32BufferAttribute(colors, 3))
                const mesh = new Mesh(geo, material);
                material.needsUpdate = true;
                geo.attributes.color.needsUpdate = true;
                mesh.userData.url = url;
                mesh.name = 'load-mesh';
                resolve(mesh);
            })
        }).catch(err=>{
            console.log('load error', err);
        })
    }
}
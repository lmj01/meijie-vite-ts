export enum ExtType {
    DRC = '.drc'
}
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import { 
    MeshStandardMaterial,
    DoubleSide,
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
                const material = new MeshStandardMaterial({
                    // side: DoubleSide, 
                    color: 0x727d82, 
                    // vertexColors: true,
                });
                let colors = [];
                for (let i=0; i<geo.attributes.position.count;i++) {
                    colors.push(255* 1.0)
                    colors.push(125 * 1.0)
                    colors.push(1.0)
                }
                geo.setAttribute('color', new Float32BufferAttribute(colors, 3))
                const mesh = new Mesh(geo, material);
                mesh.userData.url = url;
                mesh.name = 'load-mesh';
                resolve(mesh);
            })
        }).catch(err=>{
            console.log('load error', err);
        })
    }
}
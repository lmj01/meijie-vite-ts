export enum ExtType {
    DRC = '.drc'
}
import * as THREE from 'three'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import { MeshStandardMaterial, DoubleSide, Mesh, BufferGeometry } from 'three';
import { Color3 } from 'babylonjs';
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
                const material = new MeshStandardMaterial({side: DoubleSide, color: new Color3(0xff0000), vertexColors: true});
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
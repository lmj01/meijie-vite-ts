export enum ExtType {
    DRC = '.drc'
}
import * as THREE from 'three'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import { MeshStandardMaterial, DoubleSide, Mesh, BufferGeometry } from 'three';
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
        console.log('--', loader);
        loader.load(url, function(geo){
            console.log('-load', geo);
        }, (e)=>{
            console.log('progress', e);
        }, (e)=>{
            console.log('err', e);
        })
        // return new Promise((resolve)=>{
        //     // return loader.load(url, (geo:BufferGeometry)=>{
        //     //     const material = new MeshStandardMaterial({side: DoubleSide, color: opt.color, vertexColors: true});
        //     //     const mesh = new Mesh(geo, material);
        //     //     mesh.userData.url = url;
        //     //     mesh.name = 'load-mesh';
        //     //     resolve(mesh);
        //     // })
        //     return loader.load(url, function(geo) {
        //         console.log(geo);
        //         resolve(geo);
        //     })
        // }).catch(err=>{
        //     console.log('load error', err);
        // })
    }
}
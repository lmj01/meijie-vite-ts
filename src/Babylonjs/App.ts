import {
    Engine,
    Scene,
    Vector3,
    UniversalCamera,
    FreeCamera,
    ArcRotateCamera
} from 'babylonjs'
export default class App {
    constructor(canvas) {
        this.canvas = canvas;
        let engine = new Engine(canvas, true, {preserveDrawingBuffer:true, stencil:true});
        this.engine = engine;
        this.scene = null;
        this.camera = null;
    }
    createScene() {
        const {engine} = this;
        let scene = new Scene(engine);
        this.scene = scene;
        return scene;
    }
    renderLoop() {
        const {engine, scene} = this;
        engine.runRenderLoop(function(){
            scene.render();
        })
    }
    resize() {
        const {engine} = this;
        engine.resize();
    }
    addUniversalCamera(x, y, z) {
        const {scene, canvas} = this;
        if (this.camera) {
            throw 'exist camera';
        }
        let camera = new UniversalCamera('UniversalCamera', new Vector3(x,y,z), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, false);
        this.camera = camera;
    }
    addFreeCamera(x, y, z) {
        const {scene, canvas} = this;
        if (this.camera) {
            throw 'exist camera';
        }
        let camera = new FreeCamera('FreeCamera', new Vector3(x,y,z), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, false);
        this.camera = camera;
    }
    addArcRotateCamera(x, y, z) {
        const {scene, canvas} = this;
        if (this.camera) {
            throw 'exist camera';
        }
        let camera = new ArcRotateCamera('ArcRotateCamera', Math.PI/2, Math.PI/2.5, 150, new Vector3(x,y,z), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, false);
        this.camera = camera;
    }
}
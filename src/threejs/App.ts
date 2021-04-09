import {
    Vector2,
    Vector3,
    Quaternion,
    Float32BufferAttribute,
    EventDispatcher,
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PointLight,
    Points,
    PointsMaterial,
    BufferGeometry,
  } from 'three/build/three.module'
export default class App {
    scene: Scene
    camera: PerspectiveCamera
    renderer: WebGLRenderer
    constructor(options: Object) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera();
        this.renderer = new WebGLRenderer({
            canvas: options.canvas,
        });  
        window.addEventListener('resize', this.onWindowResize, false);      
    }
    private onWindowResize() {
        
    }
}
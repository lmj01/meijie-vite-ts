import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import { 
    Group,
    Object3D,
    PerspectiveCamera, 
    WebGLRenderer,
    WebGLRendererParameters,
    Scene,
    Color,
    AxesHelper,
 } from 'three'

export interface AppOptions {
    canvas: HTMLCanvasElement | HTMLElement;
    width: number,
    height: number,
    showAxes?: boolean | null,
    axesSize?: number | null,
}

export class AppEngine {
    scene: Scene
    root: Group
    camera: PerspectiveCamera | any
    renderer: WebGLRenderer | any
    control: TrackballControls | any
    width: number
    height: number
    constructor() {
        this.scene = new Scene();
        this.scene.background = new Color(0xe9eff1);
        this.root = new Group();
        this.root.name = 'rootGroup';
        this.scene.add(this.root);
        this.camera = null;
        this.renderer = null;
        this.control = null;
        this.width = 0;
        this.height = 0;
    }
    initial(options: AppOptions) {
        let self = this;
        this.width = options.width;
        this.height = options.height;
        let aspect = options.width / options.height;
        this.camera = new PerspectiveCamera(75, aspect, 0.1, 10000);
        this.camera.position.z = 50;
        const parametrs: WebGLRendererParameters = {
            antialias: true,
        }
        if (options.canvas instanceof HTMLCanvasElement) {
            parametrs.canvas = options.canvas;
            this.renderer = new WebGLRenderer(parametrs);
        } else {
            this.renderer = new WebGLRenderer(parametrs);  
            options.canvas.appendChild(this.renderer.domElement);    
        }
        this.renderer.setClearColor(0xffffff, 0.0);
        this.renderer.setPixelRatio(options.width / options.height);
        this.renderer.setSize( options.width, options.height )
        
        if (options.showAxes) {
            this.addObject(new AxesHelper(options.axesSize || 500), false);
        }
        this.control = new TrackballControls(this.camera, this.renderer.domElement)

        window.addEventListener('resize', onWindowResize, false);      

        function onWindowResize() {
            const canvas = self.renderer.domElement;
            let elParent = canvas.parentElement;
            let style = getComputedStyle(elParent);        
            self.width = parseInt(style.width || '');
            self.height = parseInt(style.height || '');
            canvas.style.width = `${self.width}px`;
            canvas.style.height = `${self.height}px`;
            self.renderer.setSize(self.width, self.height); 
        }
    }
    addObject(obj3D: Object3D, isRoot: Boolean) {
        const {scene, root} = this;
        if (isRoot) {
            scene.add(obj3D);
        } else {
            root.add(obj3D)
        }
    }
    loop() {
        const {scene, camera, renderer, control} = this;
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
            control.update();
        }
        animate()
    }
}
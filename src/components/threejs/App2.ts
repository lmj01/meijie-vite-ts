import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import { 
    Group,
    Object3D,
    PerspectiveCamera, 
    OrthographicCamera,
    WebGLRenderer,
    WebGLRendererParameters,
    Scene,
    Color,
    Box3,
    Vector3,
    AxesHelper,
    Mesh,
 } from 'three'
import {AppOptions} from './AppAuxiliary'

export class AppEngine2 {
    scene1: Scene
    scene2: Scene
    root1: Group
    root2: Group
    camera: PerspectiveCamera | any
    renderer: WebGLRenderer | any
    control: TrackballControls | any
    width: number
    height: number
    sideView: string
    constructor() {
        this.scene1 = new Scene();
        this.scene1.background = new Color(0xe9eff1);
        this.root1 = new Group();
        this.root1.name = 'rootGroup1';
        this.scene1.add(this.root1);
        this.scene2 = new Scene();
        this.scene2.background = new Color(0xe9e0f1);
        this.root2 = new Group();
        this.root2.name = 'rootGroup2';
        this.scene2.add(this.root1);
        this.camera = null;
        this.renderer = null;
        this.control = null;
        this.width = 0;
        this.height = 0;
        this.sideView = 'front';
    }
    initial(options: AppOptions) {
        let self = this;
        this.width = options.width;
        this.height = options.height;
        let aspect = options.width / options.height;
        //this.camera = new PerspectiveCamera(75, aspect, 0.1, 10000);
        this.camera = new OrthographicCamera(-200, 200, 200, -200, 1, 1000);
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
        // this.renderer.setPixelRatio(options.width / options.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize( options.width, options.height )
        this.renderer.autoClear = false;
        
        if (options.showAxes) {
            this.addObject(true, new AxesHelper(options.axesSize || 500), false);
            this.addObject(false, new AxesHelper(options.axesSize || 500), false);
        }
        this.control = new TrackballControls(this.camera, this.renderer.domElement)        
        this.control.addEventListener('change', ()=>{ 
            this.renderFrame() 
        });

        const onWindowResize = () => {
            const canvas = self.renderer.domElement;
            let elParent = canvas.parentElement;
            let style = getComputedStyle(elParent);        
            self.width = parseInt(style.width || '');
            self.height = parseInt(style.height || '');
            canvas.style.width = `${self.width}px`;
            canvas.style.height = `${self.height}px`;
            console.log('on window resize', self.width, self.height)
            self.renderer.setSize(self.width, self.height); 
            self.fitCamera();
            self.renderFrame();
        }
        window.addEventListener('resize', onWindowResize, false); 
        this.fitCamera();
        this.renderFrame();     
    }
    addObject(isOne: Boolean, obj3D: any, isRoot: Boolean) {
        const {scene1, scene2, root1, root2} = this;
        if (isRoot) {
            if (isOne) scene1.add(obj3D);
            else scene2.add(obj3D);
        } else {
            if (isOne) root1.add(obj3D)
            else scene2.add(obj3D);
        }
        this.fitCamera();
        this.renderFrame();
        // console.log('after add', scene)
    }
    renderFrame() {
        const {renderer, camera, scene1, scene2, width, height} = this;
        
        renderer.clear();
        renderer.setScissorTest(true);

        renderer.setScissor(0, 0, width, height/2);
        renderer.render(scene1, camera);

        renderer.setScissor(0, height/2, width, height/2);
        renderer.render(scene2, camera);

        renderer.setScissorTest(false);
    }
    loop() {
        const {control} = this;
        const animate = () => {
            requestAnimationFrame( animate );
            if (control) control.update();
        }
        animate()
        this.renderFrame();
    }        
    getBox() {
        const {scene1, scene2} = this;
        function getBoundingBox(root: Object3D | any, bbx: Box3) {
            if (root.geometry) {
                root.geometry.computeBoundingBox();
                if (root.geometry.boundingBox) {
                    bbx.union(root.geometry.boundingBox);
                }
            } else if (root.type=='Object3D' || root.type=='Scene' || root.type == 'Group') {
                root.children.forEach((e:any)=>getBoundingBox(e, bbx));
            }
        }
        let bbx1 = new Box3();
        let bbx2 = new Box3();
        let size = new Vector3();
        let center = new Vector3();
        getBoundingBox(scene1, bbx1);
        getBoundingBox(scene2, bbx2);
        bbx1.union(bbx2);
        bbx1.getSize(size);
        bbx1.getCenter(center);
        return {size: size, center: center};
    }
    fitCamera() {
        const {camera, root1, root2, renderer} = this;
        const {size, center} = this.getBox();
        // console.log('bbx', size, center);
        // if (root1) {
        //     root1.position.set(0, 0, 0);
        //     root1.position.add(center.multiplyScalar(-1));
        // }
        // if (root2) {
        //     root2.position.set(0, 0, 0);
        //     root2.position.add(center.multiplyScalar(-1));
        // }
        const canvas = renderer.domElement;
        const maxSide = Math.max(size.x, size.y, size.z) / 2;
        const aspect = canvas.width / canvas.height;
        const fitSideHorizontal = maxSide * Math.sqrt(2);
        const fitSideVertical = fitSideHorizontal / aspect;
        // console.log('-fit camera-', fitSideHorizontal, fitSideVertical);
        if (camera.isPerspectiveCamera) {
            camera.aspect = aspect;
            // camera.updateProjectionMatrix();
        } else {
            camera.left = -fitSideHorizontal;
            camera.right = fitSideHorizontal;
            camera.top = fitSideVertical;
            camera.bottom = -fitSideVertical;            
        }
        this.viewSide(maxSide * 2)
    }
    setSideView(side: string) {
        this.sideView = side;
        this.fitCamera();
    }
    private viewSide(distance: number) {
        const {camera, sideView, control} = this;
        let newPos = new Vector3(),
            newUp = new Vector3(0,1,0),
            viewDir = new Vector3();
        if (sideView == 'front') { // xy plane
            viewDir.set(0, 0, 1);
            newPos.z = viewDir.multiplyScalar(distance).z;
        } else if (sideView == 'back') { // xy plane
            viewDir.set(0, 0, -1);
            newPos.z = viewDir.multiplyScalar(distance).z;
        } else if (sideView == 'left') { // zy plane
            viewDir.set(-1, 0, 0);
            newPos.x = viewDir.multiplyScalar(distance).x;
        } else if (sideView == 'right') { // zy plane
            viewDir.set(1, 0, 0);
            newPos.x = viewDir.multiplyScalar(distance).x;
        } else if (sideView == 'top') { // xz plane
            newUp.set(1, 0, 0);
            viewDir.set(0, 1, 0);
            newPos.y = viewDir.multiplyScalar(distance).y;
        } else if (sideView == 'bottom') { // xz plane
            newUp.set(1, 0, 0);
            viewDir.set(0, -1, 0);
            newPos.y = viewDir.multiplyScalar(distance).y;
        }
        camera.position.copy(newPos);
        camera.up.copy(newUp);
        camera.updateProjectionMatrix();
        if (control) control.update();
    }
}
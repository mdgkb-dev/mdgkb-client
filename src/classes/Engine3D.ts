import * as Three from 'three';
import { PerspectiveCamera, Raycaster, Renderer, Scene, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Ref } from 'vue';

import MapBuilding from './MapBuilding';

export default class Engine3D {
  scene: Scene = Engine3D.initScene();
  camera: PerspectiveCamera = Engine3D.initCamera();
  renderer: Renderer = Engine3D.initRenderer();
  controls?: OrbitControls;

  pointer: Vector2 = new Three.Vector2();
  raycaster: Raycaster = new Three.Raycaster();
  hoveredObjects: Map<string, MapBuilding> = new Map();
  hoveredObject?: MapBuilding;

  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    // this.controls.enableZoom = false;
    // this.controls.tick = () => controls.update();
    // this.controls = new Three.Vector3(this.camera, this.renderer.domElement);
    // this.controls.enableDamping = true;
    // this.controls.target.set(0, 1, 0);
  }

  private static initScene() {
    const scene = new Three.Scene();

    scene.add(new Three.AxesHelper(5));

    const light = new Three.PointLight(0xffffff, 500);
    light.position.set(0.8, 1.4, 1.0);
    scene.add(light);

    const ambientLight = new Three.AmbientLight();
    scene.add(ambientLight);
    return scene;
  }

  private static initCamera() {
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 90);
    camera.position.set(15, 15, 15);
    return camera;
  }

  private static initRenderer() {
    const renderer = new Three.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(800, 800);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    return renderer;
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  private setPointerCoordinates(e: MouseEvent) {
    const xOffset = e.clientX - this.renderer.domElement.offsetLeft;
    const yOffset = e.clientY - this.renderer.domElement.offsetTop;

    const containerWidth = this.renderer.domElement.clientWidth;
    const containerHeight = this.renderer.domElement.clientHeight;

    this.pointer.x = (xOffset / containerWidth) * 2 - 1;
    this.pointer.y = -(yOffset / containerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  onPointerMove(e: MouseEvent) {
    this.setPointerCoordinates(e);

    const intersects = this.raycaster.intersectObjects(this.scene.children);
    // console.log(intersects);
    if (intersects.length === 0) {
      this.hoveredObject?.onPointerOut();
      this.hoveredObject = undefined;
      return;
    }
    const firstObject = intersects[0].object;
    // @ts-ignore
    this.hoverHandle(firstObject);
  }

  private hoverHandle(obj: MapBuilding) {
    if (obj.uuid === this.hoveredObject?.uuid) {
      return;
    }
    if (obj.onPointerOver) {
      obj.onPointerOver();
      this.hoveredObject?.onPointerOut();
      this.hoveredObject = obj;
    }
  }

  static CreateInstance(target: Ref) {
    const instance = new Engine3D();

    // window.addEventListener('resize', instance.onWindowResize.bind(instance), false);
    target.value.appendChild(instance.renderer.domElement);
    instance.animate();
    // window.addEventListener('click', instance.onPointerMove.bind(instance));
    window.addEventListener('pointermove', instance.onPointerMove.bind(instance));
    instance.initControls();
    return instance;
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.controls) {
      this.controls.update();
    }
    this.render();
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(200, 200);
    this.render();
  }
}
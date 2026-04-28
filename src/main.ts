import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshLambertNodeMaterial,
  PerspectiveCamera,
  Scene,
  WebGPURenderer,
} from 'three/webgpu';
import { color } from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app element');
}

const scene = new Scene();
scene.background = new Color(0x333333);

const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.z = 3;

const renderer = new WebGPURenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshLambertNodeMaterial();
material.colorNode = color(0xffffff);

const box = new Mesh(geometry, material);
scene.add(box);

const dl = new DirectionalLight();
dl.position.set(3, 2, 3);
scene.add(dl);

const al = new AmbientLight();
scene.add(al);

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

window.addEventListener('resize', resize);

renderer.setAnimationLoop(() => {
  box.rotation.x += 0.01;
  box.rotation.y += 0.015;

  controls.update();
  renderer.render(scene, camera);
});

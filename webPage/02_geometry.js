
// https://www.youtube.com/watch?v=vjKuk5Vp93k

import * as THREE from "../three.js-master/build/three.module.js";

class App {
	constructor() {
		const divContainer = document.querySelector("#webgl_container");
		this._divCotainer = divContainer;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer;

		const scene = new THREE.Scene();
		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();

		window.onresize = this.resize.bind(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupCamera() {
		const width = this._divCotainer.clientWidth;
		const height = this._divCotainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.z = 2;
		this._camera = camera;
	}

	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}

	_setupModel() {
		const geometry = new THREE.BoxGeometry(1,1,1);
		const fillMaterial = new THREE.MeshPhongMaterial({color:0x515151});
		const cube = new THREE.Mesh(geometry, fillMaterial);

		const lineMaterial = new THREE.LineBasicMaterial({color:0xffff00});
		const line = new THREE.LineSegments(
			new THREE.WireframeGeometry(geometry),lineMaterial);
		
		const group = new THREE.Group()
		group.add(cube);
		group.add(line);

		this._scene.add(group);
		this._cube = group;
	}

	resize() {
		const width = this._divCotainer.clientWidth;
		const height = this._divCotainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	update(time) {
		time *= 0.001;
		this._cube.rotation.x = time;
		this._cube.rotation.y = time;
	}
}

window.onload = function () {
	new App();
};

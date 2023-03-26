import { DirectionalLight, GridHelper, MathUtils, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { CAMERA_DIST_DEFAULT, SPIRAL_LOOP, SPIRAL_OFFSET_Y, SPIRAL_SPLIT } from "./define"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class RenderingSystem {
    canvas = document.createElement("canvas")
    renderer = new WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
    })

    fov = 25

    camera = new PerspectiveCamera(this.fov)
    // controls = new OrbitControls(this.camera, this.canvas)

    scene = new Scene

    constructor() { // コンストラクタ
        const width = window.innerWidth
        const height = window.innerHeight
        this.renderer.setSize(width, height)
        this.renderer.setClearColor(0x000000, 0) // 背景
        this.renderer.setPixelRatio(devicePixelRatio) // ピクセル比

        const y = SPIRAL_LOOP * SPIRAL_OFFSET_Y * SPIRAL_SPLIT / 2 // カメラの高さ
        this.camera.aspect = width / height // アスペクト比
        this.camera.position.set(0, y, CAMERA_DIST_DEFAULT) // カメラの位置
        this.camera.lookAt(0, y, 0) // カメラの向き
        this.camera.updateProjectionMatrix() // カメラの行列を更新

        const grid = new GridHelper(100, 100) // グリッド
        this.scene.add(grid) // シーンに追加

        const directionalLight = new DirectionalLight(0xffffff) // 平行光源
        directionalLight.position.set(10, 20, 20) // 光源の位置
        directionalLight.lookAt(0, 0, 0)// 光源の向き
        this.scene.add(directionalLight) // シーンに追加

        document.body.append(this.canvas) // canvasをbodyに追加

        window.addEventListener("resize", this.resize) // リサイズイベント
        this.resize() // リサイズ
    }

    resize = () => { // リサイズ
        const width = innerWidth
        const height = innerHeight
        this.renderer.setSize(width, height)

        const aspect = width / height
        this.camera.aspect = aspect
        this.camera.fov = hfov2vfov(this.fov, aspect)
        this.camera.updateProjectionMatrix()
    }

    exec() {
        this.renderer.render(this.scene, this.camera)
    }
}

const renderingSystem = new RenderingSystem
export default renderingSystem


function hfov2vfov(hfov: number, aspect: number) { // 水平方向の視野角から垂直方向の視野角を計算
    return MathUtils.radToDeg(Math.atan(Math.tan(MathUtils.degToRad(hfov) / 2) / aspect) * 2)
}

import renderingSystem from "./renderingSystem";

const loop = () => {
    renderingSystem.exec();
    requestAnimationFrame(loop);
}

loop();

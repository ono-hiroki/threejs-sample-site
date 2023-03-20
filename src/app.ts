import renderingSystem from "./renderingSystem";
import {MODELS} from "./define";
import {load} from "./meshLoader";
import spiralSystem from "./spriralSystem";

Promise
    .all(MODELS.map(v => load(v)))
    .then(() => {
        spiralSystem.init()
        const loop = () => {
            renderingSystem.exec()
            requestAnimationFrame(loop)
        }
        loop()
    })



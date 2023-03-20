import { ITEMS } from "./define"
import renderingSystem from "./renderingSystem"
import SpiralItem from "./spiralItem";

class SpiralSystem {
    items!: SpiralItem[]
    init() {
        this.items = ITEMS.map((v, i) => {
            return new SpiralItem(v, i, renderingSystem.scene)
        })
    }
}

const spiralSystem = new SpiralSystem
export default spiralSystem

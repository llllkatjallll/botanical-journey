import { Behaviour } from "@needle-tools/engine/engine-components/Component";
import { EventList } from "@needle-tools/engine/engine-components/EventList";
import { PointerEventData } from "@needle-tools/engine/engine-components/ui/PointerEvents";
import { serializeable } from "@needle-tools/engine/engine/engine_serialization_decorator";

let x = 0;

export class SelectPlant extends Behaviour
{
    @serializeable(EventList)
    onClick?: EventList;
    currentNumber: number = 0;
    

    onPointerClick() {
        x++;

        const plantCounterPanel = document.getElementById("plant-counter") as HTMLInputElement;
        plantCounterPanel.innerHTML = x.toString();
        this.onClick?.invoke();
    }
}



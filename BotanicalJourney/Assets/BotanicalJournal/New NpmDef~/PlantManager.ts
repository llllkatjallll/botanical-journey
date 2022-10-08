import { Behaviour, serializeable } from "@needle-tools/engine";


import { EventList } from "@needle-tools/engine/engine-components/EventList";
import { PointerEventData } from "@needle-tools/engine/engine-components/ui/PointerEvents";


let x = 0;


export class PlantManager extends Behaviour
{
    @serializeable(EventList)
    onClick?: EventList;
    plantName: string = "Blumen";
    plantLocation: string = "Blumen";
    plantDescription: string = "Blumen";
    
    image?: HTMLImageElement
    
    currentNumber: number = 3;
    currentNumberTest: number = 54;

  

    start(){
        
        const journalButton = document.getElementById("journalButton") as HTMLInputElement;
        const journalContainer = document.getElementById("journal-container") as HTMLInputElement;
        var journalActive = false;
        journalButton.onclick = function(){

            journalActive=!journalActive;
            if(!journalActive){
                journalContainer.classList.remove("show"); 
                journalContainer.classList.add("hide");  

            } else{
                journalContainer.classList.remove("hide"); 
                journalContainer.classList.add("show");    
            }


        };

    }
    

    onPointerClick() {
        x++;
        const plantCounterPanel = document.getElementById("plant-counter") as HTMLInputElement;
        const plantName = document.getElementById("plant-name") as HTMLInputElement;
        if(plantCounterPanel)
        plantCounterPanel.innerHTML = x.toString();
        this.onClick?.invoke();

        if(plantName){
        plantName.innerHTML = this.plantName;
        }
    }
}



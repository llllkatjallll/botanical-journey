import { Behaviour, GameObject, serializeable } from "@needle-tools/engine";
import { Texture } from "three";
import { PlaneGeometry, MeshStandardMaterial, DoubleSide, Mesh, Scene, TextureLoader,PerspectiveCamera } from "three";
import { Renderer } from "@needle-tools/engine/engine-components/Renderer";
import { EventList } from "@needle-tools/engine/engine-components/EventList";
import { PointerEventData } from "@needle-tools/engine/engine-components/ui/PointerEvents";
import { textureToCanvas } from "@needle-tools/engine/engine/engine_three_utils";
import { Animator } from "@needle-tools/engine/engine-components/Animator";

export class PlantManager extends Behaviour {

    public static count : number = 0;
    public static allowClick : boolean = true;

    @serializeable(EventList)
    onClick?: EventList;
    plantPage?: HTMLInputElement;
    plantId: string = "";
    plantName: string = "";
    plantLocation: string = "";
    plantDescription: string = "";

    myImageURL?: string;
     journalButton?: HTMLInputElement;


    start() {

         this.journalButton = document.getElementById("journalButton") as HTMLInputElement;
        const journalContainer = document.getElementById("journal-container") as HTMLInputElement;

        
         this.plantPage = document.getElementById(this.plantId) as HTMLInputElement;
        console.log(this.plantDescription);
        if (this.plantPage) {
            this.plantPage.getElementsByClassName("plantName")[0].innerHTML = this.plantName;
            if (this.plantPage.getElementsByClassName("plantLocation")[0])
            //this.plantPage.getElementsByClassName("plantLocation")[0].innerHTML = this.plantLocation;
            //console.log(this.plantPage.getElementsByClassName("plantLocation")[0].innerHTML);
            if (this.plantPage.getElementsByClassName("plantDiscription")[0])
           // this.plantPage.getElementsByClassName("plantDiscription")[0].innerHTML = this.replaceUmlauts(this.plantDescription);
            //console.log(this.plantPage.getElementsByClassName("plantImage")[0].src);
            //console.log(this.myImage);
            //const renderer = this.context.renderer;
            // var dataURL = renderer.domElement.toDataURL();
            this.plantPage.getElementsByClassName("plantImage")[0].src = this.myImageURL;

        }
        var journalActive = false;

        let self = this;
        this.journalButton.onclick = function () {

            document.getElementById("journalButton")?.classList.remove("pulse");

            journalActive = !journalActive;
            
            if (!journalActive) {
                journalContainer.classList.remove("show");
                journalContainer.classList.add("hide");
                self.journalButton!.innerHTML="Journal";

            } else {
                journalContainer.classList.remove("hide");
                journalContainer.classList.add("show");
                self.journalButton!.innerHTML="Zurück";
            }
            PlantManager.allowClick = !journalActive;
        };

        this.newGrowingCircle();

    }

    update(){
      
    }

    changePlantPosition(){
        let randomX = this.randomIntFromInterval(-4.5, 4.5);
        let randomZ = this.randomIntFromInterval(-4.5, 4.5);
        this.gameObject.position.x = randomX;
        this.gameObject.position.z = randomZ;

    }

     randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

    newGrowingCircle(){
        //create random number for plants to wait
        const plantAnimator =  GameObject.getComponent(this.gameObject, Animator);
        
        const growWait = Math.random()*30000;
        const idleWait =  10000 + Math.random()*20000;
        const speed = Math.random();
        
        const sleep = async (milliseconds) => {
            await new Promise(resolve => {
                return setTimeout(resolve, milliseconds)
            });
        };
        
        plantAnimator?.SetSpeed(speed);
        const waitNow = async () => {
            await sleep(growWait); 
            plantAnimator?.SetTrigger("grow");
            await sleep(idleWait); 
            plantAnimator?.SetTrigger("shrink");
            await sleep(8000); 
            this.changePlantPosition();
            this.newGrowingCircle();

        }

        waitNow();
    }


    fillPageWithInfo(){
        if(this.plantPage){
            this.plantPage.getElementsByClassName("plant-placeholder-container")[0].classList.add("disable");
        
        const sleep = async (milliseconds) => {
            await new Promise(resolve => {
                return setTimeout(resolve, milliseconds)
            });
        };

        const waitNow = async () => {
            await sleep(2500); 
            this.plantPage?.getElementsByClassName("plant-info-container")[0].classList.remove("unrevealed");
            
        }

        waitNow();


        
        }
    }

     replaceUmlauts(str) {
        return str
          .replace(/\u00df/g, 'ss')
          .replace(/\u00e4/g, 'ae')
          .replace(/\u00f6/g, 'oe')
          .replace(/\u00fc/g, 'ue')
          .replace(/\u00c4/g, 'Ae')
          .replace(/\u00d6/g, 'Oe')
          .replace(/\u00dc/g, 'Ue');
      }



    onPointerClick() {
        if (!PlantManager.allowClick) return;

        PlantManager.count++;
        const plantCounterPanel = document.getElementById("plant-counter") as HTMLInputElement;
        const plantName = document.getElementById("plant-name") as HTMLInputElement;
        if (plantCounterPanel)
            plantCounterPanel.innerHTML = PlantManager.count.toString();
        this.onClick?.invoke();

        if (plantName) {
            plantName.innerHTML = this.plantName;
        }
    }

    goToSlide(){
        let index = parseInt(this.plantId.substring(1));
        swiper.slideTo(index, 2000, true);
        console.log("GO TO SLIDE" + index);
        this.highlightJournal();
    }

    highlightJournal(){
     this.journalButton?.classList.add("pulse");

    }

    playScribbleSound(){
        var audio = new Audio('./scribble_sound.wav');
        audio.play();
    }
}





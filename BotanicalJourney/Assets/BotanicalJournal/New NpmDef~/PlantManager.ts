import { Behaviour, serializeable } from "@needle-tools/engine";
import { Texture } from "three";
import { PlaneGeometry, MeshStandardMaterial, DoubleSide, Mesh, Scene, TextureLoader,PerspectiveCamera } from "three";
import { Renderer } from "@needle-tools/engine/engine-components/Renderer";
import { EventList } from "@needle-tools/engine/engine-components/EventList";
import { PointerEventData } from "@needle-tools/engine/engine-components/ui/PointerEvents";
import { textureToCanvas } from "@needle-tools/engine/engine/engine_three_utils";


let x = 0;


export class PlantManager extends Behaviour {
    @serializeable(EventList)
    onClick?: EventList;
    plantId: string = "";
    plantName: string = "Blumen";
    plantLocation: string = "Blumen";
    plantDescription: string = "Blumen";


    myImage?: Texture;
    myImageURL?: string;

    currentNumber: number = 3;
    currentNumberTest: number = 54;



    start() {

        const journalButton = document.getElementById("journalButton") as HTMLInputElement;
        const journalContainer = document.getElementById("journal-container") as HTMLInputElement;

       /* const textureLoader = new TextureLoader();

        // load a texture
        const texture = textureLoader.load(
            this.myImage
        );


        const geometry = new PlaneGeometry(1, 1);
        const material = new MeshStandardMaterial({
            map: texture,
        });
        const plane = new Mesh(geometry, material);



        const scene = new Scene();
        scene.add(plane);
        const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const renderer = this.context.renderer;
        renderer.render(scene, camera);
        var dataURL = renderer.domElement.toDataURL();
        console.log(dataURL); */
        const plantPage = document.getElementById(this.plantId) as HTMLInputElement;

        if (plantPage) {
            plantPage.getElementsByClassName("plantName")[0].innerHTML = this.plantName;
            //console.log(plantPage.getElementsByClassName("plantImage")[0].src);
            //console.log(this.myImage);
            //const renderer = this.context.renderer;
            // var dataURL = renderer.domElement.toDataURL();
            plantPage.getElementsByClassName("plantImage")[0].src = this.myImageURL;

        }
        var journalActive = false;
        journalButton.onclick = function () {

            journalActive = !journalActive;
            if (!journalActive) {
                journalContainer.classList.remove("show");
                journalContainer.classList.add("hide");

            } else {
                journalContainer.classList.remove("hide");
                journalContainer.classList.add("show");
            }


        };

    }


    onPointerClick() {
        x++;
        const plantCounterPanel = document.getElementById("plant-counter") as HTMLInputElement;
        const plantName = document.getElementById("plant-name") as HTMLInputElement;
        if (plantCounterPanel)
            plantCounterPanel.innerHTML = x.toString();
        this.onClick?.invoke();

        if (plantName) {
            plantName.innerHTML = this.plantName;
        }
    }
}



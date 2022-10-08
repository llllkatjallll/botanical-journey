import { Behaviour, serializeable } from "@needle-tools/engine";

// Documentation → https://docs.needle.tools/scripting

export class Rotate extends Behaviour {

    @serializeable()
    myStringField: string = "Hello World";
    
    speed : number = 1;

    start(){
        console.log(this + "rotate");
    }

    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
import { Behaviour, GameObject, InstantiateOptions, serializeable, Mathf } from "@needle-tools/engine";
import { AssetReference } from "@needle-tools/engine/engine/engine_addressables";
import { Vector3 } from "three";
import { Euler } from "three";
import { Quaternion } from "three";
import { Object3D } from "three";

// Documentation → https://docs.needle.tools/scripting

export class SceneManager extends Behaviour {

   
    
    @serializeable(AssetReference)
    myPrefab?: AssetReference;
    
    async start() {

         // load only, instantiate later
      await this.myPrefab?.loadAssetAsync();
      // or directly instantiate
      await this.myPrefab?.instantiate();

        const options = new InstantiateOptions();
        if(parent)
        options.parent = this.gameObject;
        options.position = new Vector3(Math.random()*2,Math.random()*2,Math.random()*2);
        options.rotation = new Quaternion().setFromEuler(new Euler(0,Math.random()*360,0));
       // const newLetter = GameObject.instantiateSynced(this.myPrefab? , options);
    }
}
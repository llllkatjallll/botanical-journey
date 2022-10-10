import { TypeStore } from "@needle-tools/engine/engine/engine_typestore"

// Import types
import { PlantManager } from "../PlantManager.ts";
import { Rotate } from "../Rotate.ts";
import { SceneManager } from "../SceneManager.ts";

// Register types
TypeStore.add("PlantManager", PlantManager);
TypeStore.add("Rotate", Rotate);
TypeStore.add("SceneManager", SceneManager);

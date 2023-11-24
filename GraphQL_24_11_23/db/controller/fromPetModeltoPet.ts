

import { PetModel, PetModelType } from "../Pet.ts";
import { Pet } from "../../types.ts";

export const fromPetModeltoPet = async (pet:PetModelType):Promise<Pet>=>{
const {id,name,breed} = pet; 

const exists = await PetModel.findById(id); 
if(!exists) throw new Error("Pet not found"); 

return {
    id:id.toString(),
    name:name,
    breed:breed,
}

}
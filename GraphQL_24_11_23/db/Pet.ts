import mongoose from "mongoose";
import { Pet } from "../types.ts";


const Schema = mongoose.Schema;

const PetSchema = new Schema(
    {
        id: { type: mongoose.Types.ObjectId, required: true },
        name: { type: String, required: true, unique: true },
        breed:{type:String, required:true}
    },
);

export type PetModelType = mongoose.Document &
    Omit<Pet, "id">;

export const PetModel = mongoose.model<PetModelType>(
    "Pet",
    PetSchema
);


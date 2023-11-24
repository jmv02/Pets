import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { Pet } from "./types.ts";
import mongoose from "mongoose";
import { PetModel, PetModelType } from "./db/Pet.ts";
//la exclamacion hace obligatorio que haya
//esquema de graphql

export const gqlSchema = `#graphql
type Pet{
    id: ID!
    name: String!
    breed: String!
}

type Query{
    pets: [Pet!]!
    pet(id: ID!): Pet!
}

type Mutation{
    addPet(id: ID!, name: String!, breed: String!): Pet!
}`

export const Query = {
    pets: async () => {
        try {
            const pets = await PetModel.find();
            return pets;
        } catch (e) {
            throw new Error("Fallo del Query de Pets");
        }
    },
    pet: async (_: unknown, args: { id: string,name:string,breed:string }) => {
        try {
            const pet = await PetModel.findById(args.id);
            if (!pet) {
                throw new Error("No pet found with id ${args.id}");
            }
            return pet;
        } catch (e) {
            throw new Error("Fallo del Query de Pet");
        }
        
    },
};

export const Mutation = {
    addPet: async (
        _: unknown,
        args: { id:mongoose.Types.ObjectId, name: string; breed: string },
    ): Promise<PetModelType> => {
        try {
            const pet = await PetModel.create(args);
            return pet;
        } catch (e){
            throw new Error("Error añadiendo mascota");
        }
    },
};

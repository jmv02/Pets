import express from "express"; 
import mongoose from "mongoose"; 
import {Request,Response} from "express"; 
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Mutation, Query, gqlSchema } from "./GQLSchema.ts";


const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL || MONGO_URL === undefined) {
    console.log("No mongo URL found");

} else {

    await mongoose.connect(MONGO_URL);
    const app = express();
    app.use(express.json());
    await mongoose.connect(MONGO_URL);

    app.get("/test", (req: Request, res: Response) => {
        res.status(200).send("Working!");
    })


    app.listen(3000, () => {
        console.log("Server listening on port 3000");
    });
}



//Comentarios graphql son con #, #graphql es para poner colorinchis
//La exclamación es para ponerlo obligatorio ID es tipo string
//Type Query y Mutation van en el esquema, no pueden ir en types.ts porque forman parte del esquema.



//crecion del servidor
const server = new ApolloServer({
    typeDefs: gqlSchema,
    resolvers: {
        Query,
        Mutation,
    },
});
//lanzamiento del servidor
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000,
    },
});
console.info(`Server is listening ${url}`);





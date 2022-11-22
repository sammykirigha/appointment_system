import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import * as dotenv from "dotenv"
import {buildSchema, registerEnumType} from "type-graphql";
import express from "express";
import http from "http";

async function startApolloServer(){
    dotenv.config();

    const schema = await buildSchema({
        resolvers: [
            __dirname + "/modules/**/*.ts"
        ],
        authChecker,
        pubSub: pubsub
    })
    
    //start the server
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded"
    })

    const app  = express();
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT || 4000;

    await server.start();

    server.applyMiddleware({app});

    await new Promise<void>((resolve) => httpServer.listen({port: PORT}, resolve));
    console.log('====================================');
    console.log( `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log('====================================');
}
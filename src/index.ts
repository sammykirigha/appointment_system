import "reflect-metadata";
import { authChecker } from "./api/middlewares/auth.middleware";
import { Context } from "./api/common/interfaces/context.interface";
import {ApolloServer} from "apollo-server-express";
import * as dotenv from "dotenv"
import {buildSchema, registerEnumType} from "type-graphql";
import express from "express";
import http from "http";
import { userRoleStatus } from "./api/common/enums/userRoles";
import { verify } from "jsonwebtoken";

const registerEnumTypes = (enumTypes: any) => {
    enumTypes.forEach((enumType: any) => {
        registerEnumType(enumType[0], {
            name: enumType[1],
            description: enumType[2]
        })
    });
}

async function startApolloServer(){
    dotenv.config();

    registerEnumTypes([
        [userRoleStatus, "usersStatus", "The users roles status - user, admin, patient, doctor"],
        // [SortDirection, "SortDirection", "sort direction for sorting"],
        // [AppointmentSortColumn, "AppointmentSortColumn", "appointment sort column"],
        // [AppointmentStatus, "AppointmentStatus", "The Status of a appointment"],
    ])

    const schema = await buildSchema({
        resolvers: [
            __dirname + "/api/modules/**/*.ts"
        ],
        authChecker
    })
    
    //start the server
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        context: ({ req, res }: {req:any, res:any}) => {
            const auth = req.headers.authorization;
            let user = undefined;
            if (auth) {
                const token = auth.split(" ")[1]

                const secretKey = process.env.SECRET_KEY
                try {

                    user = verify(token, secretKey || '');
                } catch (error) { 
                    console.log('====================================');
                    console.log(error);
                    console.log('====================================');
                }
            }

            const ctx: Context = {
                req, res, user
            }            

            return ctx
        }
    })

    const app  = express();
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT || 4000;

    await server.start();

    server.applyMiddleware({app});

    await new Promise<void>((resolve) => httpServer.listen({port: PORT}, resolve));
    console.log('====================================');
    console.log( `🚀 Server  ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log('====================================');
}

startApolloServer();
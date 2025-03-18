
import express from "express";
import cors from 'cors'
import ambasRouter from "./routes/ambassador.routes.js";
import applicationRouter from "./routes/application.routes.js";
const app = express()


app.use(cors({
    origin:["process.env.CORS_ORIGIN"],
    methods:["GET" , "POST" , "PUT" , "DELTE"],
    credentials:true,
}))


app.use("/api/v1/users",ambasRouter)
app.use("/api/v1/users",applicationRouter)

export{app};
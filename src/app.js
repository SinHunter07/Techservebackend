import express from "express";
import cors from 'cors'
import ambasRouter from "./routes/ambassador.routes.js";
import applicationRouter from "./routes/application.routes.js";
import enquiryRouter from "./routes/enquiry.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}))

app.use("/api/v1/ambas",ambasRouter)
app.use("/api/v1/users",applicationRouter)
app.use("/api/v1/enquiry",enquiryRouter)

// Error handling middleware
app.use(errorHandler);

export{app};
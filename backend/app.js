import express from "express";
import { errorMiddleware } from "./middleware/error.js";
const app = express();

// Routes



// MiddleWare for Error
app.use(errorMiddleware);

export default app;
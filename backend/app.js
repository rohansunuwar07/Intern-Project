import express from "express";
import { errorMiddleware } from "./middleware/error.js";
import helmet from "helmet";
import userRouter from "./routes/userRoutes.js";
const app = express();

app.use(helmet());

// Routes
app.use("/api/v1",userRouter);


// MiddleWare for Error
app.use(errorMiddleware);

export default app;
import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import morgan from "morgan";

import cacheRoute from "./routes/cacheRoute";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/cache", cacheRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Cache service");
});

app.listen(process.env.PORT || 5000, () => {
  createConnection().then(() => {
    console.log("Database connected");
  });
});

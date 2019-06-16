import "reflect-metadata";
import { createConnection } from "typeorm";
import { Account } from "./entity/User";
import express, { Request, Response } from "express";
import bodyParser = require("body-parser");
import morgan = require("morgan");
import cors = require("cors");
import auth from "./middlewares/auth";

createConnection()
  .then(async connection => {
    // Create a new express application
    const app = express();

    const PORT = process.env.PORT || 5000;

    // Init Middleware
    app.use(bodyParser.json());
    app.use(morgan("dev"));
    app.use(cors());
    // Test
    app.get("/", async (req: Request, res: Response) =>
      res.send("API RUNNING")
    );
    // Define Routes
    app.use("/api/auth", auth);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(error => console.log(error));

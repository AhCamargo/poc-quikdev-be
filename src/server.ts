import "express-async-errors";
import "dotenv/config";

import express from "express";
import cors from "cors";
import { routes } from "./app/routes";

//import { errorMiddleware } from "./app/middlewares/error";

const port = process.env.SERVER_PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
//app.use(errorMiddleware);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
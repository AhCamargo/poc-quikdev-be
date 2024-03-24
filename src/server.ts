import "express-async-errors";
import "dotenv/config";

import express from "express";
import cors from "cors";
import { routes } from "./app/routes";

const port = process.env.SERVER_PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

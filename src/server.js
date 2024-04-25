import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToDatabase from "./database.js";
import { setupRoutes } from "./routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectToDatabase().then(() => {
  setupRoutes(app);
  app.listen(8000, () => console.log("Server running on port 8000"));
});

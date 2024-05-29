import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipe.js";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose.connect(
  "mongodb+srv://deanzaballero:deanpassword@cluster0.wfamsnf.mongodb.net/Cluster()?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});

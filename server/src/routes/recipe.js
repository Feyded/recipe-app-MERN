import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/User.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.SavedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.SavedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/", async (req, res) => {
  const recipeID = req.query.recipeID;
  const userID = req.query.userID;
  const user = await UserModel.findById(userID);
  const index = user.SavedRecipes.indexOf(recipeID);
  user.SavedRecipes.splice(index, 1);
  await user.save();

  const savedRecipes = await RecipeModel.find({
    _id: { $in: user?.SavedRecipes },
  });
  res.json({ savedRecipes });
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.SavedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user?.SavedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

export { router as recipeRouter };

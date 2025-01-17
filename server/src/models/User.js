import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    SavedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", UserSchema);

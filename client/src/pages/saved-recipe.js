import { useEffect, useState } from "react";
import axios from "axios";
import useGetUserID from "./../hooks/useGetUserID";

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipe();
  }, []);

  const unSaveRecipe = async (recipeID) => {
    try {
      const response = await axios.delete("http://localhost:3001/recipes", {
        params: { userID: userID, recipeID: recipeID },
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2">
      {savedRecipes.map((recipe) => (
        <Card
          key={recipe._id}
          savedRecipes={recipe}
          unSaveRecipe={unSaveRecipe}
        />
      ))}
    </div>
  );
}

function Card({ savedRecipes, unSaveRecipe }) {
  return (
    <div className=" rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark">
      <img
        className="rounded-t-lg"
        src={savedRecipes.imageUrl}
        alt=""
        style={{ width: "100%", height: "30rem" }}
      />
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <h5 className="mb-2 text-xl font-medium leading-tight">
          {savedRecipes.name}
        </h5>
        <p className="mb-4 text-base">{savedRecipes.instruction}</p>
        <p className="mb-4 text-base">
          Ingredients: {savedRecipes.ingredients}
        </p>
        <p className="mb-4 text-base">
          Cooking Time: {savedRecipes.cookingTime} minutes
        </p>
        <button
          onClick={() => unSaveRecipe(savedRecipes._id)}
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Unsave
        </button>
      </div>
    </div>
  );
}

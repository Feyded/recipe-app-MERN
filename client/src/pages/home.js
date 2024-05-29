import { useEffect, useState } from "react";
import axios from "axios";
import useGetUserID from "./../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const isRecipeSaved = (id) => savedRecipes.includes(id);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();

    if (cookies.access_token) {
      fetchSavedRecipe();
    }
  }, []);

  const savedRecipeBtn = async (recipeID) => {
    if (!userID) {
      alert("You're not login!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID: recipeID,
          userID: userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2">
      {recipes.map((recipe) => (
        <Card
          key={recipe._id}
          recipe={recipe}
          userID={userID}
          savedRecipeBtn={savedRecipeBtn}
          savedRecipes={savedRecipes}
          isRecipeSaved={isRecipeSaved}
        />
      ))}
    </div>
  );
}

function Card({ recipe, savedRecipeBtn, isRecipeSaved }) {
  return (
    <div className=" rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark">
      <img
        className="rounded-t-lg"
        src={recipe.imageUrl}
        alt=""
        style={{ width: "100%", height: "30rem" }}
      />
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <h5 className="mb-2 text-xl font-medium leading-tight">
          {recipe.name}
        </h5>
        <p className="mb-4 text-base">{recipe.instruction}</p>
        <p className="mb-4 text-base">Ingredients: {recipe.ingredients}</p>
        <p className="mb-4 text-base">
          Cooking Time: {recipe.cookingTime} minutes
        </p>

        <button
          onClick={() => savedRecipeBtn(recipe._id)}
          disabled={isRecipeSaved(recipe._id)}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            isRecipeSaved(recipe._id)
              ? "bg-blue-400"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {isRecipeSaved(recipe._id) ? "Already Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useState } from "react";
import useGetUserID from "./../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function CreateRecipes() {
  const userID = useGetUserID();
  const [cookies] = useCookies();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (event) => {
    if (!userID) {
      alert("You're not login!");
      return;
    }

    event.preventDefault();
    try {
      axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="ingredients"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ingredients
        </label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            id="ingredients"
            value={ingredient}
            className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button
          type="button"
          className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={addIngredients}
        >
          Add Ingredients
        </button>
      </div>
      <div>
        <label
          htmlFor="instruction"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Instructions
        </label>
        <input
          type="text"
          id="instruction"
          name="instruction"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="imageUrl"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="cookingTime"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Cooking Time(minutes)
        </label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Create
      </button>
    </form>
  );
}

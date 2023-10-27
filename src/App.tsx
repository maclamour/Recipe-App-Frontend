// import React from "react";

import "./App.css"
import { useState } from "react"
import * as API from './API';
import { Recipe } from "./types";

const App = () => {
  const [searchTerm, setsSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleSearchSubmit =async () => {
    try {
      const recipes = await API.searchRecipes(searchTerm,1);
      setRecipes(recipes);
      
    } catch (error) {
      console.log(error);
    }
    
  }

  return(
    <div>
      <form onSubmit={() => handleSearchSubmit()}>
        <button type='submit'>Submit</button>
      </form>
      {recipes.map((recipe) =>(
        <div>
          recipe title: {recipe.title}
          recipe image location: {recipe.image}
          recipe title: {recipe.title}

        </div>
      ))}
    </div>
  )
}

export default App
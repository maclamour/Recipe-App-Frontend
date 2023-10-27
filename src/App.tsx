// import React from "react";

import "./App.css"
import { useState } from "react"
import * as API from './API';

const App = () => {
  const [searchTerm, setsSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState([])

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
      {recipes.map((recipe) =>(
        <div>
          recipe image location: {recipe.image}
          recipe title: {recipe.title}

        </div>
      ))}
    </div>
  )
}

export default App
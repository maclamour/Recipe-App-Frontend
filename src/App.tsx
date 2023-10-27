// import React from "react";

import "./App.css"
import { FormEvent, useState } from "react"
import * as API from './API';
import { Recipe } from "./types";

const App = () => {
  const [searchTerm, setsSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const handleSearchSubmit =async (event: FormEvent) => {
    event.preventDefault()
    try {
      const recipes = await API.searchRecipes(searchTerm,1);
      setRecipes(recipes.results);
      
    } catch (error) {
      console.log(error);
    }
    
  }

  return(
    <div>
      <form onSubmit={(event) => handleSearchSubmit(event)}>
        <input 
        type='text' 
        required
        placeholder="Enter a search term..."
        value={searchTerm}
        onChange={(event)=> setsSearchTerm(event.target.value)}  
        ></input>
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
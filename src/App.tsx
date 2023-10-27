// import React from "react";

import "./App.css"
import { FormEvent, useRef, useState } from "react"
import * as API from './API';
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

const App = () => {
  const [searchTerm, setsSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
    );
  const pageNumber = useRef(1);

  const handleSearchSubmit =async (event: FormEvent) => {
    event.preventDefault()
    try {
      const recipes = await API.searchRecipes(searchTerm,1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
      
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await API.searchRecipes(searchTerm,nextPage );
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
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
        <RecipeCard recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
      ))}
      <button
      className="view-more-button"
      onClick={handleViewMoreClick}
      >View More</button>
      {selectedRecipe ? <RecipeModal recipeId={selectedRecipe.id.toString()}/> : null}
    </div>
  );
};

export default App
// import React from "react";

import "./App.css"
import { FormEvent, useEffect, useRef, useState } from "react"
import * as API from './API';
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

type Tabs = 'search' | 'favorites';

const App = () => {
  const [searchTerm, setsSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
    );
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])  
  const [selectedTab, setSelectedTab] = useState<Tabs>('search');   
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavoriteRecipes =async () => {
      try {
        const favoriteRecipes = await API.getFavoriteRecipes();
        setFavoriteRecipes(favoriteRecipes.results);  
      } catch (error) {
        console.log(error);  
      }
      
    }
    fetchFavoriteRecipes();
    
  }, []);

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
  };

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await API.addFavoriteRecipe(recipe)
      setFavoriteRecipes([...favoriteRecipes,recipe])  
    } catch (error) {
      console.log(error);  
    }
  };

  return(
    <div>
      <div className="tabs">
        <h1 onClick={()=> setSelectedTab('search')}> Recipe Search </h1>
        <h1 onClick={()=> setSelectedTab('favorites')}> Favorites </h1>
      </div>
      {selectedTab === 'search' && (<>
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
      </>)}
      
      {selectedTab === 'favorites' && (
      <div>
        {favoriteRecipes.map((recipe)=>(
          <RecipeCard
          recipe={recipe}
          onClick={() => setSelectedRecipe(recipe)}/>  
        ))}

      </div> )}

      {selectedRecipe ? (<RecipeModal recipeId={selectedRecipe.id.toString()}
      onClose ={() => setSelectedRecipe(undefined)}
      />
      ) : null}
    </div>
  );
};

export default App
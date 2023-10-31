
import "./App.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import * as API from "./API";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";

type Tabs = "search" | "favorites";

const App = () => {
  const [searchTerm, setsSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipes = await API.getFavoriteRecipes();
        setFavoriteRecipes(favoriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavoriteRecipes();
  }, []);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await API.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await API.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await API.addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteRecipe =async (recipe:Recipe) => {
    try {
      await API.removeFavoriteRecipe(recipe);
      const updatedRecipes = favoriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
        );
        setFavoriteRecipes(updatedRecipes)
    } catch (error) {
      console.log(error);
    }  
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src="/foodie.jpg" alt="Foodie"></img>
        <div className="title">Recipe App</div>

      </div>
      <div className="tabs">
        <h1
        className={selectedTab ==="search" ? "tab-active" : ""} 
        onClick={() => setSelectedTab("search")}> 
        Recipe Search 
        </h1>
        <h1
        className={selectedTab ==="favorites" ? "tab-active" : ""} 
        onClick={() => setSelectedTab("favorites")}> 
        Favorites 
        </h1>
      </div>
      {selectedTab === "search" && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder="Enter a search term..."
              value={searchTerm}
              onChange={(event) => setsSearchTerm(event.target.value)}
            ></input>
            <button type="submit">
              <AiOutlineSearch size= {40}/> 
            </button>
          </form>
          <div className="recipe-grid">
          {recipes.map((recipe) => {
            const isFavorite = favoriteRecipes.some(
              (favRecipe) => recipe.id === favRecipe.id
            );
            return (
              <RecipeCard
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onFavoriteButtonClick={
                  isFavorite ? removeFavoriteRecipe : addFavoriteRecipe}
                isFavorite={isFavorite}
              />
            );
          })}
          </div>

          <button className="view-more-button" onClick={handleViewMoreClick}>
            View More
          </button>
        </>
      )}

      {selectedTab === "favorites" && (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavoriteButtonClick={removeFavoriteRecipe}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};


export default App;

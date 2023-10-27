// import React from "react";
import "./App.css"
import { useState } from "react"
import { searchRecipes } from '../../backend/src/recipeAPI';

const App = () => {
  const [searchTerm, setsSearchTerm] = useState("burgers");
  const [recipes, setResipes] = useState([])

  const handleSearchSubmit =async () => {
    try {
      const recipes = await api.searchRecipes(searchTerm,1);
      
    } catch (error) {
      console.log(error);
    }
    
  }

  return(
    <div> Hello from recipe App</div>
  )
}

export default App
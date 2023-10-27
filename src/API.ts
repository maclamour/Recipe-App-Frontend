import { searchRecipes } from '../../backend/src/recipeAPI';


const searchRecipes =async (searchTerm:string, page: Number) => {
    const baseUrl = new URL('http://localhost:5500/api/recipes/search');
    
}
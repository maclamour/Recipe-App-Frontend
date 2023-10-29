// import { searchRecipes, getRecipeSummary, getFavoriteRecipesByIds } from '../../backend/src/recipeAPI';


const searchRecipes =async (searchTerm:string, page: number) => {
    const baseUrl = new URL("http://localhost:5500/api/recipes/search");
    baseUrl.searchParams.append('searchTerm',searchTerm);
    baseUrl.searchParams.append('page', page.toString());

    const response = await fetch(baseUrl.toString());

    if(!response.ok){
        throw new Error('HTTP Error: ${response.status}');
    }

    return response.json();
    
};

const getRecipeSummary = async (recipeId: string) => {
    const url = new URL(`http://localhost:5500/api/recipes/${recipeId}/summary`);
    const response = await fetch(url)
    
    if(!response.ok){
        throw new Error(`HTTP error Status: ${response.status}`)
    }
    return response.json();
};

const getFavoriteRecipes =async () => {
    const url = new URL('http://localhost:5500/api/recipes/favorite')
    const response = await fetch(url);

    if(!response.ok){
        throw new Error('HTTP Error: ${response.status}');
    }

    return response.json();
    
}

export { searchRecipes,getRecipeSummary, getFavoriteRecipes };
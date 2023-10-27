// import { searchRecipes } from '../../backend/src/recipeAPI';


const searchRecipes =async (searchTerm:string, page: number) => {
    const baseUrl = new URL("http://localhost:5500/api/recipe/search");
    baseUrl.searchParams.append('searchTerm',searchTerm);
    baseUrl.searchParams.append('page', page.toString());

    const response = await fetch(baseUrl.toString());

    if(!response.ok){
        throw new Error('HTTP Error: ${response.status}');
    }

    return response.json();
    
};

export { searchRecipes};
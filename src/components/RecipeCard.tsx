
import { Recipe } from "../types"
import {AiOutlineHeart} from 'react-icons/ai';

interface Props {
    recipe: Recipe;
    onClick: () => void;
    onFavoriteButtonClick: (recipe: Recipe) => void
}

const RecipeCard = ({ recipe, onClick, onFavoriteButtonClick }: Props) => {
    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image}></img>
            <div className="recipe-card-title">
                <span onClick={(event) => {
                    event.stopPropagation()
                    onFavoriteButtonClick(recipe)
                }}>
                    <AiOutlineHeart size ={25}/>
                </span>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    )
}



export default RecipeCard;
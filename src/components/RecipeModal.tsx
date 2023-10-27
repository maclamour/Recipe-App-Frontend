import { useEffect, useState } from "react";
import { RecipeSummary } from "../types";

const RecipeModal = () => {

  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

  // useEffect(())

  if (!recipeSummary){
    return <></>
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary?.title}</h2>
            <span className="close-btn">&times;</span>
          </div>
          <p dangerouslySetInnerHTML={{__html: recipeSummary?.summary}}></p>
        </div>
      </div>
    </>
  );
};


export default RecipeModal 
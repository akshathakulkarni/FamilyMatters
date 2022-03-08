import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditRecipe from "./EditRecipe";
import NewRecipe from "./NewRecipe";
import "./Recipes.css";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const userId = localStorage.getItem("user_id");
  const accountId = localStorage.getItem("account_id");
  const navigate = useNavigate();
  const getRecipes = () => {
    return axios
      .get(`/api/recipes/?userId=${userId}&accountId=${accountId}`)
      .then((response) => {
        setRecipes(response.data.recipes);
      });
  };

  const updateRecipe = (body) => {
    return axios
      .put(`/api/recipes/?userId=${userId}&recipeId=${body.id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const newRecipes = recipes.map((recipe) => {
          if (recipe.id === res.data.updatedRecipe.id) {
            return { ...res.data.updatedRecipe };
          } else {
            return { ...recipe };
          }
        });
        setRecipes([...newRecipes]);
        navigate("/recipes");
      });
  };

  const deleteRecipe = (id) => {
    axios.delete(`/api/recipes/${id}`);
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  useEffect(() => {
    getRecipes();
  }, []);
  console.log("recipeeeee = ", recipes);
  return (
    <Fragment>
      <div id="all-recipes">
        <h3 id="recipe_title">Delight in every bite !!!&#128523;</h3>
      </div>
      <div class="container" id="recipes">
        {recipes.map((recipe) => (
          <div class="card" key={recipe.id}>
            <div>
              <h3>{recipe.name}</h3>
              <h5>
                <span class="btn btn-secondary">
                  Post by {recipe.posted_by}
                </span>
              </h5>
            </div>
            <div>
              <div class="card__header">
                <img
                  src={recipe.thumbnail_photo_url}
                  alt="recipe"
                  class="card__image"
                  width="600"
                  height="300"
                />
              </div>
              <div id="card_contents">
                <br />
                <h6>
                  <span class="tag tag-teal">Preparation Time</span>
                  <span class="label ">
                    : {recipe.preparation_time} minutes
                  </span>
                </h6>
                <h6>
                  <span class="tag tag-red">Cooking Time</span>

                  <span class="label label-green">
                    : {recipe.cooking_time} minutes
                  </span>
                </h6>

                <h6>
                  <span class="tag tag-green">Serves</span>

                  <span class="label label-primary"> : {recipe.serving}</span>
                </h6>

                <h4>
                  <span class="tag tag-brown">Ingredients </span>
                </h4>

                <p class="main_recipe_content">{recipe.ingredients}</p>

                <h4>
                  <span className="tag tag-blue">Instructions </span>
                </h4>

                <p class="main_recipe_content">{recipe.instructions}</p>
              </div>
            </div>

            <div id="card__footer">
              <h5>
                <EditRecipe recipe={recipe} updateRecipe={updateRecipe} />
                <button
                  class="btn btn-danger"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  Delete
                </button>
              </h5>
            </div>
          </div>
        ))}
      </div>
      <div class="newRecipe">
        <NewRecipe />
      </div>
    </Fragment>
  );
}

export default Recipe;

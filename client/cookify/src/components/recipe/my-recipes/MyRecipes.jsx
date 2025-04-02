import React, { useState } from "react";
import { useRecipesOfUser } from "../../../api/recipeApi";
import { Link } from "react-router";
import styles from "./MyRecipe.module.css";

const MyRecipes = () => {
    //   const [recipes, setRecipes] = useState([]);
    const [isLoading] = useState(false);
    const { recipes } = useRecipesOfUser();

    return (
        <main>
            <div className="album py-1 bg-light">
                <div className="container">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div className="row row-cols-1 pb-3">
                                <div className="col">
                                    <h1>Recipes</h1>
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {recipes.length > 0
                                    ? recipes.map((recipe) => (
                                        <div className="col" key={recipe._id}>
                                            <div className="card shadow-sm">
                                                <Link to={`/recipes/${recipe._id}`}>
                                                    {recipe.imgUrl ? (
                                                        <img src={recipe.imgUrl} className={styles.recipeImg} alt={recipe.recipeName} />
                                                    ) : (
                                                        <svg
                                                            className="bd-placeholder-img card-img-top"
                                                            width="100%" height="225"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            role="img"
                                                            aria-label="Placeholder: Thumbnail"
                                                            preserveAspectRatio="xMidYMid slice"
                                                            focusable="false"
                                                        >
                                                            <title>Placeholder</title>
                                                            <rect width="100%" height="100%" fill="#55595c"></rect>
                                                            <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                                                                Thumbnail
                                                            </text>
                                                        </svg>
                                                    )}
                                                </Link>
                                                <div className="card-body">
                                                    <h2 className="fs-5">
                                                        <Link to={`/recipes/${recipe._id}`} className="text-decoration-none text-reset">
                                                            {recipe.title}
                                                        </Link>
                                                    </h2>
                                                    <hr />
                                                    <p className="card-text">
                                                        <b>Products:</b> {recipe.products?.slice(0, 50) + (recipe.products.length > 50 ? "..." : "")}
                                                    </p>
                                                    <p className="card-text">
                                                        <b>Likes:</b> <span>{recipe?.subscribers?.length || 0}</span>
                                                    </p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <small className="text-muted">{new Date(recipe._createdOn).toLocaleDateString()}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : <p className="no-articles">No articles yet</p>
                                }

                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default MyRecipes;

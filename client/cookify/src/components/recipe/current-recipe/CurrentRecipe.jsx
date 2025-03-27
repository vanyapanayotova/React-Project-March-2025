import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useRecipe } from "../../../api/recipeApi";
import styles from "./CurrentRecipe.module.css";

export default function CurrentRecipe() {

  // const { id } = useParams();
  // const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   startTransition(() => {
  //     fetch(`/api/recipes/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setRecipe(data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => console.error(err));
  //   });
  // }, [id]);

  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <div className="album py-1 bg-light">
        <div className="container">
          <h1>{recipe.title}</h1>
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="row row-cols-1 row-cols-md-2">
                <div className="col mb-3 mb-md-0">
                  {recipe.imgUrl ? (
                    <img className={styles.recipeImg} src={recipe.imgUrl} alt={recipe.title} />
                  ) : (
                    <svg
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
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
                </div>
                <div className="col">
                  <p><b>Products:</b> {recipe.products}</p>
                  <p><b>How to prepare:</b> {recipe.description}</p>
                  <p><b>Publish date:</b> {new Date(recipe._createdOn).toLocaleString()}</p>
                  <p><b>Published by:</b> {recipe.userId?.username}</p>
                  <p><b>Likes:</b> {recipe.subscribers?.length || 0}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      {recipe.isOwner ? (
                        <>
                          <Link to={`/recipes/${recipe._id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => console.log('Delete')}>Delete</button>
                        </>
                      ) : (
                        recipe.isLoggedIn && !recipe.isLikedByCurrentUser && (
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => console.log('Like')}>Like</button>
                        )
                      )}
                    </div>
                    <small className="text-muted">Added {new Date(recipe._createdOn).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


import React from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useDeleteRecipe, useRecipe } from "../../../api/recipeApi";
import styles from "./CurrentRecipe.module.css";
import useAuth from "../../../hooks/useAuth";
import { useComments, useCreateComment } from "../../../api/commentApi";
import { useOptimistic } from "react";
import { v4 as uuid } from 'uuid';
import CommentsCreate from "../../comments-create/CommentsCreate";
import CommentsView from "../../comments-show/CommentsShow";

export default function CurrentRecipe() {
  const { deleteRecipe } = useDeleteRecipe();
  const { email, userId, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);
  const isOwner = userId === recipe._ownerId;
  const { create } = useCreateComment();
  const { comments, addComment } = useComments(recipeId)
  const [optimisticComments, setOptimisticComments] = useOptimistic(comments, (state, newComment) => [...state, newComment]);

  const recipeDeleteClickHandler = async () => {
    const hasConfirm = confirm(`Are you sure you want to delete ${recipe.title} recipe?`);

    if (!hasConfirm) {
      return;
    }

    await deleteRecipe(recipeId);

    navigate('/recipes');
  };

  const commentCreateHandler = async (formData) => {
    const comment = formData.get('comment');

    // Create optimistic comment
    const newOptimisticComment = {
      _id: uuid(),
      _ownerId: userId,
      recipeId,
      comment,
      pending: true,
      author: {
        email,
      }
    };

    // Optimistic update
    setOptimisticComments(newOptimisticComment);

    // Server update
    const commentResult = await create(recipeId, comment);

    // Local state update
    addComment({ ...commentResult, author: { email } })
  };

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
                  <p><b>Published at:</b> {new Date(recipe._createdOn).toLocaleString()}</p>
                  <p><b>Published by:</b> {recipe.author?.username}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      {isOwner && (
                        <>
                          <Link to={`/recipes/${recipe._id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={recipeDeleteClickHandler}>Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-cols-1">
                <CommentsView comments={optimisticComments} />
              </div>

              {isAuthenticated &&
                (<>
                  <div className="row row-cols-1">
                    <CommentsCreate
                      email={email}
                      recipeId={recipeId}
                      onCreate={commentCreateHandler}
                    />
                  </div>
                </>)
              }

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


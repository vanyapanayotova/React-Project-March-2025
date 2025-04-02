import { useParams, useNavigate, Navigate } from 'react-router';
import useAuth from "../../../hooks/useAuth";
import { useEditRecipe, useRecipe } from '../../../api/recipeApi';
import styles from "./editRecipe.module.css"

const EditRecipe = () => {

    const navigate = useNavigate()
    const { userId } = useAuth();
    const { recipeId } = useParams();
    const { recipe } = useRecipe(recipeId)
    const { edit } = useEditRecipe();

    const formAction = async (formData) => {
        const recipeData = Object.fromEntries(formData);

        await edit(recipeId, recipeData);

        navigate(`/recipes/${recipeId}`);
    }

    //guard
    const isOwner = userId === recipe._ownerId;
    if (Object.keys(recipe).length !== 0 && !isOwner) {
        return <Navigate to="/recipes" />
    }

    const handleCancel = () => {
        navigate('/recipes');
    };

    return (
        <div className="container">
            <div className={`card mx-auto ${styles.card}`}>
                <div className="card-body">
                    <h1 className="card-title">Edit recipe</h1>
                    <hr />
                    <form id="edit" action={formAction}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className={`form-control`}
                                defaultValue={recipe.title}
                                required
                                minLength={4}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="imgUrl" className="form-label">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="imgUrl"
                                name="imgUrl"
                                className="form-control"
                                defaultValue={recipe.imgUrl}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="products" className="form-label">
                                Products
                            </label>
                            <input
                                type="text"
                                id="products"
                                name="products"
                                className="form-control"
                                defaultValue={recipe.products}
                                required
                                minLength={4}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                defaultValue={recipe.description}
                                required
                                minLength={15}
                            />
                        </div>

                        <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditRecipe;

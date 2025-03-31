// import React, { useState } from 'react';
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

    // const [errors, setErrors] = useState({
    //     title: '',
    //     products: '',
    //     description: '',
    // });

    // const [recipe1, setRecipe1] = useState({
    //     title: '',
    //     imgUrl: '',
    //     products: '',
    //     description: '',
    // });

    //guard
    const isOwner = userId === recipe._ownerId;
    // console.log(recipe._id);
    if (Object.keys(recipe).length !== 0 && !isOwner) {
    // if (recipe && !isOwner) {
        return <Navigate to="/recipes" />
    }

    // const { id } = useParams();
    // const navigate = useNavigate();



    // useEffect(() => {
    //     // Заменете с вашето API извикване
    //     fetch(`/api/recipes/${id}`)
    //         .then((res) => res.json())
    //         .then((data) => setRecipe(data))
    //         .catch((err) => console.error('Error fetching recipe:', err));
    // }, [id]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setRecipe1((prevRecipe) => ({
    //         ...prevRecipe,
    //         [name]: value,
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Добавете логика за обновяване на рецептата
    //     // navigate to the recipe details page after submit
    //     navigate(`/recipes/${id}`);
    // };

    // const validate = () => {
    //     const newErrors = {};
    //     if (recipe1.title.length < 4) {
    //         newErrors.title = 'Title must be at least 4 characters long.';
    //     }
    //     if (recipe1.products.length < 4) {
    //         newErrors.products = 'Products must be at least 4 characters long.';
    //     }
    //     if (recipe1.description.length < 15) {
    //         newErrors.description = 'Description must be at least 15 characters long.';
    //     }
    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleCancel = () => {
        navigate('/recipes'); // Можете да промените маршрута по желание
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
                                // className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                // value={recipe.title}
                                defaultValue={recipe.title}
                                // onChange={handleChange}
                                required
                            />
                            {/* {errors.title && <div className="form-text">{errors.title}</div>} */}
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
                                // value={recipe.imgUrl}
                                defaultValue={recipe.imgUrl}
                                // onChange={handleChange}
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
                                // className={`form-control ${errors.products ? 'is-invalid' : ''}`}
                                // value={recipe.products}
                                defaultValue={recipe.products}
                                // onChange={handleChange}
                                required
                            />
                            {/* {errors.products && <div className="form-text">{errors.products}</div>} */}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                // className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                // value={recipe.description}
                                defaultValue={recipe.description}
                                // onChange={handleChange}
                                required
                            />
                            {/* {errors.description && <div className="form-text">{errors.description}</div>} */}
                        </div>

                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            // disabled={!validate()}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditRecipe;

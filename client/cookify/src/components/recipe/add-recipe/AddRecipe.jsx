import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateRecipe } from "../../../api/recipeApi";
import styles from "./addRecipe.module.css"

export default function AddRecipe() {

    const navigate = useNavigate();
    const { create: createRecipe } = useCreateRecipe();

        const [form, setForm] = useState({
          title: "",
          imgUrl: "",
          products: "",
          description: "",
        });
      
        const handleChange = (e) => {
          setForm({ ...form, [e.target.name]: e.target.value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();

        //   const recipeData = Object.fromEntries(form);

          await createRecipe(form);
  
          navigate('/recipes');
        };

      
        return (
          <div className="container">
            <div className={`card mx-auto ${styles.card}`}>
              <div className="card-body">
                <h1 className="card-title">Add Recipe</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      value={form.title}
                      onChange={handleChange}
                      required
                      minLength={4}
                    />
                  </div>
      
                  <div className="mb-3">
                    <label htmlFor="imgUrl" className="form-label">Image URL</label>
                    <input
                      type="text"
                      id="imgUrl"
                      name="imgUrl"
                      className="form-control"
                      value={form.imgUrl}
                      onChange={handleChange}
                    />
                  </div>
      
                  <div className="mb-3">
                    <label htmlFor="products" className="form-label">Products</label>
                    <input
                      type="text"
                      id="products"
                      name="products"
                      className="form-control"
                      value={form.products}
                      onChange={handleChange}
                      required
                      minLength={4}
                    />
                  </div>
      
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={form.description}
                      onChange={handleChange}
                      required
                      minLength={15}
                    ></textarea>
                  </div>
      
                  <button type="submit" className="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
          </div>
        );
      };
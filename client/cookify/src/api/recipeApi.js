import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/recipes';

export const useRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        request.get(baseUrl).then(setRecipes)
    }, []);

    return { recipes };
};

export const useRecipe = (recipeId) => {
    // console.log(recipeId);
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${recipeId}`).then(setRecipe);
    }, [recipeId])

    return {
        recipe,
    };
};

export const useLatestRecipes = () => {
    const [latestRecipes, setLatestRecipes] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            select: '_id,imageUrl,title', //TODO
        });

        request.get(`${baseUrl}?${searchParams.toString()}`).then(setLatestRecipes)
    }, []);

    return { latestRecipes };
};

export const useCreateRecipe = () => {
    const { request } = useAuth();

    const create = (recipeData) =>
        request.post(baseUrl, recipeData);

    return {
        create,
    }
};

export const useEditRecipe = () => {
    const { request } = useAuth();

    const edit = (recipeId, recipeData) =>
        request.put(`${baseUrl}/${recipeId}`, { ...recipeData, _id: recipeId });

    return {
        edit,
    }
};

export const useDeleteRecipe = () => {
    const { request } = useAuth();

    const deleteRecipe = (recipeId) =>
        request.delete(`${baseUrl}/${recipeId}`);

    return {
        deleteRecipe,
    }
};

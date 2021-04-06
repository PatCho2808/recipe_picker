const { mongodb_url } = require('../../config');
const db = require('monk')(mongodb_url);

const addRecipe = async (title, ingredients, link) => {
	const recipes_collection = db.get('recipes');
	await recipes_collection.insert({ title, ingredients, link });
};

const getRecipesByIngredients = async ingredients => {
	const recipes_collection = db.get('recipes');
	return recipes_collection.find({ $or: ingredients });
};

const getAllRecipes = async () => {
	return db.get('recipes').find({});
};

module.exports = {
	addRecipe,
	getRecipesByIngredients,
	getAllRecipes
};

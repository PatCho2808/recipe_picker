const { validationResult } = require('express-validator');
const mongoService = require('../services/mongoService');
const searchService = require('../services/searchService');
const scrapService = require('../services/scrapingService');

module.exports = {
	createRecipe: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.error(errors.array());
			res.render('addRecipe', { message: 'Wrong values', recipe: {} });
			return;
		}
		const ingredients = req.body.ingredients.split(', ');
		await mongoService.addRecipe(req.body.title, ingredients, req.body.link);
		res.render('addRecipe', {
			message: `Recipe "${req.body.title}" added succesfully`,
			recipe: {}
		});
	},

	searchForRecipes: async (req, res) => {
		let recipes = [];
		let message = '';
		if (req.query.ingredients) {
			const ingredients = req.query.ingredients.split(' ');
			recipes = await searchService.getRecipesSortedByMatchingIngredients(
				ingredients
			);
			if (!recipes.length) {
				message = 'No recipes found';
			}
		}
		res.render('index', { message, recipes });
	},

	scrapeRecipe: async (req, res) => {
		try {
			const url = req.body.scrap_link;
			const { title, ingredients } = await scrapService.getRecipeFromPage(url);
			res.render('addRecipe', {
				message: '',
				recipe: { title, ingredients, link: url }
			});
		} catch (error) {
			res.render('addRecipe', { message: 'Wrong url', recipe: {} });
		}
	}
};

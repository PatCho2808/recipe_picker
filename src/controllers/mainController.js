const mongoService = require('../services/mongoService'); 
const searchService = require('../services/searchService'); 

module.exports = {
    createRecipe: async (req, res) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            res.render('addRecipe', { message: 'Wrong values' });
            return;
        }
        const ingredients = req.body.ingredients.split(', ');
        await mongoService.addRecipe(req.body.name, ingredients, req.body.link); 
        res.render('addRecipe', { message: `Recipe "${req.body.name}" added succesfully` });
    },

    searchForRecipes: async (req, res) => {
        
        let recipes = [];
        if (req.query.ingredients) {
            const ingredients = req.query.ingredients.split(' ');
            recipes = await searchService.getRecipesSortedByMatchingIngredients(ingredients); 
        }
        res.render('index', { recipes });
    }
}
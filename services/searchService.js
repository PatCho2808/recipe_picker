const mongoService = require('./mongoService');

module.exports = {
    getRecipesSortedByMatchingIngredients: async ingredients => {
        let queries = [];
        ingredients.forEach(ingredient => {
            queries.push({ ingredients: ingredient });
        });
        let recipes = []
        await mongoService.getRecipesByIngredients(queries)
            .then(data => recipes = module.exports.sortRecipesByMatchingIngredients(data, ingredients))
            .catch(error => console.log(error));
        return recipes;
    },

    sortRecipesByMatchingIngredients: (recipes, ingredients) => {
        recipes.forEach(recipe => {
            recipe.match = 0;
            recipe.ingredients.forEach(ingredient => {
                if (ingredients.includes(ingredient)) {
                    recipe.match++;
                }
            })
        });
        recipes.sort((a, b) => b.match - a.match);
        return recipes; 
    }
}
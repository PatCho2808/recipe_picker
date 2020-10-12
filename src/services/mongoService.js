const db = require('monk')('mongodb+srv://admin:kinlxw@cluster0.pwvjl.mongodb.net/recipe_picker?retryWrites=true&w=majority');

module.exports = {
    addRecipe: async (name, ingredients, link) => {
        const recipes_collection = db.get('recipes');
        await recipes_collection.insert({ name, ingredients, link});
    },

    getRecipesByIngredients: async (ingredients) => {
        const recipes_collection = db.get('recipes');
        return recipes_collection.find({ $or: ingredients }); 
    }
}
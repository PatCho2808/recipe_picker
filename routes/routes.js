const express = require('express');
const router = express.Router();
const db = require('monk')('mongodb+srv://admin:kinlxw@cluster0.pwvjl.mongodb.net/recipe_picker?retryWrites=true&w=majority');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    let recipes = [];
    if (req.query.ingredients) {
        const recipes_collection = db.get('recipes');
        const ingredients = req.query.ingredients.split(' ');
        let queries = [];
        ingredients.forEach(ingredient => {
            queries.push({ ingredients: ingredient });
        });
        await recipes_collection.find({ $or: queries })
            .then(data => {
                recipes = data;
                recipes.forEach(recipe => {
                    recipe.match = 0;
                    recipe.ingredients.forEach(ingredient => {
                        if (ingredients.includes(ingredient)) {
                            recipe.match++;
                        }
                    })
                });
                recipes.sort((a, b) => b.match - a.match);
            })
            .catch(error => console.log(error));
    }

    res.render('index', { recipes });
});


router.get('/add', (req, res) => {
    res.render('addRecipe', { message: false });
})

router.post('/add', [
    body('name').trim().notEmpty(), 
    body('ingredients').trim().notEmpty(),
    body('link').trim().notEmpty().custom(value => value.match('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'))
], async (req, res) => {
    const errors = validationResult(req); 
    console.log(errors); 
    if(!errors.isEmpty())
    {
        console.error(errors.array());
        res.render('addRecipe', { message: 'Wrong values'});
        return;
    }
    const recipes_collection = db.get('recipes');
    const ingredients = req.body.ingredients.split(', ');
    await recipes_collection.insert({ name: req.body.name, ingredients, link: req.body.link });
    res.render('addRecipe', { message: `Recipe "${req.body.name}" added succesfully` });
})

module.exports = router;
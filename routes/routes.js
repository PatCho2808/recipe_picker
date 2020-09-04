const express = require('express');
const router = express.Router();
const db = require('monk')('mongodb+srv://admin:kinlxw@cluster0.pwvjl.mongodb.net/recipe_picker?retryWrites=true&w=majority');
const { body, validationResult } = require('express-validator');
const mainController = require('../controllers/mainController'); 

router.get('/', (req, res) => {
    mainController.searchForRecipes(req,res); 
});

router.get('/add', (req, res) => {
    res.render('addRecipe', { message: false });
})

router.post('/add', [
    body('name').trim().notEmpty(), 
    body('ingredients').trim().notEmpty(),
    body('link').trim().notEmpty().custom(value => value.match('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'))
], (req, res) => mainController.createRecipe(req,res)); 

module.exports = router;
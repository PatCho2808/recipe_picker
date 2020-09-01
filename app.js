const express = require('express'); 
const db = require('monk')('localhost/recipe_picker');

const app = express(); 
const port = 3666;

app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use(express.static('./public/'));
app.set('view engine', 'ejs'); 

app.get('/', async (req, res) => {
    let recipes = [];
    if(req.query.ingredients)
    {
        const recipes_collection = db.get('recipes'); 
        const ingredients = req.query.ingredients.split(' ');  
        let queries = []; 
        ingredients.forEach(ingredient => {
            queries.push({ingredients: ingredient}); 
        });
        await recipes_collection.find({$or: queries})
        .then( data => {
            recipes = data; 
            recipes.forEach(recipe => {
                recipe.match = 0; 
                recipe.ingredients.forEach(ingredient => {
                    if(ingredients.includes(ingredient))
                    {
                        recipe.match++; 
                    }
                })
            }); 
            recipes.sort((a, b) => b.match - a.match); 
        })
        .catch(error => console.log(error));           
    }  
    
    res.render('index', {recipes}); 
}); 

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`)); 
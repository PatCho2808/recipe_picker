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
        await recipes_collection.find({})
        .then( data => recipes = data)
        .catch(error => console.log(error));           
    }  
    console.log(recipes); 
    res.render('index', {recipes}); 
}); 

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`)); 
const express = require('express'); 
const db = require('monk')('localhost/recipe_picker');


const app = express(); 
const port = 3666;



app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use(express.static('./public/'));
app.set('view engine', 'ejs'); 

app.get('/', async (req, res) => {
    const recipes = db.get('recipes'); 
    recipes.find({}).then( doc => console.log(doc)); 
    res.render('index'); 
}); 

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`)); 
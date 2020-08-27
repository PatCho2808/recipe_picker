const express = require('express'); 
const ejs = require('ejs'); 

const app = express(); 
const port = 3666; 


app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use(express.static('./public/'));
app.set('view engine', 'ejs'); 

app.get('/', (req, res) => {
    console.log(req.query.ings); 
    res.render('index'); 
}); 

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`)); 
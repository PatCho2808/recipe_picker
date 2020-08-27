const express = require('express'); 
const ejs = require('ejs'); 

const app = express(); 
const port = 3666; 


app.use('/css', express.static('./node_modules/bootstrap/dist/css'))
app.use('/js', express.static('./node_modules/bootstrap/dist/js'))
app.use('/css', express.static('./public/css'))
app.set('view engine', 'ejs'); 

app.get('/', (req, res) => {
    res.render('index'); 
}); 

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`)); 
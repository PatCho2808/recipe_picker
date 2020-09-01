const express = require('express'); 
const {MongoClient} = require('mongodb'); 

const app = express(); 
const port = 3666;
const uri = "mongodb://localhost:27017/";


app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use(express.static('./public/'));
app.set('view engine', 'ejs'); 

app.get('/', async (req, res) => {
const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        console.log(client.collection('recipes')); 
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    res.render('index'); 
}); 

app.listen(port, () => console.log(`Listening on: http://localhost:${port}`)); 
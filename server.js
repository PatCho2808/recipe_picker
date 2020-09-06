const app = require('./app'); 
const { port } = require('./config/index.js'); 

app.listen(process.env.PORT || port, console.log(`listening on http://localhost:${port}`)); 
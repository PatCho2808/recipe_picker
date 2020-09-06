const app = require('./app');
const { port } = require('./config/index');

app.listen(process.env.PORT || port); 
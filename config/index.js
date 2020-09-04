const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.PORT); 

module.exports = {
  endpoint: process.env.API_URL,
  port: process.env.PORT
};
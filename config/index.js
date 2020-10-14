const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
};

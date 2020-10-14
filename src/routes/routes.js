const express = require("express");
const router = express.Router();
const { mongodb_url } = require("../../config");
const db = require("monk")(mongodb_url);
const { body } = require("express-validator");
const mainController = require("../controllers/mainController");

router.get("/", (req, res) => {
  mainController.searchForRecipes(req, res);
});

router.get("/add", (req, res) => {
  res.render("addRecipe", { message: false, recipe: {} });
});

router.post(
  "/add",
  [
    body("title").trim().notEmpty(),
    body("ingredients").trim().notEmpty(),
    body("link")
      .trim()
      .notEmpty()
      .custom((value) =>
        value.match(
          "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
        )
      ),
  ],
  (req, res) => mainController.createRecipe(req, res)
);

router.post("/scrape", (req, res) => mainController.scrapeRecipe(req, res));

module.exports = router;

const { default: Axios } = require("axios");
const cheerio = require("cheerio");

const getRecipeFromPage = async (url) => {
  const result = await Axios({
    mathod: "get",
    url,
    responseType: "document",
  });
  const $ = cheerio.load(result.data);
  const title = getTitle($);
  const ingredients = getIngredients($);
  return {
    title,
    ingredients,
  };
};

const getTitle = ($) => {
  const header = $(".przepis");
  return header.text();
};

const getIngredients = ($) => {
  const ingredients = [];
  $(".field-name-field-skladniki > ul:nth-child(1)")
    .children()
    .each((i, el) => {
      ingredients.push(simplifyIngredient(el.children[0].data));
    });
  return ingredients;
};

const simplifyIngredient = (ing) => {
  return ing
    .trim()
    .split(" ")
    .map((word) => (/[a-zA-Z]/.test(word) ? word : ""))
    .join(" ");
};

module.exports = {
  getRecipeFromPage,
};

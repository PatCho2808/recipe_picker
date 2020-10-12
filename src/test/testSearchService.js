const expect = require('chai').expect;
const searchService = require('../services/searchService');


it("search for kurczak", async function () {
    let recipes = await searchService.getRecipesSortedByMatchingIngredients(['kurczak']);
    expect(recipes).to.be.lengthOf(2);
});

it("search for makaron", async function () {
    let recipes = await searchService.getRecipesSortedByMatchingIngredients(['makaron']);
    expect(recipes).to.be.lengthOf(1);
});

it("search for sol", async function () {
    let recipes = await searchService.getRecipesSortedByMatchingIngredients(['sol']);
    expect(recipes).to.be.lengthOf(0);
});

it("search for kurczak", async function () {
    let recipes = await searchService.getRecipesSortedByMatchingIngredients();
    expect(recipes).to.be.an('array').that.is.empty;
});

it("search for makaron and kurczak", async function () {
    let recipes = await searchService.getRecipesSortedByMatchingIngredients(['kurczak', 'makaron']);
    expect(recipes).to.be.lengthOf(2);
});

it("sort by makaron and kurczak", async function () {
    let recipes = await searchService.getRecipesSortedByMatchingIngredients(['kurczak', 'makaron']);
    expect(recipes[0].name).to.equal('Kurczak z makaronem');
    expect(recipes[1].name).to.equal('Kurczak z ryzem');
});


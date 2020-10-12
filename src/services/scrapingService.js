module.exports = {
  getRecipeFromPage: (url) => {
    return {
      title: this.getTitle(),
      ingredients: this.getIngredients(),
    };
  },

  getTitle: () => {
    return "";
  },

  getIngredients: () => {
    return "";
  },
};

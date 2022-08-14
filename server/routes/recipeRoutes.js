const routes = require('express').Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes
 */
routes.get('/',recipeController.homepage);
routes.get('/categories',recipeController.categories);
routes.get('/categories/:id',recipeController.category);
routes.get('/recipe/:id',recipeController.recipe);
routes.post('/search',recipeController.searchRecipe);
routes.get('/explore-latest',recipeController.exploreLatest);
routes.get('/explore-random',recipeController.exploreRandom);
routes.get('/submit-recipe',recipeController.submitRecipe);
routes.post('/submit-recipe',recipeController.saveRecipe);

module.exports = routes;
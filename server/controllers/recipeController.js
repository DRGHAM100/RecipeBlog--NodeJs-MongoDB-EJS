const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


/** 
 * GET /
 * Homepage
*/
exports.homepage = async (req,res,next) => {
    
    try {

        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);
    
        const food = { latest, thai, american, chinese };

        res.render('index',{title: 'Home',categories,food});

    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }

}



/** 
 * GET /categories
 * Categories
*/
exports.categories = async (req,res,next) => {

    try {
        const limitNumber = 25;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories',{title: 'Categories',categories});
        
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }

}


/** 
 * GET /categories/:id
 * Category
*/
exports.category = async (req,res,next) => {

    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'Category', categoryById } );
      } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
      }

}


/** 
 * GET /recipe/:id
 * Recipe
*/
exports.recipe = async (req,res,next) => {

    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe',{title: 'Recipe',recipe});
        
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }

}


/** 
 * POST /search
 * Search Recipe
*/
exports.searchRecipe = async (req,res,next) => {

    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render('search', { title: 'Search', recipe } );
      } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
      }

}



/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
    try {
      const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      res.render('explore-latest', { title: 'Explore Latest', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
} 


  /**
 * GET /explore-random
 * Explore Random 
*/
exports.exploreRandom = async(req, res) => {
    try {
      let count = await Recipe.find().countDocuments();
      let random = Math.floor(Math.random() * count);
      let recipe = await Recipe.findOne().skip(random).exec();
      res.render('explore-random', { title: 'Explore Random', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
} 



/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}



/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.saveRecipe = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
  
}


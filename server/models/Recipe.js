const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    description:{
        type: String,
        required: 'This field is required'
    },
    email:{
        type: String,
        required: 'This field is required'
    },
    ingredients:{
        type: Array,
        required: 'This field is required'
    },
    category:{
        type: String,
        enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
        required: 'This field is required.'
    },
    image:{
        type: String,
        required: 'This field is required'
    },
});

RecipeSchema.index({name: 'text', description: 'text'});
//RecipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe',RecipeSchema);
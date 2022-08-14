const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    image:{
        type: String,
        required: 'This field is required'
    }
});


module.exports = mongoose.model('Category',CategorySchema);
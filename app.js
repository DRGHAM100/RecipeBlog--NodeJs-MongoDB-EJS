require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const port = process.env.PORT;
const app = express();


app.use(express.urlencoded({extended: true, }))
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecureSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());


app.set('view engine','ejs');
app.set('layout','./layouts/main');

const routes = require('./server/routes/recipeRoutes.js');
app.use('/',routes);



mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log('Connected To MonogDB..');
    app.listen(port,() => console.log(`Listening to port ${port}`));  
})
.catch(err => {console.log(err);});


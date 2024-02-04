const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const registerRouts = require('./router/register');
const blogRouts = require('./router/blogPost');
const comment = require('./router/comments');
const login = require('./router/login');
const logout = require('./router/logout');

const home = require('./router/home');
const app = express();
app.use(express.json());
app.use(cookieParser());

const port = 4646;
app.use(registerRouts);
app.use(blogRouts);   
app.use(login);
app.use(logout);
app.use(home);
app.use(comment);
const uriDB = 'mongodb+srv://manuk:test1234@cluster0.fovju.mongodb.net/db_manuk1';

mongoose.connect(uriDB).
then(() => {
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`);
    });
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Could not connect to MongoDB');
    console.log(err);
})

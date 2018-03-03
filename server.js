const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request , response , next) => {
    
    var now = new Date().toString();
    var log = `${now} : ${request.method} ${request.url}`; 
    
    console.log (`${now} : ${request.method} ${request.url}`);
    fs.appendFile('server.log' , log + '\n' , (err) => {
        if(err)
        {
            console.log('Unable to append to server log');  
        }
    });
    next();
    
}) ;

app.use((request , response , next) => {
    
   response.render('maintenance.hbs');
}) ;

hbs.registerHelper('getCurrentYear' , () => { 
    return new Date().getFullYear()
} );

hbs.registerHelper('screamIt' , (text) => { 
    return text.toUpperCase();
} );

app.get( '/' , (request,response) => {
    
    response.render('home.hbs',{
        pageTitle : 'Home Page',
        welcomeMsg : 'Hello World'
    });
    
} ) ;

app.get( '/about' , (request,response) => {
    
    response.render('about.hbs',{
        pageTitle : 'About Page',
    });
    
} ) ;

app.get( '/bad' , (request,response) => {
    
//    response.send('Hello Express');
    response.send({
        errorMessage : 'Unable to handle request' 
    });
    
} ) ;

app.listen(3000,( ) => {
    console.log("Server is up");
});
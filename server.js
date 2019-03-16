/**
 * Created by Priyankrege on 10/6/2017.
 */
var express = require('express'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser');
//creating the express application

var app = express();

// setting up the rendering engine

app.set('views', __dirname);
app.set('views engine','html');
var env = nunjucks.configure(__dirname,{
    autoescape: true,
    express : app
});

app.engine('html',nunjucks.render);

//setting up the bodyparser for express routes

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb',extended:true}));

//setting the port on express

var port = process.env.PORT || 5000;
app.set('port', port);

//static routes for page rendering

app.use('/built',express.static('./built/'));
app.use('/css',express.static('./css/'));


app.get('/',function (req,res) {
   res.render('index.html');
});

require('./js/routes')(app);

// server started to run locally  on port 5000
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
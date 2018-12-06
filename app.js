var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

app.set('port',(process.env.PORT || 3000));
// set up the template engine
app.set('view engine', 'ejs');

//static file by express middleware
app.use(express.static('./public'));

////Fire controllers

todoController(app);

//Listen to port
//app.listen(3000);
app.listen(app.get('port'),function(){
console.log('Listening to port',app.get('port'))
});

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Connect to the database
mongoose.connect('mongodb://Dhiraj:Friend*2010@ds119304.mlab.com:19304/todo');

//Create  a database Schema
var todoSchema = new mongoose.Schema({
  item: String
});

//Create a todo model
 var Todo = mongoose.model('Todo',todoSchema);
/* var item1 = Todo({item : 'buy flowers'}).save(function(err){
   if(err) throw err;
   console.log('Item Saved');
 });
*/


/*
var data = [{item:'get milk'  },{item: 'walk in park'},{item: 'buy clothes'}];
*/
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
app.get('/', function(req,res){
  Todo.find({},function(err,data){
    if(err) throw err;
    res.render('todo',{todos: data});

  });

});
app.post('/todo',urlencodedParser, function(req,res){

  //get data form the view and add to the mongodb
   var item1 = Todo(req.body).save(function(err,data){
     if(err) throw err;
     res.json(data)
   });
 });
//data.push(req.body);
//res.json(data);


app.delete('/todo/:item', function(req,res){
  //delete the requested items from the mongodb database
  Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if(err) throw err;
    res.json(data);
  });
});
}

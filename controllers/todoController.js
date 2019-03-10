const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb+srv://test:test@todo-u6hhk.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true }
);

// create a schema
const todoSchema = new mongoose.Schema({
  item: String
});

// create a model
const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    //   get data from mongodb and pass it to the view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    //   get data from the view and add to mongodb
    const newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      //   response will be sent back as json
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    //   delete requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).deleteOne(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};

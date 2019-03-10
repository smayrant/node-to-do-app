const bodyParser = require('body-parser');

let data = [{ item: 'get milk' }, { item: 'get juice' }, { item: 'go to gym' }];
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    res.render('todo', { todos: data });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    //   data from the body will be pushed onto the data array
    data.push(req.body);
    //   response will be sent back as json
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json({ todos: data });
  });
};

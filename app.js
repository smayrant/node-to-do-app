const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

// set up the template engine
app.set('view engine', 'ejs');

// express middleware to serve static files
app.use(express.static('./public'));

todoController(app);

app.listen(3000);
console.log("you're listening to port 3000");

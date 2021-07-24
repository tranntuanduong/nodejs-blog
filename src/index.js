const path = require('path');
const express = require('express');
var morgan = require('morgan');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const route = require('./routes')
// const route = require('./routes/index.js')

app.use(express.static(path.join(__dirname, 'public')));
// http logger
app.use(morgan('combined'));

// template engine
app.engine('hbs', handlebars({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`)
});
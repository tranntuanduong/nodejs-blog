const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db')

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

db.connect();
// const route = require('./routes/index.js')

const morgan = require('morgan');
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));
// http logger


// template engine
app.engine('hbs', handlebars({ 
    extname: '.hbs', 
    helpers: {
        sum: (a, b) => a + b,
    }

}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use( 
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`);
});

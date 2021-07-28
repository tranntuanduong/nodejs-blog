const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db')

// custome middleware
const SortMiddleware = require('./app/middlewares/SortMiddleware')
app.use(SortMiddleware);

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
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default'

            const icons = {
                default: 'oi oi-elevator',
                asc: 'oi oi-sort-ascending',
                desc: 'oi oi-sort-descending',
            }

            const types = {
                default: 'asc',
                asc: 'desc',
                desc: 'default',
            }

            const icon = icons[sortType];
            const type = types[sortType]

            return `
                <a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>
            `
        }
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

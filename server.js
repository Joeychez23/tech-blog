const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const seed = require('./seeds/seed.js');
const helpers = require('./utils/helper');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const hbs = exphbs.create({ helpers });


const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

setTimeout(async function () {
    await sequelize.sync({ force: false })
    await seed;
    await console.log(`\nDatabase initalized`);
    await app.listen(PORT);
    await console.log(`\nNow listening on port ${PORT}\n`);
}, 10000);
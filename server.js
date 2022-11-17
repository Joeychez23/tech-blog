const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/connection');
const createDatabase = require('./db/schema.sql');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const seed = require('./seeds/seed.js');
const helpers = require('./utils/helper');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const hbs = exphbs.create({ helpers });


const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        // ^^ HOW LONG THE SESSION DATA LAST FOR
        secure: false,
        // ^^ ONLY SENT OF ENCRYPTED CHANALS IF TRUE (HTTPS)
    },
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


//This allows the database to be created with local host but if the database uses an external database like heroku, the application will deploy with out error
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    insecureAuth: true
});
connection.query(createDatabase, function (error) {
    if (error) {
    }
    if (!error) {
    }
})
connection.end();





setTimeout(async function () {
    await sequelize.sync({ force: false })
    await seed;
    await console.log(`\nDatabase initalized`);
    await app.listen(PORT);
    await console.log(`\nNow listening on port ${PORT}\n`);
}, 5000);


// Node modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Router
const router = require('./controllers');

// Helper function
const helpers = require('./utils/helpers');

// sequelize function 
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// localHost port 3001
const app = express(); 
const PORT = process.env.PORT || 3001;

// Handlebars custom helpers
const hbs = exphbs.create({ helpers });

// use session object
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

app.use(session(sess));

// select which express.js template engine to use.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(PORT, () => {
  console.log(`Now listening ${PORT}!`);
  sequelize.sync({ force: false })
});
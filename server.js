const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = requires('./utils/helpers');

// localHost port connection 3001
const app = express(); 
const PORT = process.env.PORT || 3001;

// Handlebars custom helpers
const hbs = exphbs.create({ helpers });

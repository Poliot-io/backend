const cors = require('cors');
const cookies = require('cookie-parser');
const logger = require('./logger');

const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('./mongoose');

dotenv.config();

const configuration = require('@feathersjs/configuration');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const app = express(feathers());

// Load app configuration
app.configure(configuration());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.errorHandler());
app.use(cors());
app.use(cookies());
app.use(bodyParser.json());

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;

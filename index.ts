import * as http from 'http';
import * as url from 'url';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import mongodb = require('mongodb');

//My Imports
import { GameDefRoutes } from './gamedefs/gamedefs';
import { PlayerRoutes } from './players/players';
import { StandardRoutes } from './standard/standard';
import { AgricolaRoutes } from './agricola/agricola';
import { LauncherRoutes } from './launcher/launcher';

let app : express = express();

//Configuration
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

//TODO: Uncomment when angular is added 
//app.use(express.static(__dirname + '/public'));

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
	app.use(errorHandler());
}

//setup the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/scoretracker');

//Setup the routes
new GameDefRoutes(app);
new PlayerRoutes(app);
new LauncherRoutes(app);
new StandardRoutes(app);
new AgricolaRoutes(app);

app.listen(30000, function() {
	console.log('App listening on port 30000');
});

export var App = app;